import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserFormInputProps } from "@/interfaces/user";
import { FC } from "react";

const EmailInput: FC<UserFormInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Email
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              {...field}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default EmailInput;
