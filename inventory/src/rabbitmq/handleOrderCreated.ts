import { ConsumeMessage, Channel } from "amqplib";
import { ORDER_CREATED } from "../../../shared/events";
import { manageInventory } from "../manage-inventory";

export function handleOrderCreated(channel: Channel) {
  return (msg: ConsumeMessage | null) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    console.log(`${ORDER_CREATED}: Received message `, data);
    manageInventory(data);
    channel.ack(msg);
  };
}
