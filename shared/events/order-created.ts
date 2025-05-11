export const ORDER_CREATED = "order.created";

interface OrderItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderCreatedPayload {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
