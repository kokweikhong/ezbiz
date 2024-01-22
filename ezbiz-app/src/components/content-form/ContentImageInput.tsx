import { ImageOffIcon, UploadCloudIcon } from "lucide-react";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContentValues } from "@/interfaces/content";
import { ControllerRenderProps } from "react-hook-form";
import { FC } from "react";
import { toast } from "sonner";
import { uploadFile } from "@/services/file";
import { imageLoader } from "@/lib/image";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ContentImageInputProps = {
  field: ControllerRenderProps<ContentValues, any>;
  label: string;
  description?: string;
};

const ContentImageInput: FC<ContentImageInputProps> = ({ field }) => {
  console.log(field.value);
  function handleFileOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("saveDir", "content");
    data.append("newFilename", "");
    toast.promise(uploadFile(data), {
      loading: "Uploading file...",
      success(data) {
        field.onChange(data);
        return "File uploaded successfully";
      },
      error(error) {
        return error.message;
      },
    });
  }
  return (
    <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
      <div className="text-center">
        {field.value ? (
          <div className="h-[100px]">
            <Image
              src={field.value}
              loader={imageLoader}
              alt="content image"
              width={200}
              height={200}
              className="mx-auto h-full w-auto text-gray-300"
              aria-hidden="true"
            />
          </div>
        ) : (
          <ImageOffIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
        )}
        <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
          <FormLabel className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
            <span className="flex items-center justify-center w-full text-center">
              <UploadCloudIcon className="h-6 w-6" />
              <span className="ml-2 text-sm leading-normal">Upload a file</span>
            </span>
            <FormControl>
              <Input
                type="file"
                className="sr-only"
                defaultValue={""}
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
            </FormControl>
          </FormLabel>
        </div>
        <p className="text-xs leading-5 text-gray-600">Up to 10MB</p>
      </div>
    </div>
  );
};

export default ContentImageInput;
