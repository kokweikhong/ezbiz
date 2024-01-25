import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContentValues } from "@/interfaces/content";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import { uploadFile } from "@/services/file";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { toast } from "sonner";

type ContentFormImageInputProps = {
  field: ControllerRenderProps<ContentValues, any>;
  saveDir?: string;
  newFileName?: string;
  labelText: string;
};

const ContentFormImageInput: FC<ContentFormImageInputProps> = ({
  field,
  saveDir,
  newFileName,
  labelText,
}) => {
  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("saveDir", saveDir ?? "");
    formData.append("newFileName", newFileName ?? "");

    // toast action to ask confirmation
    toast("Are you confirm to upload this file?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(uploadFile(formData), {
            loading: "Uploading file...",
            success: (data) => {
              field.onChange(data);
              return "File uploaded successfully";
            },
            error: "Error uploading file",
          });
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast("File upload cancelled");
        },
      },
    });
  }
  return (
    <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        {labelText}
      </span>

      <div className="mt-2 sm:col-span-2 sm:mt-0 flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          {!isWithImageExtension(field.value) ? (
            <ImageOffIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
          ) : (
            <Image
              loader={imageLoader}
              src={field.value}
              alt={field.value.split("/").pop()!}
              width={200}
              height={200}
              className="mx-auto h-12 w-12 text-gray-300"
            />
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <FormLabel className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                Select a file
              </span>
              <FormControl className="mt-2 sm:col-span-2 sm:mt-0">
                <Input
                  type="file"
                  className="sr-only"
                  // value={field.value}
                  onChange={handleUploadFile}
                />
              </FormControl>
            </FormLabel>
          </div>
          <p className="text-xs leading-5 text-gray-600">Up to 10MB</p>
        </div>
      </div>
    </FormItem>
  );
};

export default ContentFormImageInput;
