import { CreateOrderDTO, EditOrderDTO } from "../typings";
import { db } from "./prismaClient";

export class OrderService {
  async create(data: CreateOrderDTO) {
    return await db.order.create({ data });
  }

  async edit(id: string, data: EditOrderDTO) {
    const existing = await db.order.findUnique({ where: { id } });
    if (!existing) throw new Error("Order not found");

    const updated = await db.order.update({ where: { id }, data });

    return { previous: existing, updated };
  }
}

export const orderService = new OrderService();
