
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number()
});

export const ProductListSchema = z.array(ProductSchema);

export const HotdealTimeSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export type HotdealTime = z.infer<typeof HotdealTimeSchema>;
