import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
config();

const app = express();
const port = process.env.PORT || new Error("ENV Port not setup");

app.use(cors());
app.use(json());

// Health check endpoint
app.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    service: "invenotry-service",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Inventory service listening on port ${port}`);
});
