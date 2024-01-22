import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  isActive: z.boolean().default(true),
  pageLimit: z.number().int().positive(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type UserValues = z.infer<typeof UserSchema>;

export type UserFormInputProps = {
  form: UseFormReturn<UserValues>;
};
