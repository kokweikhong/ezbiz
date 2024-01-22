import { ContentValues } from "@/interfaces/content";
import { UseFormReturn } from "react-hook-form";

export type ContentFormInputProps = {
  form: UseFormReturn<ContentValues>;
  themeColor?: string;
};
