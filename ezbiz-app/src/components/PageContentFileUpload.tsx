"use client";

import { ContentValues } from "@/interfaces/content";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import { cn } from "@/lib/utils";
import { uploadFile } from "@/services/file";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { FC, InputHTMLAttributes, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { toast } from "sonner";

type PageContentFileUploadProps = {
  field: ControllerRenderProps<ContentValues, any>;
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  color?: string;
  saveDir: string;
};

const PageContentFileUpload: FC<PageContentFileUploadProps> = ({
  field,
  accept,
  color = "blue",
  saveDir,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_EZBIZ_BACKEND_URL;

  console.log(backendUrl);

  async function handleFileOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("saveDir", saveDir);
    toast.promise(uploadFile(data), {
      loading: "Uploading file...",
      success(data) {
        field.onChange(data);
        setFile(file);
        return "File uploaded successfully";
      },
      error(error) {
        return error.message;
      },
    });
  }

  return (
    <div className="flex flex-wrap space-x-2 space-y-2 w-full items-center justify-start">
      <div
        className={cn(
          "relative",
          isWithImageExtension(field.value) || file ? "basis-full mb-4" : "mr-2"
        )}
      >
        {isWithImageExtension(field.value) || file ? (
          <Image
            loader={imageLoader}
            placeholder="empty"
            src={
              isWithImageExtension(field.value)
                ? `${backendUrl}/${field.value}`
                : URL.createObjectURL(file as Blob)
            }
            width={40}
            height={40}
            alt="file"
            className="w-[280px] h-auto object-cover"
          />
        ) : (
          <ImageIcon className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <label
        style={{ borderColor: color, backgroundColor: color }}
        className="flex text-white items-center px-4 py-2 rounded-lg tracking-wide uppercase border cursor-pointer hover:shadow-md"
      >
        <svg
          className="w-6 h-6"
          fill={"white"}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="ml-2 text-sm leading-normal">Select a file</span>
        <input
          type="file"
          accept={accept || "image/*"}
          // defaultValue={field.value || ""}
          className="hidden"
          // value={field.value || ""}
          onChange={(e) => {
            toast("Are you confirm to upload file to server?", {
              action: {
                label: "Confirm",
                onClick: () => handleFileOnChange(e),
              },
              cancel: {
                label: "Cancel",
                onClick: () => toast.dismiss(),
              },
              duration: 10000,
              position: "top-center",
            });
          }}
        />
      </label>

      <span className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm sm:max-w-xs sm:text-sm sm:leading-6">
        {field.value}
      </span>
    </div>
  );
};

export default PageContentFileUpload;
