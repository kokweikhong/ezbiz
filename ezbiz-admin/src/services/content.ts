"use server";

import { ContentValues } from "@/interfaces/content";
import axios from "axios";

const axiosContent = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/contents`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getContents() {
  const response = await axiosContent.get<ContentValues[]>("/");
  return response.data;
}
