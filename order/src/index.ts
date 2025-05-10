import { startServer } from "./app";
import { initRabbitMQ } from "./rabbitmq";

// connect to rabbitmq
initRabbitMQ();
// connect to db (prisma)

// listen server
startServer();
