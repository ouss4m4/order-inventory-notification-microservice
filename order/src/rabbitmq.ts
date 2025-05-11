import { connect, Channel } from "amqplib";

let channel: Channel;

export async function initRabbitMQ(): Promise<void> {
  const rabbitMqHost = process.env.MQ_HOST ?? "";
  try {
    const connection = await connect(rabbitMqHost);
    channel = await connection.createChannel();
    console.log("Order Service: Connected to RabbitMQ");
  } catch (error) {
    console.error(error);
  }
}

export const RabbitMQProducer = {
  async publish<T>(queue: string, message: T) {
    if (!channel) throw new Error("RabbitMQ not initialized");
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  },
};
