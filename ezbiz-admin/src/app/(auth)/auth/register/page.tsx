"use client";

import UserForm from "@/components/user-form/UserForm";
import { UserValues } from "@/interfaces/user";
import { createUser, getUsers } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const { data: session } = useSession();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (values: UserValues) => createUser(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", data.id], data);
    },
  });

  if (users.isLoading) {
    return <div>Loading...</div>;
  }

  if (users.isError) {
    throw users.error;
  }

  if (
    users.data &&
    users.data.length > 0 &&
    session &&
    session.user.role !== "admin"
  ) {
    return (
      <div className="mt-12">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          You are not authorized to access this page
        </h1>
      </div>
    );
  }

  function onSubmit(values: UserValues) {
    console.log(values);
    toast("Are you confirm to create this user?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(createUserMutation.mutateAsync(values), {
            loading: "Creating user...",
            success(data) {
              redirect("/users");
              return `User ${data} created successfully`;
            },
            error: "Error creating user",
          });
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast("User creation cancelled");
        },
      },
    });
  }

  return (
    <div className="mt-12">
      <UserForm onSubmit={onSubmit} buttonText="create" />;
    </div>
  );
}
