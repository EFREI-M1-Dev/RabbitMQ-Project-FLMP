# RabbitMQ Project

## Run with Docker

```bash
  docker-compose up --build -d
```

Go to: http://localhost:3001

> Usage: Log in with guest:guest or create a user, then open the MSN application to chat with other people. To log out, simply click on the Start menu.

## Run for developement

### Back

Go to the backend directory

```bash
  cd back
```

Install dependencies

```bash
  npm ci
```

Start the RabbitMQ server

```bash
  docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
```

Start the server

```bash
  npm run start
```

### Front

Go to the frontend directory

```bash
  cd front
```

Install dependencies

```bash
  npm ci
```

Start the server

```bash
  npm run dev
```

## RabbitMQ

Link to [Dashboard](http://localhost:15672)

| username | password |
| :------- | :------- |
| `guest`  | `guest`  |

## API Reference

URL: http://localhost:3000

#### Register a user

```http
  POST /register
```

| Parameter  | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `username` | `string` | **Required**. Username |
| `password` | `string` | **Required**. Password |

#### Check login

```http
  POST /login
```

| Parameter  | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `username` | `string` | **Required**. Username |
| `password` | `string` | **Required**. Password |
