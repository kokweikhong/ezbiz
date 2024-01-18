"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ChangeUserPasswordValues,
  changeUserPasswordSchema,
} from "@/interfaces/user";
import { changeUserPassword } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<ChangeUserPasswordValues>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  async function onSubmit(data: ChangeUserPasswordValues) {
    toast.promise(changeUserPassword(data), {
      loading: "Changing password...",
      success: "Password changed successfully",
      error(error) {
        return error.message;
      },
    });
  }

  return (
    <div className="mt-[50px]">
      <Card className="bg-gray-50 max-w-[500px] m-auto">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="email"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="oldPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPasswordConfirm"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
