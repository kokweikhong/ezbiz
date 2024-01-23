import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ContentValues } from "@/interfaces/content";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import ContentImageInput from "./ContentImageInput";

type ContentGalleryProps = {
  form: UseFormReturn<ContentValues>;
  saveDir: string;
};

const ContentGallery: React.FC<ContentGalleryProps> = ({ form, saveDir }) => {
  const images = form.watch("gallery") || [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Gallery
      </span>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((item, index) => (
            <FormField
              control={form.control}
              name={`gallery.${index}`}
              defaultValue=""
              key={index}
              render={({ field }) => (
                <div>
                  <FormItem className="">
                    <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                      {`Gallery ${index + 1}`}
                    </FormLabel>

                    <FormControl>
                      <ContentImageInput
                        field={field}
                        // color={themeColor}
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
    </div>
  );
};

export default ContentGallery;
