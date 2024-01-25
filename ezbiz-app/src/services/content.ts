// "use server";

import type { ContentValues, DefaultContentValues } from "@/interfaces/content";
import axios from "axios";

const axiosContent = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_EZBIZ_BACKEND_URL}/contents`,
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
