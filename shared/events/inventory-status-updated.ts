export const INVENTORY_STATUS_UPDATED = "inventory.status.updated";

export interface InventoryStatusUpdatedPayload {
  orderId: string;
  productId: string;
  status: "available" | "out_of_stock";
  checkedAt: string;
}
