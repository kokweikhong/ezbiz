import React from "react";
import type { ContentFormProps } from "@/interfaces/content-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const InputSocialMedia: React.FC<ContentFormProps> = ({ form }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Social Medias
      </span>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        {form.watch("socialMedias")?.map((item, index) => (
          <FormField
            key={`${item.name}-${index}`}
            control={form.control}
            name={`socialMedias.${index}.url` as const}
            defaultValue=""
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel
                  htmlFor={`social-${index}`}
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  {item.name}
                </FormLabel>
                <FormControl>
                  <Input
                    id={`social-${index}`}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                    placeholder={item.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default InputSocialMedia;
