"use server";

import { UserValues } from "@/interfaces/user";
import axios from "axios";

const axiosUsers = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/auth`,
});

export async function signIn(data: { email: string; password: string }) {
  const response = await axiosUsers.post<UserValues>("/login", data);
  return response.data;
}
