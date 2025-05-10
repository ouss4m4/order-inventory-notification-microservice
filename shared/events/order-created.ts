export const ORDER_CREATED = "order.created";

export interface OrderCreatedPayload {
  orderId: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  createdAt: string;
}
