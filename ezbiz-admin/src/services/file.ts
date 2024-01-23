"use server";

import axios from "axios";

const axiosFile = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/file`,
});

export async function uploadFile(formData: FormData): Promise<string> {
  const response = await axiosFile.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
