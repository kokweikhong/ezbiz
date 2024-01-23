"use client";

import { SocialMediaValues } from "@/interfaces/content";
import { getSocials } from "@/services/socials";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import Image from "next/image";

type SocialMediasProps = {
  data: SocialMediaValues[];
};

const SocialMedias: FC<SocialMediasProps> = ({ data }) => {
  const [socialMedias, setSocialMedias] = useState<SocialMediaValues[]>(data);

  const socials = useQuery({
    queryKey: ["socials"],
    queryFn: () => getSocials(),
  });

  useEffect(() => {
    if (!socials.data) return;
    console.log(socials.data);
    // merge socials.data imagePath with data
    const newData = data
      .map((item) => {
        const social = socials.data.find(
          (social) => social.name?.toLowerCase() === item.name?.toLowerCase()
        );
        if (!social) return item;
        return {
          ...item,
          imagePath: social.imagePath,
        };
      })
      .filter((item) => item.url !== "");
    setSocialMedias(newData);
    console.log(newData);
  }, [data, socials.data]);

  if (socials.isLoading) {
    return <div>Loading...</div>;
  }

  if (socials.isError) {
    throw socials.error;
  }
  return (
    <div className="p-[10px] flex flex-wrap justify-center items-center gap-6">
      {socialMedias.map((social) => (
        <a
          href={social.url}
          key={social.name}
          className="flex flex-col space-y-2 items-center justify-center text-white"
        >
          {social.imagePath && isWithImageExtension(social.imagePath) && (
            <div>
              <Image
                loader={imageLoader}
                src={social.imagePath}
                alt={social.name || ""}
                width={30}
                height={30}
              />
            </div>
          )}
          <span className="text-lg font-semibold">{social.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialMedias;
