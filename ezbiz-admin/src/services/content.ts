"use server";

import { ContentValues, DefaultContentValues } from "@/interfaces/content";
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

export async function getContent(id: number) {
  const response = await axiosContent.get<ContentValues>(`/${id}`);
  return response.data;
}

export async function createContent(content: ContentValues) {
  const response = await axiosContent.post<ContentValues>("/", content);
  return response.data;
}

export async function updateContent(id: number, content: ContentValues) {
  const response = await axiosContent.put<ContentValues>(`/${id}`, content);
  return response.data;
}

export async function deleteContent(id: number) {
  const response = await axiosContent.delete<ContentValues>(`/${id}`);
  return response.data;
}

export async function createDefaultContent(data: DefaultContentValues) {
  const res = await axiosContent.post(`/user/create`, data)
  return res.data;
}
