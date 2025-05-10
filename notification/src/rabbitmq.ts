import { ORDER_CREATED, OrderCreatedPayload } from "./../../shared/events/order-created";
import amqp from "amqplib";

export async function initRabbitMQListener() {
  const connection = await amqp.connect("amqp://admin:admin@localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(ORDER_CREATED, { durable: true });

  console.log("🔁 Listening for order.created events...");

  channel.consume(ORDER_CREATED, (msg) => {
    if (msg) {
      const data: OrderCreatedPayload = JSON.parse(msg.content.toString());
      console.log(`📩 Order received: ${data.orderId} for user ${data.userId}`);
      // Simulate notification logic
      console.log(`Sending notification to user ${data.userId}`);
      channel.ack(msg);
    }
  });
}
