// zodSchemas/menuItemSchemas.js
const { z } = require('zod/v4');


const createMenuItemSchema = z.object({
  name: z.string(),
  price: z.coerce.number()
}).passthrough();


const updateMenuItemSchema = createMenuItemSchema.extend({
  available: z.boolean().optional(),
});

const deleteMenuItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

const getMenuItemSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

module.exports = {
  createMenuItemSchema,
  updateMenuItemSchema,
  deleteMenuItemSchema,
  getMenuItemSchema,
};
