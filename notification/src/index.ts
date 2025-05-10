import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { initRabbitMQListener } from "./rabbitmq";

config();

const app = express();
const port = process.env.PORT || new Error("Port not set");

app.use(cors());
app.use(json());

// Health check endpoint
app.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    service: "notification-service",
    timestamp: new Date().toISOString(),
  });
});

initRabbitMQListener();
app.listen(port, () => {
  console.log(`Notification service listening on port ${port}`);
});
