"use client";

import { PlusIcon, ImageOffIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSocials, deleteSocial } from "@/services/socials";
import Image from "next/image";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import Link from "next/link";
import { EditIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Page() {

  const [bgColor, setBgColor] = useState("bg-white");

  const socials = useQuery({
    queryKey: ["socials"],
    queryFn: () => getSocials(),
  });

  const queryClient = useQueryClient();

  const deleteSocialMutation = useMutation({
    mutationFn: (id: number) => deleteSocial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
    },
  });

  function handleDeleteSocial(id: number) {
    toast("Are you confirm to delete this social?", {
      action: {
        label: "Delete",
        onClick: () =>
          toast.promise(deleteSocialMutation.mutateAsync(id), {
            loading: "Deleting social...",
            success: "Social deleted successfully",
            error: "Error while deleting social",
          }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  }


  if (socials.isLoading) {
    return <div>Loading...</div>;
  }

  if (socials.isError) {
    throw socials.error;
  }

  return (
    <div className="mx-auto max-w-lg">
      <div>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
            Socials list
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Socials are used to connect with your friends and family.
          </p>
        </div>
        <Link href={"/socials/create"} className="mt-6 block w-full px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
          Create a new social
        </Link>
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Switch id="airplane-mode" onCheckedChange={() => {
          setBgColor(bgColor === "bg-white" ? "bg-black" : "bg-white");
        }} />
        <Label htmlFor="airplane-mode">{bgColor === "bg-white" ? "White" : "Black"}</Label>
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-500">
          Socials you added
        </h3>
        <ul
          role="list"
          className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          {socials?.data?.map((social, socialIdx) => (
            <li
              key={socialIdx}
              className="flex items-center justify-between space-x-3 py-4"
            >
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="flex-shrink-0">
                  {social.imagePath && isWithImageExtension(social.imagePath) ? (
                    <div className={cn(bgColor)}>
                      <Image
                        loader={imageLoader}
                        src={social.imagePath}
                        alt={social.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  ) : (
                    <ImageOffIcon className="h-10 w-10 rounded-full text-gray-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {social.name}
                  </p>
                  <p className="truncate text-sm font-medium text-gray-500">
                    {social.placeholder}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 grid grid-cols-2 space-x-2">
                <Link
                  href={`/socials/update/${social.id}`}
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                >
                  <EditIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (!social.id) return;
                    handleDeleteSocial(social.id)
                  }}
                  className="inline-flex items-center gap-x-1.5 text-sm font-semibold leading-6 text-gray-900"
                >
                  <TrashIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
