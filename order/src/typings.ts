import z from "zod";

export const itemSnapshotSchema = z.object({
  sku: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  items: z.array(itemSnapshotSchema).nonempty(),
  total: z.number().nonnegative(),
  status: z.string(),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;

export function parseCreateOrderDto(input: unknown) {
  return createOrderSchema.safeParse(input);
}

export const editOrderSchema = z.object({
  items: z.array(itemSnapshotSchema).nonempty().optional(),
  total: z.number().nonnegative().optional(),
  status: z.string().optional(),
});

export type EditOrderDTO = z.infer<typeof editOrderSchema>;

export function parseEditOrderDto(input: unknown) {
  return editOrderSchema.safeParse(input);
}
