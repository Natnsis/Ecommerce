import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters required"),
  price: z.number().refine((value) => value !== 0, { message: "market price cant be free" }),
  stock: z.number().refine((value) => value !== 0, { message: "include atleast 1 product" }),
  market: z.number()
    .refine((value) => value !== 0, {
      message: "Market price can't be free",
    })
  ,
  category: z.string().nonempty("Choose a category"),
  description: z
    .string()
    .min(8, "Describe the product (must be greater than 8 characters)"),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size > 0, "Image is required")
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Max size is 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type),
      { message: "Only JPG, PNG, WEBP, or GIF images are allowed" }
    ),
});

export type productType = z.infer<typeof productSchema>



export const productUpdateSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  market: z.number(),
  stock: z.number().int(),
  category: z.string().min(1),
  description: z.string().min(1),
  image: z.instanceof(File).optional(),
})

export type ProductUpdateType = z.infer<typeof productUpdateSchema>
