"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AdminNoProjects from "@/components/AdminNoProjects";
import {
  DefaultContentValues,
  defaultContentSchema,
} from "@/interfaces/content";
import { createDefaultContent, getContentsByUserId } from "@/services/content";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderIcon, PlusIcon, ImageOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import Image from "next/image";
import { imageLoader } from "@/lib/image";

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Tom Cook",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Whitney Francis",
    role: "Copywriter",
    imageUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    role: "Principal Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Page() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated" || !session) {
    redirect("/auth/signin");
  }

  const queryClient = useQueryClient();

  const contents = useQuery("contents", {
    queryFn: () => getContentsByUserId(session.user.id),
    enabled: !!session,
  });

  const { mutateAsync: createDefaultContentMutate } = useMutation({
    mutationFn: (data: DefaultContentValues) => createDefaultContent(data),
    onSuccess: () => {
      queryClient.invalidateQueries("contents");
    },
  });

  // console.log(contents.data);

  const form = useForm<DefaultContentValues>({
    resolver: zodResolver(defaultContentSchema),
    defaultValues: {
      userId: parseInt(session ? session.user.id : "0"),
      url: "",
    },
  });

  async function onSubmit(data: DefaultContentValues) {
    console.log(data);
    toast.promise(createDefaultContentMutate(data), {
      loading: "Creating new project...",
      success(data) {
        form.reset();
        return `New project created: ${data}`;
      },
      error(error) {
        return error.message;
      },
    });
  }

  if (contents.isLoading) {
    return <div>Loading...</div>;
  }

  if (contents.isError) {
    throw contents.error;
  }

  return (
    <div className="mx-auto max-w-md sm:max-w-3xl">
      <div>
        <div className="text-center">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
            Add project
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Get started by filling in the information below to create your new
            project.
          </p>
        </div>
        <Form {...form}>
          <form
            className="mt-6 sm:flex sm:items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="userId"
              defaultValue={0}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input type="number" {...field} hidden />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              defaultValue=""
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel htmlFor="url" className="sr-only">
                    URL
                  </FormLabel>
                  <div className="grid grid-cols-1 sm:flex-auto">
                    <FormControl>
                      <input
                        type="text"
                        id="url"
                        className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter a new project url"
                        {...field}
                      />
                    </FormControl>
                    <div
                      className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600"
                      aria-hidden="true"
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add project
              </button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">
          All projects you have access to
        </h3>
        {contents.data?.length === 0 ? (
          <div className="w-full py-8">
            <AdminNoProjects />
          </div>
        ) : (
          <ul
            role="list"
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {contents.data?.map((content) => (
              <li key={content.url}>
                <Link
                  href={`/admin/${content.id}`}
                  className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="flex min-w-0 flex-1 items-center space-x-3">
                    <span className="block flex-shrink-0">
                      {content.profilePicture ? (
                        <Image
                          loader={imageLoader}
                          src={content.profilePicture}
                          alt={content.displayName}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <ImageOffIcon className="h-10 w-10 rounded-full text-gray-500" />
                      )}
                    </span>
                    <span className="block min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-gray-900">
                        {content.displayName}
                      </span>
                      <span className="block truncate text-sm font-medium text-gray-500">
                        {content.url}
                      </span>
                    </span>
                  </span>
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <PlusIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
