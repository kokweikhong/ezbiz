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
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function Page({ params }: { params: { pageid: string } }) {
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
    toast.promise(updateContent(values), {
      loading: "Updating content...",
      success: "Content updated successfully",
      error(error) {
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
            {/* Background Image */}
            <FormField
              control={form.control}
              name="backgroundImage"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Background Image
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Profile Picture
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Company Logo
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <PageContentFileUpload
                        field={field}
                        accept="image/*"
                        color={themeColor}
                        saveDir={`${defaultSaveDir}`}
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Display Name
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    {`Job Position / Business Tagline`}
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Contact No
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Email
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
                        type="email"
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Website
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
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
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Social Medias
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                {form.watch("socialMedias")?.map((item, index) => (
                  <FormField
                    key={`${item.name}-${index}`}
                    control={form.control}
                    name={`socialMedias.${index}.url` as const}
                    defaultValue=""
                    // defaultValue={{
                    //   id: "",
                    //   name: "",
                    //   url: "",
                    //   placeholder: "",
                    // }}
                    render={({ field }) => (
                      <FormItem className="mb-2">
                        <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                          {item.name}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6"
                            placeholder={item.placeholder}
                            {...field}
                            // value={item.url}
                            // onChange={(e) => {
                            //   const socialMedias =
                            //     form.getValues("socialMedias");
                            //   socialMedias[index].url = e.target.value;
                            //   form.setValue("socialMedias", socialMedias);
                            // }}
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
                  <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                    Location
                  </FormLabel>
                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                    <FormControl>
                      <Input
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
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Gallery
              </label>
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
                          <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            {`Gallery ${index + 1}`}
                          </FormLabel>

                          <FormControl>
                            <PageContentFileUpload
                              field={field}
                              accept="image/*"
                              color={themeColor}
                              saveDir={`${defaultSaveDir}`}
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
              <label className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Short Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <FormField
                  control={form.control}
                  name="content"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                        File Location
                      </FormLabel>
                      <div className="mt-2 sm:col-span-2 sm:mt-0">
                        <div>
                          <TiptapEditor field={field} />
                        </div>
                        <FormControl>
                          <Input
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
