export const ORDER_UPDATED = "order.updated";

export interface OrderItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderStatusUpdatedEvent {
  id: string;
  previousStatus: string;
  newStatus: string;
  updatedAt: string;
}

export interface OrderItemsUpdatedEvent {
  id: string;
  previousItems: OrderItem[];
  newItems: OrderItem[];
  updatedAt: string;
}

export interface OrderPaidEvent {
  id: string;
  paidAt: string;
  total: number;
  paymentMethod: string;
  customerId?: string;
}
