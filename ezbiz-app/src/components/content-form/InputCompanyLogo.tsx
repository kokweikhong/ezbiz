import React from "react";
import type { ContentFormProps } from "@/interfaces/content-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ContentFileUpload from "@/components/content-form/ContentFileUpload";

const InputCompanyLogo: React.FC<
  Exclude<ContentFormProps, { isImage: false }>
> = ({ form, themeColor, saveDir }) => {
  return (
    <FormField
      control={form.control}
      name="companyLogo"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="companyLogo"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Company Logo
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <FormControl>
              <ContentFileUpload
                id="companyLogo"
                field={field}
                accept="image/*"
                color={themeColor}
                saveDir={saveDir}
                newFilename="company-logo"
              />
            </FormControl>
            <FormDescription>
              For displaying company logo on top of profie picture use.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputCompanyLogo;
