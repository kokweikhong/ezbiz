"use client";

import ContentForm from "@/components/content-form/ContentForm";
import { getContent } from "@/services/content";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }: { params: { pageid: string } }) {
  const content = useQuery({
    queryKey: ["content", params.pageid],
    queryFn: () => getContent(parseInt(params.pageid)),
  });

  if (content.isLoading) {
    return <div>Loading...</div>;
  }

  if (content.isError) {
    throw content.error;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Edit Page</h1>
      <ContentForm data={content.data} />
    </div>
  );
}
