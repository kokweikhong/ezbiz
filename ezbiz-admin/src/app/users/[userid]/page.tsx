"use client";

import UserForm from "@/components/user-form/UserForm";
import { UserSchema, UserValues } from "@/interfaces/user";
import { getUser, updateUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page({ params }: { params: { userid: string } }) {
  console.log(params.userid);
  const queryClient = useQueryClient();

  const user = useQuery({
    queryKey: ["users", params.userid],
    queryFn: () => getUser(parseInt(params.userid)),
    enabled: !!params.userid,
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: UserValues) => updateUser(values.id, values),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", data.id], data);
    },
  });


  const form = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: user.data,
  });

  useEffect(() => {
    if (user.data) {
      form.reset(user.data);
    }
  }, [user.data]);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }


  console.log(user.data);

  function onSubmit(values: UserValues) {
    console.log(values);
    toast("Are you confirm to update this user?", {
      action: {
        label: "Yes",
        onClick: () => {
          toast.promise(updateUserMutation.mutateAsync(values), {
            loading: "Updating user...",
            success: "User updated successfully",
            error: "Error updating user",
          });
        },
      },
      cancel: {
        label: "No",
        onClick: () => {
          toast("User update cancelled");
        },
      },
    });
  }

  return (
    <div>
      <UserForm form={form} onSubmit={onSubmit} buttonText="update" />
    </div>
  );
}
