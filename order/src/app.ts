import { ORDER_CREATED, OrderCreatedPayload } from "./../../shared/events/order-created";
import express, { json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { RabbitMQProducer } from "./rabbitmq";

config();

const app = express();
const port = process.env.PORT || new Error("ENV Port not setup");

app.use(cors());
app.use(json());

// Health check endpoint
app.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    service: "order-service",
    timestamp: new Date().toISOString(),
  });
  RabbitMQProducer.publish("HealthCheck", "Hello Order Service");
});

// create order
app.get("/order", async (req: Request, res: Response) => {
  const { userId = 1, items = [] } = req.body;

  const orderId = crypto.randomUUID(); // or DB-generated ID
  const payload: OrderCreatedPayload = {
    orderId,
    userId,
    items,
    createdAt: new Date().toISOString(),
  };

  // Save to DB here (prisma later)

  // Emit the event
  await RabbitMQProducer.publish(ORDER_CREATED, payload);
  res.status(201).send();
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Order service listening on port ${port}`);
  });
};

// connect to rabbitmq here
export { startServer };
