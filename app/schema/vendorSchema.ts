import * as z from "zod";

export const vendorInputs = z.object({
  fullName: z.string().min(5, "full name must be atleast 5 characters").nonempty(),
  email: z.email().includes("@"),
  password: z.string().min(4, "password must be atleast 4 characters"),
  confirm: z.string().min(4, "password must be atleast 4 characters"),
  phone: z.string().min(10, "phone number must be atleas 10 digits"),
  adress: z.string().nonempty(),
  category: z.string()
});

export type vendorType = z.infer<typeof vendorInputs>; 
