import { ORDER_UPDATED } from "./../../shared/events/order-updated";
import { ORDER_CREATED, OrderCreatedPayload } from "./../../shared/events/order-created";
import express, { json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { RabbitMQProducer } from "./rabbitmq";
import { parseCreateOrderDto, parseEditOrderDto } from "./typings";
import { orderService } from "./lib/order.service";
import { orderChangeEventBuilder } from "./helpers/orderChangeEventBuilder";

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

// create order
app.post("/order", async (req: Request, res: Response, next) => {
  try {
    const result = parseCreateOrderDto(req.body);
    if (!result.success) {
      return next(result.error);
    }

    const order = await orderService.create(result.data);
    await RabbitMQProducer.publish<OrderCreatedPayload>(ORDER_CREATED, order);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

app.put("/order/:id", async (req: Request, res: Response, next) => {
  try {
    let id = req.params.id;
    const result = parseEditOrderDto(req.body);
    if (!result.success) {
      return next(result.error);
    }
    const { previous, updated } = await orderService.edit(id, result.data);

    const changeEvent = orderChangeEventBuilder(previous, updated);
    if (changeEvent) {
      await RabbitMQProducer.publish(ORDER_UPDATED, changeEvent);
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

app.use((error: any, _: any, res: Response, next: Function) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error && typeof error === "object" && "errors" in error) {
    const formatted: Record<string, string> = {};
    (error as any).errors?.forEach((err: any) => {
      formatted[err.path?.join(".") || "unknown"] = err.message;
    });
    return res.status(400).json({ success: false, message: "missing fields", errors: formatted });
  }

  if (error instanceof Error) {
    console.error(error.message);
    return res.status(400).json({ success: false, message: error.message });
  }

  console.error(error);
  return res.status(400).json({ success: false, message: "An Error Happened" });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Order service listening on port ${port}`);
  });
};

// connect to rabbitmq here
export { startServer };
