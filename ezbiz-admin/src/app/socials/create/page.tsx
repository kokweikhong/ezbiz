"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { SocialSchema, SocialValues } from "@/interfaces/social"
import { createSocial } from "@/services/socials"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import SocialFormImageInput from "@/components/SocialFormImageInput";
import { Button } from "@/components/ui/button";
import SocialForm from "@/components/SocialForm";

export default function Page() {
  const queryClient = useQueryClient()

  const socialsMutation = useMutation({
    mutationFn: (values: SocialValues) => createSocial(values),
    onSuccess: (data) => {
      queryClient.setQueryData(["socials"], (old: any) => [...old, data])
    }
  })

  const form = useForm<SocialValues>({
    resolver: zodResolver(SocialSchema),
    defaultValues: {
      id: 0,
    }
  })

  function onSubmit(values: SocialValues) {
    toast("Are you confirm to submit this new social?", {
      action: {
        label: "Submit",
        onClick: () => toast.promise(socialsMutation.mutateAsync(values), {
          loading: "Creating social...",
          success: "Social created successfully",
          error: "Error while creating social"
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss()
      }
    })
  }

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Create Social</h2>
      <SocialForm form={form} onSubmit={onSubmit} />
    </div>
  )
}

