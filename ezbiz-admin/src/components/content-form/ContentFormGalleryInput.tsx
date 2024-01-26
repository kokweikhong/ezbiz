import { ContentValues } from "@/interfaces/content"
import { FC } from "react"
import { Control, ControllerRenderProps } from "react-hook-form"
import { FormField, FormItem } from "../ui/form"
import ContentFormImageInput from "./ContentFormImageInput"

type ContentFormGalleryInputProps = {
  control: Control<ContentValues>
  field: ControllerRenderProps<ContentValues, "gallery">
  saveDir: string
  themeColor?: string
}

const ContentFormGalleryInput: FC<ContentFormGalleryInputProps> = ({ control, field, saveDir, themeColor }) => {
  return (
    <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        Gallery
      </span>
      <div className="mt-1 sm:mt-0 sm:col-span-2 space-y-4">
        {field.value?.map((image, index) => (
          <FormField
            key={index}
            control={control}
            name={`gallery.${index}`}
            defaultValue=""
            render={({ field }) => (
              <ContentFormImageInput
                field={field}
                labelText={`Gallery ${index + 1}`}
                saveDir={saveDir}
                newFileName={`gallery-${index + 1}`}
                themeColor={themeColor}
              />
            )}
          />
        ))}
      </div>
    </FormItem>
  )
}

export default ContentFormGalleryInput
