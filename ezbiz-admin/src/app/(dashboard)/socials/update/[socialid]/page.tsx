"use client";

import SocialForm from "@/components/SocialForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SocialSchema, SocialValues } from "@/interfaces/social"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSocial, updateSocial } from "@/services/socials";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Page({ params }: { params: { socialid: string } }) {
  const queryClient = useQueryClient()

  const social = useQuery({
    queryKey: ["social", params.socialid],
    queryFn: () => getSocial(parseInt(params.socialid)),
    enabled: !!params.socialid
  })

  const updateSocialMutation = useMutation({
    mutationFn: (values: SocialValues) => updateSocial(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social", params.socialid] })
    }
  })

  const form = useForm<SocialValues>({
    resolver: zodResolver(SocialSchema),
    defaultValues: social.data
  })

  function onSubmit(values: SocialValues) {
    toast("Are you confirm to update this social?", {
      action: {
        label: "Update",
        onClick: () => toast.promise(updateSocialMutation.mutateAsync(values), {
          loading: "Updating social...",
          success: "Social updated successfully",
          error: "Error while updating social"
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss()
      }
    })
  }

  useEffect(() => {
    if (social.data) {
      form.reset(social.data)
    }
  }, [social.data])

  if (social.isLoading) {
    return <div>Loading...</div>
  }

  if (social.isError) {
    throw social.error
  }

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Social</h2>
      <div className="mx-auto max-w-lg">
        <SocialForm form={form} onSubmit={onSubmit} />
      </div>
    </div>

  )

}
