import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";

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
});

app.listen(port, () => {
  console.log(`Order service listening on port ${port}`);
});
