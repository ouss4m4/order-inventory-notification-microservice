import { OrderItemsUpdatedEvent, OrderPaidEvent, OrderStatusUpdatedEvent } from "shared/events/order-updated";
import { Order } from "../prismadb";

function orderChangeEventBuilder(previous: Order, update: Order): OrderStatusUpdatedEvent;
function orderChangeEventBuilder(previous: Order, update: Order): OrderItemsUpdatedEvent;
function orderChangeEventBuilder(previous: Order, update: Order): OrderPaidEvent;
function orderChangeEventBuilder(previous: Order, update: Order) {
  if (previous.status !== update.status) {
    const statusEvent: OrderStatusUpdatedEvent = {
      id: update.id,
      previousStatus: previous.status,
      newStatus: update.status,
      updatedAt: update.updatedAt.toISOString(),
    };
    return statusEvent;
  }

  if (JSON.stringify(previous.items) !== JSON.stringify(update.items)) {
    const itemsEvent: OrderItemsUpdatedEvent = {
      id: update.id,
      previousItems: previous.items,
      newItems: update.items,
      updatedAt: update.updatedAt.toISOString(),
    };
    return itemsEvent;
  }

  if (update.status === "paid" && previous.status !== "paid") {
    const paidEvent: OrderPaidEvent = {
      id: update.id,
      paidAt: update.updatedAt.toISOString(),
      total: update.total,
      paymentMethod: "unknown",
    };
    return paidEvent;
  }

  throw new Error("No relevant changes detected for event generation");
}

export { orderChangeEventBuilder };
