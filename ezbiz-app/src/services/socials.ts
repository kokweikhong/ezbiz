"use server"

import axios from "axios";
import { SocialMediaValues } from "@/interfaces/content";

const axiosSocials = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/socials`,
});

export async function getSocials(): Promise<SocialMediaValues[]> {
  const res = await axiosSocials.get("/");
  return res.data;
}
