"use client";

import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { MoreVerticalIcon } from "lucide-react";
import { Fragment } from "react";
import { getContents, deleteContent } from "@/services/content";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";

const statuses = {
  Active: "text-green-700 bg-green-50 ring-green-600/20",
  // "In progress": "text-gray-600 bg-gray-50 ring-gray-500/10",
  NonActive: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
};

export default function Page() {
  const queryClient = useQueryClient();

  const contents = useQuery({
    queryKey: ["contents"],
    queryFn: () => getContents(),
  });

  const contentMutation = useMutation({
    mutationFn: (id: number) => deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      toast("Content deleted successfully");
    },
  });

  function handleDeleteContent(id: number) {
    toast("Are you sure you want to delete this content?", {
      action: {
        label: "Yes",
        onClick: () => contentMutation.mutate(id),
      },
      cancel: {
        label: "No",
        onClick: () => toast.dismiss(),
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
    <ul role="list" className="divide-y divide-gray-100">
      {contents?.data?.map((content) => (
        <li
          key={content.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {content.url}
              </p>
              <p
                className={cn(
                  "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  content.isActive ? statuses.Active : statuses.NonActive
                )}
              >
                {content.isActive ? "Active" : "NonActive"}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Due on{" "}
                <time dateTime={content.expireAt}>{content.expireAt}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Created by {content.displayName}</p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <a
              href={`${process.env.NEXT_PUBLIC_EZBIZ_APP_URL}/pages/${content.url}`}
              target="_blank"
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View project<span className="sr-only">, {content.url}</span>
            </a>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <MoreVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/pages/${content.id}`}
                        className={cn(
                          active ? "bg-gray-50" : "",
                          "text-left w-full block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Edit<span className="sr-only">, {content.id}</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={cn(
                          active ? "bg-gray-50" : "",
                          "text-left w-full block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                        onClick={() => handleDeleteContent(content.id as number)}
                      >
                        Delete<span className="sr-only">, {content.id}</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  );
}
