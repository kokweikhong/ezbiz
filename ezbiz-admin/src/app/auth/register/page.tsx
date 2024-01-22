"use client";

import UserForm from "@/components/user-form/UserForm";
import { UserSchema, UserValues } from "@/interfaces/user";
import { createUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (values: UserValues) => createUser(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", data.id], data);
    },
  });

  const form = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
      isActive: true,
      pageLimit: 1,
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

  return <UserForm form={form} onSubmit={onSubmit} buttonText="create" />;
}
