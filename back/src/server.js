//@ts-check

const express = require('express');
var cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use(express.static('public'));

// Routes
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

// @ts-ignore
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
const RETRY_INTERVAL = 5000;

function connectToRabbitMQ() {
  amqp.connect(rabbitmqUrl, function (error0, connection) {
    if (error0) {
      console.error(`Failed to connect to RabbitMQ: ${error0.message}`);
      return setTimeout(connectToRabbitMQ, RETRY_INTERVAL);
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = 'chat';

      channel.assertQueue(queue, {
        durable: true,
      });

      io.on('connection', (socket) => {
        socket.on('user joined', (user) => {
          socket.username = user;
          io.emit('user joined', user);
        });

        socket.on('new message', (msg) => {
          const messageData = {
            message: msg,
            username: socket.username,
          };

          channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageData)), {
            persistent: true,
          });
          console.log('Sent', msg);
        });
      });

      channel.consume(
        queue,
        function (msg) {
          if (msg === null) return;

          const messageData = JSON.parse(msg.content.toString());
          console.log(
            `Received ${messageData.message} from ${messageData.username}`,
          );

          io.emit('new message', messageData.message, messageData.username);
        },
        {
          noAck: true,
        },
      );
    });
  });
}

connectToRabbitMQ();

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
