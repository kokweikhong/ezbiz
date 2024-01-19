import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  isActive: z.boolean().default(true),
  pageLimit: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type UserValues = z.infer<typeof UserSchema>;
