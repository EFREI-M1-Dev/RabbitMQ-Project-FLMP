//@ts-check

const express = require('express');
const axios = require('axios');
const { RABBITMQ_API_URL, AUTH_HEADER } = require('./config');

const app = express.Router();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
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

app.post('/login', async function (req, res) {
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

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  const user_data = {
    password: password,
    tags: 'management',
  };

  const url = `${RABBITMQ_API_URL}/users/${username}`;
  const headers = {
    Authorization: `Basic ${AUTH_HEADER}`,
    'Content-Type': 'application/json',
  };

  try {
    // @ts-ignore
    const response = await axios.put(url, user_data, { headers });

    if (response.status === 201) {
      return res
        .status(201)
        .json({ message: `User ${username} added successfully` });
    } else {
      return res
        .status(response.status)
        .json({ error: `Failed to add user: ${response.data}` });
    }
  } catch (error) {
    return res
      .status(error.response.status)
      .json({ error: `Failed to add user: ${error.response.data}` });
  }
});

module.exports = app;
