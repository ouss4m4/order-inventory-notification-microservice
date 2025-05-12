import { ORDER_UPDATED } from "./../../../shared/events/order-updated";
import { ORDER_CREATED } from "./../../../shared/events/order-created";
import amqp from "amqplib";
import { handleOrderCreated } from "./handleOrderCreated";
import { handleOrderUpdated } from "./handleOrderUpdated";

export async function initRabbitMQListener() {
  const connection = await amqp.connect("amqp://admin:admin@localhost");
  const channel = await connection.createChannel();

  await channel.assertQueue(ORDER_CREATED, { durable: true });
  await channel.assertQueue(ORDER_UPDATED, { durable: true });

  console.log("🔁 Listening for order.created and order.updated events...");

  channel.consume(ORDER_CREATED, handleOrderCreated(channel));
  channel.consume(ORDER_UPDATED, handleOrderUpdated(channel));
}
