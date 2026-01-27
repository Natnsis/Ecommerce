import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email().min(5, "email has atleast 5 characters"),
  password: z.string().min(6, "must be atleast 6 characters")
});

export type AuthTypes = z.infer<typeof AuthSchema>
