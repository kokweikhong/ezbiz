import React from "react";
import type { ContentFormProps } from "@/interfaces/content-form";
import ContentFileUpload from "@/components/content-form/ContentFileUpload";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const InputProfilePicture: React.FC<
  Exclude<ContentFormProps, { isImage: false }>
> = ({ form, themeColor, saveDir }) => {
  return (
    <FormField
      control={form.control}
      name="profilePicture"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="profilePicture"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Profile Picture
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <FormControl>
              <ContentFileUpload
                id="profilePicture"
                field={field}
                accept="image/*"
                color={themeColor}
                saveDir={saveDir}
                newFilename="profile-picture"
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputProfilePicture;
