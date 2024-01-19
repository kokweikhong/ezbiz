"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const userSignInSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

export default function Page() {
  const params = useSearchParams();
  const form = useForm<z.infer<typeof userSignInSchema>>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userSignInSchema>) {
    console.log(values);
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: params.get("callbackUrl") ?? "/",
    });
  }

  return (
    <main className="container mx-auto">
      <div className="m-auto max-w-[500px]">
        <Card className="mt-[30px]">
          <CardHeader>
            <CardTitle>Ezbiz Maejic</CardTitle>
            <CardDescription>Log in form</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Log in</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
