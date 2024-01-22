import React from "react";
import type { ContentFormProps } from "@/interfaces/content-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sketch } from "@uiw/react-color";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { ControllerRenderProps } from "react-hook-form";
import { ContentValues } from "@/interfaces/content";

type InputThemeColorProps = {
  field: ControllerRenderProps<ContentValues, any>;
  themeColor?: string;
};

const InputThemeColor: React.FC<InputThemeColorProps> = ({
  field,
  themeColor,
}) => {
  return (
    <div className="flex space-x-2">
      <Popover>
        <PopoverTrigger
          type="button"
          style={{ backgroundColor: themeColor }}
          className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
        >
          Select Color
        </PopoverTrigger>
        <PopoverContent>
          <Sketch
            color={field.value}
            onChange={(color) => field.onChange(color.hex)}
          />
        </PopoverContent>
      </Popover>
      <FormControl>
        <Input
          id="themeColor"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
          {...field}
        />
      </FormControl>
    </div>
  );
};

export default InputThemeColor;
