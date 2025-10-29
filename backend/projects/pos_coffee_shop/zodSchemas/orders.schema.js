// zodSchemas/orderSchemas.js
const { z } = require('zod/v4');

const variantSelectionSchema = z.object({
  groupId: z.string().uuid(),
  groupName: z.string(),
  variantId: z.string().uuid(),
  variantName: z.string(),
  extraPrice: z.coerce.number(),
});

const orderItemSchema = z.object({
  menuId: z.string().uuid(),
  qty: z.coerce.number().min(1),
  selectedVariants: z.array(variantSelectionSchema),
  note: z.string().optional(),
});

const createOrderSchema = z.object({
  merchantSlug: z.string().min(1),
  tableId: z.string().uuid(),
  items: z.array(orderItemSchema).min(1),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  specialInstructions: z.string().optional(),
  total: z.coerce.number().min(0),
});

module.exports = {
  createOrderSchema,
};
