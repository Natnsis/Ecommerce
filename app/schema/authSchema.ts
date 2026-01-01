import * as z from 'zod';

export const authInputs = z.object({
  email: z.string().nonempty().email(),
  password: z.string().min(4, "password must be atleast 4 characters")
})
