import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().int().positive(),
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().email().min(1).max(255),
  password: z.string().min(1).max(255),
  role: z.string().min(1).max(255),
  isActive: z.boolean(),
  pageLimit: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const changeUserPasswordSchema = z
  .object({
    email: z.string().email(),
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
    newPasswordConfirm: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords don't match",
    path: ["newPasswordConfirm"], // path of error
  });

export type ChangeUserPasswordValues = z.infer<typeof changeUserPasswordSchema>;
