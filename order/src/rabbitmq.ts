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
  async publish<T>(exchange: string, message: T) {
    if (!channel) throw new Error("RabbitMQ not initialized");
    await channel.assertExchange(exchange, "fanout", { durable: true });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  },
};
