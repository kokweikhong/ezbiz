"use client";

import { FC } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { SocialValues } from "@/interfaces/social";
import SocialFormImageInput from "./SocialFormImageInput";

type SocialFormProps = {
  onSubmit: (data: SocialValues) => void;
  form: UseFormReturn<SocialValues>;
};

const SocialForm: FC<SocialFormProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="placeholder"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placeholder</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Placeholder is to help end user to understand what to put in the input
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imagePath"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <SocialFormImageInput field={field} filename={form.watch("name")} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit" className="">
              Submit
            </Button>
          </div>

        </div>
      </form>
    </Form>
  );
}

export default SocialForm;
