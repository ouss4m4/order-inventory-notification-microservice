import { config } from "dotenv";
import { createServer } from "http";
import { initRabbitMQListener } from "./rabbitmq";

config();

const port = process.env.PORT;

if (!port) {
  throw new Error("PORT environment variable is not defined");
}

const server = createServer((req, res) => {
  if (req.url === "/ping" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        service: "notification-service",
        timestamp: new Date().toISOString(),
      })
    );
  } else {
    res.writeHead(404);
    res.end();
  }
});

initRabbitMQListener();

server.listen(port, () => {
  console.log(`Notification service listening on port ${port}`);
});
