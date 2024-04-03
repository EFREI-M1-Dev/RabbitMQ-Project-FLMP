const express = require('express');

const app = express.Router();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

module.exports = app;
