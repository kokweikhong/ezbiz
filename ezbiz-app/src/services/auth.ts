"use server";

import axios from "axios";
import { User } from "@/interfaces/user";

const axiosAuth = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function signIn({ email, password }: { email: string; password: string }) {
  const res = await axiosAuth.post<User>("/login", { email, password });
  return res.data;
}
