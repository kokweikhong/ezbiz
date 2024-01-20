import { Control, UseFormReturn } from "react-hook-form";
import { ContentValues } from "./content";

export type ContentFormProps =
  | {
      isImage: true;
      form: UseFormReturn<ContentValues>;
      themeColor: string;
      saveDir: string;
    }
  | {
      isImage: false;
      form: UseFormReturn<ContentValues>;
      themeColor?: string;
    };
