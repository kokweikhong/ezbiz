import { Sketch } from "@uiw/react-color";
import { ControllerRenderProps } from "react-hook-form";
import { ContentValues } from "@/interfaces/content";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ContentColorInputProps = {
  field: ControllerRenderProps<ContentValues, "themeColor">;
}

const ContentColorInput: FC<ContentColorInputProps> = ({ field }) => {
  return (
    <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Theme Color
      </FormLabel>
      <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-center space-x-2">
        <Popover>
          <PopoverTrigger
            style={{ backgroundColor: field.value }}
            className="text-white px-4 py-2 rounded-md text-nowrap">
            Select Color
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Sketch
              color={field.value}
              onChange={(color) => field.onChange(color.hex)}
            />
          </PopoverContent>
        </Popover>
        <FormControl>
          <Input readOnly type="text" {...field} />
        </FormControl>
      </div>
    </FormItem>

  )



}

export default ContentColorInput
