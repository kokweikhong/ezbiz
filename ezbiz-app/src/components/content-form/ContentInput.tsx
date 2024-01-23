import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ContentValues } from "@/interfaces/content";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type ContentTextInputProps = {
  children: React.ReactNode;
  field: ControllerRenderProps<ContentValues, any>;
  label: string;
  description?: string;
};

const ContentInput: React.FC<ContentTextInputProps> = ({
  children,
  label,
  description,
}) => {
  return (
    <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        {label}
      </FormLabel>
      <div className="mt-2 sm:col-span-2 sm:mt-0">
        {children}
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormItem>
  );
};

export default ContentInput;
