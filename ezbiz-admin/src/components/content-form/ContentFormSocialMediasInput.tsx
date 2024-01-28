import { ContentValues } from "@/interfaces/content"
import { FC } from "react"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormField, FormDescription } from "@/components/ui/form"
import { Input } from "../ui/input"

type ContentFormSocialMediasInputProps = {
  form: UseFormReturn<ContentValues>
  field: ControllerRenderProps<ContentValues, "socialMedias">
}

const ContentFormSocialMediasInput: FC<ContentFormSocialMediasInputProps> = ({ field, form }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
      {field.value?.map((social, index) => (
        <FormField
          key={index}
          control={form.control}
          name={`socialMedias.${index}.url`}
          defaultValue={social.url}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{social.name}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>{social.placeholder}</FormDescription>
            </FormItem>
          )}
        />
      ))}
    </div>
  )
}

export default ContentFormSocialMediasInput
