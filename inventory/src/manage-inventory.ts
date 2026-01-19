import { OrderCreatedPayload } from "../../shared/events";

export const manageInventory = (order: OrderCreatedPayload) => {
  console.log("Inventory: Manager products inventory");
};
