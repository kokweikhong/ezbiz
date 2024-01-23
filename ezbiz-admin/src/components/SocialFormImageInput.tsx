import { SocialValues } from "@/interfaces/social";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormLabel, FormControl } from "@/components/ui/form";
import { uploadFile } from "@/services/file";
import { toast } from "sonner";
import Image from "next/image";
import { isWithImageExtension, imageLoader } from "@/lib/image";
import { ImageOffIcon, ArrowUpCircleIcon } from "lucide-react";

type SocialFormImageInputProps = {
  field: ControllerRenderProps<SocialValues, "imagePath">;
  filename: string;
};

const SocialFormImageInput: FC<SocialFormImageInputProps> = ({ field, filename }) => {

  function handleImageOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("saveDir", "socials");
    formData.append("newFilename", filename);
    toast("Are you confirm to upload this image?", {
      action: {
        label: "Upload",
        onClick: () => toast.promise(uploadFile(formData), {
          loading: "Uploading image...",
          success(data) {
            field.onChange(data);
            return "Image uploaded";
          },
          error: "Error while uploading image"
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss()
      }
    })
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center space-x-6">
        <div className="shrink-0 bg-gray-500">
          {field.value && isWithImageExtension(field.value) ? (
            <Image
              loader={imageLoader}
              src={field.value}
              width={64}
              height={64}
              alt="Current profile photo"
              className="h-16 w-16 object-cover rounded-full"
            />
          ) : (
            <ImageOffIcon className="h-16 w-16 rounded-full text-gray-500" />
          )}
        </div>
        <FormLabel className="block">
          <span className="sr-only">Choose profile photo</span>
        </FormLabel>
        <FormControl>
          <Input
            readOnly
            className="w-full"
            {...field}
          />

        </FormControl>
      </div>
      <div className="relative">
        <label htmlFor="file-upload" className="cursor-pointer flex items-center gap-4 px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:bg-darker dark:hover:before:border-gray-500 before:bg-gray-100 dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
          <div className="w-max relative">
            <ArrowUpCircleIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500" />
          </div>
          <div className="relative">
            <span className="block text-base font-semibold relative text-blue-900 dark:text-white group-hover:text-blue-500">
              Upload a file
            </span>
          </div>
        </label>
        <input
          type="file"
          id="file-upload"
          hidden
          onChange={(e) => {
            if (filename === "" || !filename) {
              toast.warning("Please fill the name field first");
              return;
            }
            handleImageOnChange(e);
          }}
        />
      </div>
    </div>
  );
}

export default SocialFormImageInput;
