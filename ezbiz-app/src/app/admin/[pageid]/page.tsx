"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ContentValues,
  contentSchema,
  defaultSocialMedias,
} from "@/interfaces/content";
import { demoPageDetails } from "@/lib/mockdata";
import { getContentById, updateContent } from "@/services/content";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "sonner";
import InputUrl from "@/components/content-form/InputUrl";
import InputBackgroundImage from "@/components/content-form/InputBackgroundImage";
import InputThemeColor from "@/components/content-form/InputThemeColor";
import InputProfilePicture from "@/components/content-form/InputProfilePicture";
import InputCompanyLogo from "@/components/content-form/InputCompanyLogo";
import InputDisplayName from "@/components/content-form/InputDisplayName";
import InputBusinessTagline from "@/components/content-form/InputBusinessTagline";
import InputContactNo from "@/components/content-form/InputContactNo";
import InputEmailAdress from "@/components/content-form/InputEmailAddress";
import InputWebsite from "@/components/content-form/InputWebsite";
import InputSocialMedia from "@/components/content-form/InputSocialMedia";
import InputLocation from "@/components/content-form/InputLocation";
import InputGallery from "@/components/content-form/InputGallery";
import InputShortDescription from "@/components/content-form/InputShortDescription";

export default function Page({ params }: { params: { pageid: string } }) {
  const queryClient = useQueryClient();
  const content = useQuery(
    ["content", params.pageid],
    () => getContentById(params.pageid),
    {
      onSuccess: (data) => {
        form.reset(data);
        mergeSocialMedias(data);
      },
      enabled: !!params.pageid,
    }
  );

  const updateContentMutate = useMutation({
    mutationFn: (values: ContentValues) => updateContent(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["content", data.id], data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const defaultSaveDir = `pages/${params.pageid}`;

  const form = useForm<ContentValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: content.data || demoPageDetails,
  });

  const themeColor = form.watch("themeColor");

  // merge socialMedias default to form and keep the form url.
  function mergeSocialMedias(data: ContentValues) {
    // const socialMedias = form.getValues("socialMedias");
    if (!data.socialMedias) {
      form.setValue("socialMedias", defaultSocialMedias);
      return;
    }
    const socialMediasWithDefault = defaultSocialMedias.map((item) => {
      const socialMedia = data.socialMedias.find(
        (socialMedia) => socialMedia.name === item.name
      );
      return {
        ...item,
        url: socialMedia?.url || "",
      };
    });
    form.setValue("socialMedias", socialMediasWithDefault);
  }

  async function onSubmit(values: ContentValues) {
    console.log(values);
    toast.promise(updateContentMutate.mutateAsync(values), {
      loading: "Updating content...",
      success: "Content updated successfully",
      error(error) {
        console.log(error);
        return error.message;
      },
    });
  }

  if (content.isLoading) {
    return <div>Loading...</div>;
  }

  if (content.isError) {
    throw content.error;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-12 sm:space-y-16">
          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <InputUrl form={form} isImage={false} />
            <InputBackgroundImage
              isImage={true}
              form={form}
              themeColor={themeColor as string}
              saveDir={defaultSaveDir}
            />
            <InputThemeColor
              isImage={false}
              form={form}
              themeColor={themeColor as string}
            />
            <InputProfilePicture
              isImage={true}
              form={form}
              themeColor={themeColor as string}
              saveDir={defaultSaveDir}
            />
            <InputCompanyLogo
              isImage={true}
              form={form}
              themeColor={themeColor as string}
              saveDir={defaultSaveDir}
            />
            <InputDisplayName isImage={false} form={form} />
            <InputBusinessTagline isImage={false} form={form} />
            <InputContactNo isImage={false} form={form} />
            <InputEmailAdress isImage={false} form={form} />
            <InputWebsite isImage={false} form={form} />
            <InputSocialMedia isImage={false} form={form} />
            <InputLocation isImage={false} form={form} />
            <InputGallery
              isImage={true}
              form={form}
              themeColor={themeColor as string}
              saveDir={defaultSaveDir}
            />
            <InputShortDescription isImage={false} form={form} />

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
