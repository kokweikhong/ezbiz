import { z } from "zod";

export const SocialMediaSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  imagePath: z.string().optional(),
  placeholder: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SocialMediaValues = z.infer<typeof SocialMediaSchema>;

export const ContentSchema = z.object({
  id: z.number().int().positive().optional(),
  userId: z.number().int().positive(),
  // error if url is contains any special characters except - (hyphen)
  // also no spaces allowed
  url: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, "URL can only contain letters, numbers, and -")
    .min(3, "URL must be at least 3 characters long.")
    .max(30, "URL must be at most 30 characters long."),
  backgroundImage: z.string().optional(),
  themeColor: z.string().optional(),
  profilePicture: z.string().optional(),
  companyLogo: z.string().optional(),
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters long."),
  businessTagline: z.string().optional(),
  contactNo: z.string().optional(),
  emailAddress: z.string().optional(),
  website: z.string().optional(),
  socialMedias: z.array(SocialMediaSchema),
  location: z.string().optional(),
  content: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  expireAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ContentValues = z.infer<typeof ContentSchema>;

export const DefaultContentSchema = z.object({
  userId: z.number(),
  url: z
    .string()
    .regex(/^[a-zA-Z0-9-]+$/, "URL can only contain letters, numbers, and -")
    .min(3, "URL must be at least 3 characters long.")
    .max(30, "URL must be at most 30 characters long."),
});

export type DefaultContentValues = z.infer<typeof DefaultContentSchema>;

export const defaultSocialMedias: SocialMediaValues[] = [
  {
    id: 0,
    name: "Facebook",
    placeholder: "https://facebook.com/",
    url: "",
  },
  {
    id: 1,
    name: "Twitter",
    placeholder: "https://twitter.com/",
    url: "",
  },
  {
    id: 2,
    name: "Instagram",
    placeholder: "https://instagram.com/",
    url: "",
  },
  {
    id: 3,
    name: "LinkedIn",
    placeholder: "https://linkedin.com/in/",
    url: "",
  },
  {
    id: 4,
    name: "YouTube",
    placeholder: "https://youtube.com/channel/",
    url: "",
  },
  {
    id: 5,
    name: "TikTok",
    placeholder: "https://tiktok.com/@",
    url: "",
  },
  {
    id: 6,
    name: "Pinterest",
    placeholder: "https://pinterest.com/",
    url: "",
  },
  {
    id: 7,
    name: "Tumblr",
    placeholder: "https://tumblr.com/",
    url: "",
  },
  {
    id: 8,
    name: "Snapchat",
    placeholder: "https://snapchat.com/add/",
    url: "",
  },
];
