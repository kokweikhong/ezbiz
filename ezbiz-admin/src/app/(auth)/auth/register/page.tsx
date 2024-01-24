"use client";

import UserForm from "@/components/user-form/UserForm";
import { UserValues } from "@/interfaces/user";
import { createUser } from "@/services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Page() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (values: UserValues) => createUser(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", data.id], data);
    },
  });

  function onSubmit(values: UserValues) {
    console.log(values);
    toast("Are you confirm to create this user?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(createUserMutation.mutateAsync(values), {
            loading: "Creating user...",
            success: "User created successfully",
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
