"use server";

import type { ContentValues, DefaultContentValues } from "@/interfaces/content";
import axios from "axios";

const axiosContent = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_URL}/contents`,
});

export async function getContentsByUserId(
  userId: string
): Promise<ContentValues[]> {
  const res = await axiosContent.get(`/user/${userId}`);
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
  const res = await axiosContent.put(`/user/${id}`, data, {
    // json
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
