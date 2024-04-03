const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const amqp = require('amqplib/callback_api');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
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

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
