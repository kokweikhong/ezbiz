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
import { Input } from "@/components/ui/input";

const InputContactNo: React.FC<ContentFormProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="contactNo"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="contactNo"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Contact No
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <FormControl>
              <Input
                id="contactNo"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                {...field}
              />
            </FormControl>
            <FormDescription>60xxxxxxxxxxx</FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default InputContactNo;
