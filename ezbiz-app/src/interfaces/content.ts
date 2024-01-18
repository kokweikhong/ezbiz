import { z } from "zod";

export const socialMediaSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
  imagePath: z.string().optional(),
  placeholder: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type SocialMediaValues = z.infer<typeof socialMediaSchema>;

export const contentSchema = z.object({
  id: z.number().int().positive().optional(),
  userId: z.number().int().positive(),
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
  socialMedias: z.array(socialMediaSchema),
  location: z.string().optional(),
  content: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  expireAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ContentValues = z.infer<typeof contentSchema>;

export const defaultContentSchema = z.object({
  userId: z.number(),
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters long."),
});

export type DefaultContentValues = z.infer<typeof defaultContentSchema>;

export const defaultSocialMedias: SocialMediaValues[] = [
  {
    id: "facebook",
    name: "Facebook",
    placeholder: "https://facebook.com/",
    url: "",
  },
  {
    id: "twitter",
    name: "Twitter",
    placeholder: "https://twitter.com/",
    url: "",
  },
  {
    id: "instagram",
    name: "Instagram",
    placeholder: "https://instagram.com/",
    url: "",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    placeholder: "https://linkedin.com/in/",
    url: "",
  },
  {
    id: "youtube",
    name: "YouTube",
    placeholder: "https://youtube.com/channel/",
    url: "",
  },
  {
    id: "tiktok",
    name: "TikTok",
    placeholder: "https://tiktok.com/@",
    url: "",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    placeholder: "https://pinterest.com/",
    url: "",
  },
  {
    id: "tumblr",
    name: "Tumblr",
    placeholder: "https://tumblr.com/",
    url: "",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    placeholder: "https://snapchat.com/add/",
    url: "",
  },
  {
    id: "reddit",
    name: "Reddit",
    placeholder: "https://reddit.com/user/",
    url: "",
  },
  {
    id: "github",
    name: "GitHub",
    placeholder: "https://github.com/",
    url: "",
  },
];
