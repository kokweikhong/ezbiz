"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PageClientEnquiryFormSchema = z.object({
  name: z.string(),
  email: z.string(),
});

type PageClientEnquiryFormProps = {
  themeColor?: string;
};

const PageClientEnquiryForm: React.FC<PageClientEnquiryFormProps> = ({
  themeColor,
}) => {
  const form = useForm<z.infer<typeof PageClientEnquiryFormSchema>>({
    resolver: zodResolver(PageClientEnquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof PageClientEnquiryFormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-center flex flex-col gap-y-[25px]">
          <FormField
            control={form.control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-[17px]">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-[#7a7a7a] font-medium"
                    {...field}
                    id="name"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email" className="text-[17px]">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-[#7a7a7a] font-medium"
                    {...field}
                    id="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full">
            <Button
              type="submit"
              style={{ backgroundColor: themeColor }}
              className="text-[17px] w-full"
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PageClientEnquiryForm;
