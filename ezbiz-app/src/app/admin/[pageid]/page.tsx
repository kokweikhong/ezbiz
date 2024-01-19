"use client";

import PageContentFileUpload from "@/components/PageContentFileUpload";
import TiptapEditor from "@/components/TiptapEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  ContentValues,
  contentSchema,
  defaultSocialMedias,
} from "@/interfaces/content";
import { demoPageDetails } from "@/lib/mockdata";
import { getContentById, updateContent } from "@/services/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sketch } from "@uiw/react-color";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "sonner";

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

  console.log(content.data);
  console.log(params);
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
    await updateContentMutate.mutateAsync(values);
    console.log("updated");
    // toast.promise(updateContentMutate.mutateAsync(values), {
    //   loading: "Updating content...",
    //   success: "Content updated successfully",
    //   error(error) {
    //     console.log(error);
    //     return error.message;
    //   },
    // });
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
            {/* Url */}
            <FormField
              control={form.control}
              name="url"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="url"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Url
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="url"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Background Image */}
            <FormField
              control={form.control}
              name="backgroundImage"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="backgroundImage"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Background Image
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        id="backgroundImage"
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
                        newFilename="background-image"
                      />
                    </FormControl>
                    {/* </PageDetailsFileUpload> */}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Theme Color */}
            <FormField
              control={form.control}
              name="themeColor"
              defaultValue="#0000FF"
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="themeColor"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Theme Color
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <div className="flex space-x-2">
                      <Popover>
                        <PopoverTrigger
                          type="button"
                          style={{ backgroundColor: themeColor }}
                          className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                        >
                          Select Color
                        </PopoverTrigger>
                        <PopoverContent>
                          <Sketch
                            color={field.value}
                            onChange={(color) => field.onChange(color.hex)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormControl>
                        <Input
                          id="themeColor"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Profile Picture */}
            <FormField
              control={form.control}
              name="profilePicture"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="profilePicture"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Profile Picture
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        id="profilePicture"
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
                        newFilename="profile-picture"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Company Logo */}
            <FormField
              control={form.control}
              name="companyLogo"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="companyLogo"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Company Logo
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        id="companyLogo"
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
                        newFilename="company-logo"
                      />
                    </FormControl>
                    <FormDescription>
                      For displaying company logo on top of profie picture use.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="displayName"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Display Name
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="displayName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your Name or Your Business Name
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Business Tagline */}
            <FormField
              control={form.control}
              name="businessTagline"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="businessTagline"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    {`Job Position / Business Tagline`}
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="businessTagline"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Job Position / Business Tagline
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Contact No */}
            <FormField
              control={form.control}
              name="contactNo"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="contactNo"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Contact No
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="contactNo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>60xxxxxxxxxxx</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="emailAddress"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Email
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Website */}
            <FormField
              control={form.control}
              name="website"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="website"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Website
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="website"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Social Medias */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Social Medias
              </span>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                {form.watch("socialMedias")?.map((item, index) => (
                  <FormField
                    key={`${item.name}-${index}`}
                    control={form.control}
                    name={`socialMedias.${index}.url` as const}
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel
                          htmlFor={`social-${index}`}
                          className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                          {item.name}
                        </FormLabel>
                        <FormControl>
                          <Input
                            id={`social-${index}`}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                            placeholder={item.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Location
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        id="location"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Gallery */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Gallery
              </span>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                {form.watch("gallery")?.map((item, index) => (
                  <FormField
                    control={form.control}
                    name={`gallery.${index}`}
                    defaultValue=""
                    key={index}
                    render={({ field }) => (
                      <div>
                        <FormItem className="">
                          <FormLabel
                            htmlFor={`gallery-${index + 1}`}
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                          >
                            {`Gallery ${index + 1}`}
                          </FormLabel>

                          <FormControl>
                            <PageContentFileUpload
                              id={`gallery-${index + 1}`}
                              field={field}
                              accept="image/*"
                              color={themeColor}
                              saveDir={`${defaultSaveDir}`}
                              newFilename={`gallery-${index + 1}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <Separator className="my-2" />
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Short Description */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <span className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Short Description
              </span>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <FormField
                  control={form.control}
                  name="content"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="content"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        File Location
                      </FormLabel>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div>
                          <TiptapEditor field={field} />
                        </div>
                        <FormControl>
                          <Input
                            id="content"
                            className="hidden w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                            {...field}
                            hidden
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

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
