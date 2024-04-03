const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

io.on("connection", (socket) => {
    socket.on("user joined", (user) => {
        socket.username = user;
        io.emit("user joined", user);
    });

    socket.on("new message", (msg) => {
        io.emit("new message", msg, socket.username);
    });
});


server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
