import TiptapEditor from "@/components/content-form/TiptapEditor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContentValues } from "@/interfaces/content";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type ContentFormRichTextInputProps = {
  form: UseFormReturn<ContentValues>;
};

const ContentFormRichTextInput: React.FC<ContentFormRichTextInputProps> = ({
  form,
}) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Short Description
      </span>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        <FormField
          control={form.control}
          name="content"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="content"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                File Location
              </FormLabel>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div>
                  <TiptapEditor field={field} />
                </div>
                <FormControl>
                  <Input
                    id="content"
                    className="hidden w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                    {...field}
                    hidden
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContentFormRichTextInput;
