"use server"

import { ChangeUserPasswordValues } from "@/interfaces/user";
import axios from "axios";

const axiosUser = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/users`,
});

export async function updateUser(data: FormData) {
  const id = data.get("id");
  const res = await axiosUser.put(`/${id}`, data, {
    // json
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

export async function changeUserPassword(data: ChangeUserPasswordValues) {
  const res = await axiosUser.put(`/change-password`, data, {
    // json
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
