
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  discountRate: z.number().optional(),
  isHotDeal: z.boolean().optional().default(false)
});

export const ProductListSchema = z.array(ProductSchema);

export const HotdealTimeSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type HotdealTime = z.infer<typeof HotdealTimeSchema>;
