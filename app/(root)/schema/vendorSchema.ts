import { z } from "zod";

export const vendorInputs = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string(),
  phone: z.string().regex(/^\+?\d{9,15}$/, "Invalid phone number"),
  address: z.string().min(5, "Address is too short"),
  category: z.string().min(1, "Please select a category"),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

export type vendorType = z.infer<typeof vendorInputs>;
