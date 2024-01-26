import { Form } from "@/components/ui/form";
import FirstNameInput from "@/components/user-form/FirstNameInput";
import { UserSchema, UserValues } from "@/interfaces/user";
import { FC } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import EmailInput from "./EmailInput";
import IsActiveInput from "./IsActiveInput";
import LastNameInput from "./LastNameInput";
import PageLimitInput from "./PageLimitInput";
import PasswordInput from "./PasswordInput";
import RoleInput from "./RoleInput";
import { zodResolver } from "@hookform/resolvers/zod";

type UserFormProps = {
  onSubmit: (values: UserValues) => void;
  buttonText: "create" | "update";
  data?: UserValues;
};

const UserForm: FC<UserFormProps> = ({ onSubmit, buttonText, data }) => {
  const form = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: data || {},
  });

  const { errors } = form.formState;
  console.log(errors);



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12 sm:space-y-16">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
              <input type="number" name="id"  defaultValue={0} value={form.watch("id")} hidden />
              <FirstNameInput form={form} />
              <LastNameInput form={form} />
              <EmailInput form={form} />
              <PasswordInput form={form} />
              <RoleInput form={form} />
              <PageLimitInput form={form} />
              <IsActiveInput form={form} />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {buttonText === "create" && (
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => form.reset()}
              >
                Reset
              </button>
            )}
            <button
              type="submit"
              className="capitalize inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
