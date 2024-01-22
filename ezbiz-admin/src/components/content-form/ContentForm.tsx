"use client";

import ContentFormInput from "@/components/content-form/ContentFormInput";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContentSchema, ContentValues } from "@/interfaces/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContentFormImageInput from "./ContentFormImageInput";

const ContentForm = () => {
  const form = useForm<ContentValues>({
    resolver: zodResolver(ContentSchema),
  });

  function onSubmit(values: ContentValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-12 sm:space-y-16">
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            {/* Url */}
            <FormField
              control={form.control}
              name="url"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Url">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Display Name">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Background Image */}
            <FormField
              control={form.control}
              name="backgroundImage"
              defaultValue=""
              render={({ field }) => (
                <ContentFormImageInput
                  field={field}
                  labelText="Background Image"
                />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContentForm;
