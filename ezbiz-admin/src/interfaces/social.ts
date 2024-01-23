import { z } from "zod"

export const SocialSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, { message: "Name is too short" }),
  url: z.string().optional(),
  imagePath: z.string().optional(),
  placeholder: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type SocialValues = z.infer<typeof SocialSchema>
