const RABBITMQ_HOST = process.env.RABBITMQ_HOST || 'localhost';
const RABBITMQ_PORT = 15672;
const RABBITMQ_USER = 'guest';
const RABBITMQ_PASS = 'guest';

const buffer = Buffer.from(`${RABBITMQ_USER}:${RABBITMQ_PASS}`, 'utf-8');
const AUTH_HEADER = buffer.toString('base64');

const RABBITMQ_API_URL = `http://${RABBITMQ_HOST}:${RABBITMQ_PORT}/api`;

module.exports = { AUTH_HEADER, RABBITMQ_API_URL };
