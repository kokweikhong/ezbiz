"use server";

import axios from "axios";
import { SocialValues } from "@/interfaces/social";

const axiosSocials = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/socials`,
  headers: {
    "Content-Type": "application/json",
  },
});


export async function getSocials() {
  const response = await axiosSocials.get<SocialValues[]>("/");
  return response.data;
}

export async function getSocial(id: number) {
  const response = await axiosSocials.get<SocialValues>(`/${id}`);
  return response.data;
}

export async function createSocial(social: SocialValues) {
  const response = await axiosSocials.post<SocialValues>("/", social);
  return response.data;
}

export async function updateSocial(social: SocialValues) {
  const response = await axiosSocials.put<SocialValues>(`/${social.id}`, social);
  return response.data;
}

export async function deleteSocial(id: number) {
  const response = await axiosSocials.delete<SocialValues>(`/${id}`);
  return response.data;
}
