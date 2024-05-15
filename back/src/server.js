//@ts-check

const express = require('express');
const cors = require('cors');
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

const exchangeName = 'app_exchange';
const chatQueue = 'chat';
const userConnectionQueue = 'user_connections';
const chatRoutingKey = 'chat.message';
const userConnectionRoutingKey = 'user.connection';

/**
 * Set up the queues and exchange
 * @param {amqp.Channel} channel
 */
function setupQueuesAndExchange(channel) {
  channel.assertExchange(exchangeName, 'direct', { durable: true });

  channel.assertQueue(chatQueue, { durable: true });
  channel.assertQueue(userConnectionQueue, { durable: true });

  channel.bindQueue(chatQueue, exchangeName, chatRoutingKey);
  channel.bindQueue(
    userConnectionQueue,
    exchangeName,
    userConnectionRoutingKey,
  );
}

/**
 * Set up the socket events
 * @param socket
 * @param {amqp.Channel} channel
 */
function setupSocketIO(socket, channel) {
  // A user joined
  socket.on('user joined', (user) => {
    socket.username = user;
    sendMessageToExchange(channel, userConnectionRoutingKey, {
      event: 'user joined',
      username: user,
    });
    console.log('Sent user:', user);
  });

  // Recived a new message
  socket.on('new message', (msg) => {
    const messageData = { message: msg, username: socket.username };
    sendMessageToExchange(channel, chatRoutingKey, messageData);
    console.log('Sent msg:', msg);
  });
}

/**
 * Send a message to the specified exchange and routing key
 * @param {amqp.Channel} channel
 * @param {string} routingKey
 * @param {Object} message
 */
function sendMessageToExchange(channel, routingKey, message) {
  channel.publish(
    exchangeName,
    routingKey,
    Buffer.from(JSON.stringify(message)),
    { persistent: true },
  );
}

/**
 * Consume messages from the queues
 * @param {amqp.Channel} channel
 */
function consumeMessages(channel) {
  // Recived a new message
  channel.consume(
    chatQueue,
    (msg) => {
      if (msg === null) return;
      const messageData = JSON.parse(msg.content.toString());

      console.log(
        `Received ${messageData.message} from ${messageData.username}`,
      );

      io.emit('new message', messageData.message, messageData.username);
    },
    { noAck: true },
  );

  // A user joined
  channel.consume(
    userConnectionQueue,
    (msg) => {
      if (msg === null) return;
      const connectionData = JSON.parse(msg.content.toString());

      console.log(
        `User connection event: ${connectionData.event} for user ${connectionData.username}`,
      );

      io.emit(connectionData.event, connectionData.username);
    },
    { noAck: true },
  );
}

/**
 * Connect to RabbitMQ and sets up the channel, queues, and socket events
 */
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

      setupQueuesAndExchange(channel);

      io.on('connection', (socket) => setupSocketIO(socket, channel));

      consumeMessages(channel);
    });
  });
}

connectToRabbitMQ();

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
