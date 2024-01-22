"use server";

import { UserValues } from "@/interfaces/user";
import axios from "axios";

const axiosUsers = axios.create({
  baseURL: `${process.env.API_URL}/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getUsers() {
  const { data } = await axiosUsers.get("/");
  return data;
}

export async function getUser(id: number) {
  const { data } = await axiosUsers.get(`/${id}`);
  return data;
}

export async function createUser(user: UserValues) {
  const { data } = await axiosUsers.post("/", user);
  return data;
}

export async function updateUser(id: number, user: UserValues) {
  const { data } = await axiosUsers.put(`/${id}`, user);
  return data;
}

export async function deleteUser(id: number) {
  const { data } = await axiosUsers.delete(`/${id}`);
  return data;
}
