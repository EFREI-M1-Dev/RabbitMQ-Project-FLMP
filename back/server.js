const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const amqp = require('amqplib/callback_api');
const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
    res.sendfile("index.html");
});

amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = "hello";

        channel.assertQueue(queue, {
            durable: false,
        });

        io.on("connection", (socket) => {
            socket.on("user joined", (user) => {
                socket.username = user;
                io.emit("user joined", user);
            });

            socket.on("new message", (msg) => {
                const messageData = {
                    message: msg,
                    username: socket.username
                };

                channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageData)));
                console.log(" [x] Sent %s", msg);
            });
        });

        channel.consume(queue, function(msg) {
            const messageData = JSON.parse(msg.content.toString());
            console.log(" [x] Received %s from %s", messageData.message, messageData.username);

            io.emit("new message", messageData.message, messageData.username);
        }, {
            noAck: true
        });
    });

});

server.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
