import { z } from 'zod';

export const profileSchema = z.object({
  full_name: z.string().min(5, "full name must be atleast 5 characters"),
  category: z.string().nonempty('no category selected'),
  phone: z.string().min(10, 'phone number characters too small'),
  address: z.string().min(3, 'address too small characters'),
  bio: z.string().min(5, 'bio must be atleast 5 characters')
});

export type ProfileFormData = z.infer<typeof profileSchema>;
