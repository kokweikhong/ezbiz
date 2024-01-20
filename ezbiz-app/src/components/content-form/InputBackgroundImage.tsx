import React from "react";
import type { ContentFormProps } from "@/interfaces/content-form";
import ContentFileUpload from "@/components/content-form/ContentFileUpload";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const InputBackgroundImage: React.FC<
  Exclude<ContentFormProps, { isImage: false }>
> = ({ form, themeColor, saveDir }) => {
  return (
    <FormField
      control={form.control}
      name="backgroundImage"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="backgroundImage"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Background Image
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <FormControl>
              <ContentFileUpload
                id="backgroundImage"
                field={field}
                accept="image/*"
                color={themeColor}
                saveDir={saveDir}
                newFilename="background-image"
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputBackgroundImage;
