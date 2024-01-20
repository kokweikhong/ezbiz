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
import { Separator } from "@/components/ui/separator";

const InputGallery: React.FC<Exclude<ContentFormProps, { isImage: false }>> = ({
  form,
  themeColor,
  saveDir,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Gallery
      </span>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        {form.watch("gallery")?.map((item, index) => (
          <FormField
            control={form.control}
            name={`gallery.${index}`}
            defaultValue=""
            key={index}
            render={({ field }) => (
              <div>
                <FormItem className="">
                  <FormLabel
                    htmlFor={`gallery-${index + 1}`}
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    {`Gallery ${index + 1}`}
                  </FormLabel>

                  <FormControl>
                    <ContentFileUpload
                      id={`gallery-${index + 1}`}
                      field={field}
                      accept="image/*"
                      color={themeColor}
                      saveDir={saveDir}
                      newFilename={`gallery-${index + 1}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Separator className="my-2" />
              </div>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default InputGallery;
