//@ts-check

const express = require('express');
const axios = require('axios');
const { RABBITMQ_API_URL } = require('../config');

const app = express.Router();

app.post('/', async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  if (await authenticate(username, password)) {
    return res
      .status(200)
      .json({ message: `User ${username} logged successfully` });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

async function authenticate(username, password) {
  const buffer = Buffer.from(`${username}:${password}`, 'utf-8');
  const auth_header = buffer.toString('base64');
  const headers = {
    Authorization: `Basic ${auth_header}`,
  };
  const url = `${RABBITMQ_API_URL}/whoami`;

  try {
    // @ts-ignore
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = app;
