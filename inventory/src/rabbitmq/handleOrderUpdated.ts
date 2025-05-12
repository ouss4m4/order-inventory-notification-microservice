import { ORDER_UPDATED } from "./../../../shared/events/order-updated";
import { Channel, ConsumeMessage } from "amqplib";

export function handleOrderUpdated(channel: Channel) {
  return (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    console.log(`📩 ${ORDER_UPDATED}: Received message `, data);
    // sendNotification(data.id);
    channel.ack(msg);
  };
}
