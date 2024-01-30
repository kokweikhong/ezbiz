"use server";

import type { ContentValues, DefaultContentValues } from "@/interfaces/content";
import axios from "axios";
import { getSocials } from "./socials";

const axiosContent = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/contents`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getContentsByUrl(url: string): Promise<ContentValues> {
  const res = await axiosContent.get(`/url/${url}`);
  return res.data;
}

export async function getContentsByUserId(
  userId: string
): Promise<ContentValues[]> {
  const res = await axiosContent.get(`/user/${userId}`);
  return res.data;
}

export async function getContentById(id: string): Promise<ContentValues> {
  const res = await axiosContent.get(`/${id}`);
  return res.data;
}

export async function getContentWithDefaultSocials(id: string) {
  const resSocials = await getSocials();
  const resContent = await getContentById(id);

  if (!resContent) {
    return null;
  }

  if (!resContent.socialMedias) {
    return resContent;
  }

  return {
    ...resContent,
    socialMedias: resContent.socialMedias.map((social) => {
      const contentSocial = resSocials.find(
        (contentSocial) => contentSocial.name === social.name
      );
      if (contentSocial) {
        return {
          ...social,
          url: social.url,
        };
      } else {
        return social;
      }
    })
  };
}

export async function createDefaultContent(data: DefaultContentValues) {
  const res = await axiosContent.post(`/user/create`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

export async function updateContent(data: ContentValues) {
  const id = data.id;
  const res = await axiosContent.put(`/${id}`, data);

  return res.data;
}
