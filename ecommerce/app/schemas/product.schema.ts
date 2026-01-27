import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters required"),
  price: z.number(),
  market: z.number(),
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
