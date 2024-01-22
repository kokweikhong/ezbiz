"use client";

import { mockUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { deleteUser } from "@/services/users";
import { Menu, Transition } from "@headlessui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, MoreVerticalIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";
import { getUsers } from "@/services/users";

const UserList = () => {
  const queryClient = useQueryClient();

  // const users = mockUsers;
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });


  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function handleDeleteUser(id: number) {
    toast("Are you confirm to delete this user?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(deleteUserMutation.mutateAsync(id), {
            loading: "Deleting user...",
            success: "User deleted successfully",
            error: "Error deleting user",
          });
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast("User deletion cancelled");
        },
      },
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users?.map((user) => (
        <li key={user.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-4 items-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              {user.isActive ? (
                <CheckCircleIcon className="text-green-500" />
              ) : (
                <XCircleIcon className="text-red-500" />
              )}
              <span
                className={cn(
                  "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium",
                  user.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                <svg
                  className={cn(
                    "h-1.5 w-1.5",
                    user.isActive ? "fill-green-500" : "fill-red-500"
                  )}
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>
                {user.pageLimit}
              </span>
            </div>
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {`${user.firstName}, ${user.lastName}`}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900 capitalize">{user.role}</p>
              {user.createdAt && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Created at{" "}
                  <time dateTime={user.createdAt}>
                    {user.createdAt.split("T")[0]}
                  </time>
                </p>
              )}
              {user.updatedAt && (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Updated at{" "}
                  <time dateTime={user.updatedAt}>
                    {user.updatedAt.split("T")[0]}
                  </time>
                </p>
              )}
            </div>
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
                        href={`/users/${user.id}`}
                        className={cn(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Edit
                        <span className="sr-only">, {user.email}</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className={cn(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left"
                        )}
                      >
                        Delete<span className="sr-only">, {user.email}</span>
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
};

export default UserList;
