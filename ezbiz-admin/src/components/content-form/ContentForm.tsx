"use client";

import ContentFormInput from "@/components/content-form/ContentFormInput";
import ContentFormSocialMediasInput from "./ContentFormSocialMediasInput";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContentSchema, ContentValues } from "@/interfaces/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ContentFormImageInput from "./ContentFormImageInput";
import ContentColorInput from "./ContentColorInput";
import ContentFormGalleryInput from "./ContentFormGalleryInput";
import ContentFormRichTextInput from "./ContentFormRichTextInput";
import { FC } from "react";
import { updateContent } from "@/services/content";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getSocials } from "@/services/socials";
import { toast } from "sonner";
import { SocialValues } from "@/interfaces/social";

type ContentFormProps = {
  data?: ContentValues;
};

const ContentForm: FC<ContentFormProps> = ({ data }) => {
  console.log(data);
  const queryClient = useQueryClient();

  // const socials = useQuery({
  //   queryKey: ["socials"],
  //   queryFn: () => getSocials(),
  //
  //
  // onSuccess: (socials: SocialValues[]) => {
  //   // merge socials into data, and if data's social is empty, use socials
  //   // if data social is not empty, use data social url
  //   // const socialsMap = new Map(socials.map((social) => [social.name, social]));
  //   const socialsData = data?.socialMedias ?? [];
  //   const socialsDataMap = new Map(socialsData.map((social) => [social.name, social]));
  //   const mergedSocials = socials.map((social) => {
  //     const dataSocial = socialsDataMap.get(social.name);
  //     if (dataSocial) {
  //       return dataSocial;
  //     }
  //     return social;
  //   });
  //   form.setValue("socialMedias", mergedSocials);
  // },
  //
  // });

  const updateContentMutation = useMutation({
    mutationFn: (values: ContentValues) => updateContent(values.id ?? -1, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", data?.id] });
    },
  });



  const form = useForm<ContentValues>({
    resolver: zodResolver(ContentSchema),
    defaultValues: data ?? {},
  });

  const themeColor = form.watch("themeColor");
  const defaultSaveDir = `pages/${form.watch("userId")}`

  if (updateContentMutation.isPending) {
    return <div>Loading...</div>;
  }


  const errors = form.formState.errors;

  console.log(errors);


  function onSubmit(values: ContentValues) {
    console.log(values);
    toast("Are you confirm to save this content?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(updateContentMutation.mutateAsync(values), {
            loading: "Saving content...",
            success: (data) => {
              return `Content id ${data.id} saved successfully`;
            }
          });
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast.dismiss();
        },
      },
    });
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
                  themeColor={themeColor}
                />
              )}
            />

            {/* Theme Color */}
            <FormField
              control={form.control}
              name="themeColor"
              defaultValue="#000000"
              render={({ field }) => (
                <ContentColorInput field={field} />
              )}
            />

            {/* Profile Picture */}
            <FormField
              control={form.control}
              name="profilePicture"
              defaultValue=""
              render={({ field }) => (
                <ContentFormImageInput
                  field={field}
                  labelText="Profile Picture"
                  themeColor={themeColor}
                />
              )}
            />

            {/* Company Logo */}
            <FormField
              control={form.control}
              name="companyLogo"
              defaultValue=""
              render={({ field }) => (
                <ContentFormImageInput
                  field={field}
                  labelText="Company Logo"
                  themeColor={themeColor}
                />
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

            {/* Business Tagline */}
            <FormField
              control={form.control}
              name="businessTagline"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Business Tagline">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Contact Number */}
            <FormField
              control={form.control}
              name="contactNo"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Contact Number">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="emailAddress"
              defaultValue="example@example.com"
              render={({ field }) => (
                <ContentFormInput labelText="Email Address">
                  <Input type="email" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Website */}
            <FormField
              control={form.control}
              name="website"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Website">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              defaultValue=""
              render={({ field }) => (
                <ContentFormInput labelText="Location">
                  <Input type="text" {...field} />
                </ContentFormInput>
              )}
            />

            {/* Social Medias */}
            <FormField
              control={form.control}
              name="socialMedias"
              defaultValue={[]}
              render={({ field }) => (

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Social Medias
                  </span>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <ContentFormSocialMediasInput form={form} field={field} />
                  </div>
                </div>
              )}
            />

            {/* Gallery */}
            <FormField
              control={form.control}
              name="gallery"
              defaultValue={["", "", "", "", "", "", "", "", "", ""]}
              render={({ field }) => (
                <ContentFormGalleryInput
                  control={form.control}
                  field={field}
                  saveDir={defaultSaveDir}
                  themeColor={themeColor}
                />
              )}
            />


            {/* Content */}
            <ContentFormRichTextInput form={form} />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: themeColor }}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContentForm;
