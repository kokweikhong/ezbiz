import axios from "axios";

const axiosFile = axios.create({
  baseURL: "http://localhost:8080/file",
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
