"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import ContentGallery from "@/components/content-form/ContentGallery";
import ContentImageInput from "@/components/content-form/ContentImageInput";
import ContentInput from "@/components/content-form/ContentInput";
import ContentShortDescription from "@/components/content-form/ContentShortDescription";
import { default as ContentSocialMedias } from "@/components/content-form/ContentSocialMedias";
import InputThemeColor from "@/components/content-form/InputThemeColor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ContentValues,
  contentSchema,
  defaultSocialMedias,
} from "@/interfaces/content";
// import { demoPageDetails } from "@/lib/mockdata";
import { cn } from "@/lib/utils";
import { getContentById, updateContent, getContentWithDefaultSocials } from "@/services/content";
import { getSocials } from "@/services/socials";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

export default function Page({ params }: { params: { pageid: string } }) {
  const queryClient = useQueryClient();
  // const socials = useQuery({
  //   queryKey: ["socials"],
  //   queryFn: () => getSocials(),
  // });

  // console.log(socials.data);

  const content = useQuery(
    ["content", params.pageid],
    () => getContentWithDefaultSocials(params.pageid),
    {
      onSuccess: (data) => {
        if (!data) return;
        form.reset(data);
        // mergeSocialMedias(data);
      },
      enabled: !!params.pageid,
    }
  );

  console.log(content.data);

  const updateContentMutate = useMutation({
    mutationFn: (values: ContentValues) => updateContent(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["content", params.pageid]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const defaultSaveDir = `pages/${params.pageid}`;

  const defaultInputClass =
    "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6";

  const form = useForm<ContentValues>({
    resolver: zodResolver(contentSchema),
  });

  const themeColor = form.watch("themeColor");

  // merge socialMedias default to form and keep the form url.
  // function mergeSocialMedias(data: ContentValues) {
  //   if (!socials.data) return;
  //   // const socialMedias = form.getValues("socialMedias");
  //   if (!data.socialMedias) {
  //     form.setValue("socialMedias", socials.data);
  //     return;
  //   }
  //   const socialMediasWithDefault = socials.data.map((item) => {
  //     const socialMedia = data.socialMedias.find(
  //       (socialMedia) => socialMedia.name === item.name
  //     );
  //     return {
  //       ...item,
  //       url: socialMedia?.url || "",
  //     };
  //   });
  //   form.setValue("socialMedias", socialMediasWithDefault);
  // }


  // if (socials.isError) {
  //   throw socials.error;
  // }


  function onSubmit(values: ContentValues) {
    toast("Are you sure you want to update?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(
            updateContentMutate.mutateAsync(values),
            {
              loading: "Updating...",
              success: "Updated!",
              error: "Error updating",
            },
          )
        }
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast.dismiss();
        }
      }
    });
  }


  if (content.isLoading) {
    return <LoadingOverlay />
  }

  if (content.isError) {
    console.log(content.error);
    throw content.error;
  }

  if (!content.data) {
    return <div>Page not found</div>
  }

  // useEffect(() => {
  //   mergeSocialMedias(form.getValues());
  // }, []);

  // console.log(form.formState.errors);

  // if (content.isLoading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (content.isError) {
  //   throw content.error;
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-12 sm:space-y-16">
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <FormField
              control={form.control}
              name="userId"
              defaultValue={1}
              render={({ field }) => (
                <ContentInput field={field} label="User ID">
                  <FormControl>
                    <Input
                      className={cn(defaultInputClass)}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                      hidden
                    />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Url">
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="backgroundImage"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Background Image">
                  <ContentImageInput
                    field={field}
                    saveDir={`${defaultSaveDir}`}
                    newFilename={"background-image"}
                  />
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="themeColor"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Theme Color">
                  <InputThemeColor
                    field={field}
                    themeColor={themeColor as string}
                  />
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="profilePicture"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Profile Picture">
                  <ContentImageInput
                    field={field}
                    saveDir={`${defaultSaveDir}`}
                    newFilename={"profile-pictur"}
                  />
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Company Logo">
                  <ContentImageInput
                    field={field}
                    saveDir={`${defaultSaveDir}`}
                    newFilename={"company-logo"}
                  />
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput
                  field={field}
                  label="Display Name"
                  description="Your Name or Your Business Name"
                >
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="businessTagline"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput
                  field={field}
                  label="Job Position / Business Tagline"
                  description="Job Position / Business Tagline"
                >
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="contactNo"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput
                  field={field}
                  label="Contact No"
                  description="601xxxxxxxxx"
                >
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="emailAddress"
              defaultValue={"example@example.com"}
              render={({ field }) => (
                <ContentInput field={field} label="Email">
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      className={cn(defaultInputClass)}
                      {...field}
                    />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Website">
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              defaultValue={""}
              render={({ field }) => (
                <ContentInput field={field} label="Location">
                  <FormControl>
                    <Input className={cn(defaultInputClass)} {...field} />
                  </FormControl>
                </ContentInput>
              )}
            />

            <ContentSocialMedias form={form} label="Social Medias" />

            <ContentGallery form={form} saveDir={defaultSaveDir} />

            <ContentShortDescription form={form} />

            <div className="w-full flex items-center">
              <Button
                type="submit"
                style={{ backgroundColor: themeColor }}
                className="ml-auto"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
