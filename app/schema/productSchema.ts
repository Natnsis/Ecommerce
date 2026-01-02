import * as z from 'zod';

export const productInputs = z.object({
  name: z.string().min(3, "product name must be atleast 3 characters"),
  description: z.string().nonempty(),
  price: z.number(),
  stock: z.number(),
  category: z.string().nonempty()
})

export type productType = z.infer<typeof productInputs>;
