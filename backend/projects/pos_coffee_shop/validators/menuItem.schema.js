// pos/validators/menuItem.schema.js
const { z } = require("zod");

const variantOptionSchema = z.object({
  name: z.string().min(1, "Option name is required"),
  extraPrice: z.number().nonnegative().default(0),
});

const variantGroupSchema = z.object({
  name: z.string().min(1, "Variant group name is required"),
  options: z.array(variantOptionSchema).min(1, "At least one option is required"),
});

const createMenuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().nonnegative(),
  categoryId: z.string().cuid(),
  variantGroups: z.array(variantGroupSchema).optional(), // allow no variants
});

module.exports = {
  createMenuItemSchema,
};
