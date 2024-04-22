RabbitMQ:
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management

http://localhost:15672 guest:guest

Back:
cd back
npm start

Front:
cd front
npm run dev
