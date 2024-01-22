"use server"

import axios from "axios";

const axiosFile = axios.create({
  baseURL: `${process.env.EZBIZ_BACKEND_API_URL}/file`,
});

export async function uploadFile(data: FormData) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const response = await axiosFile.post("/upload", data, config);
  return response.data;
}
