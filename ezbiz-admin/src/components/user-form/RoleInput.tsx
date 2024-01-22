import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserFormInputProps } from "@/interfaces/user";
import { FC } from "react";

const RoleInput: FC<UserFormInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="role"
      defaultValue=""
      render={({ field }) => (
        <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
          <FormLabel
            htmlFor="role"
            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
          >
            Role
          </FormLabel>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <select
              id="role"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              {...field}
            >
              <option value={"user"}>User</option>
              <option value={"admin"}>Admin</option>
            </select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default RoleInput;
