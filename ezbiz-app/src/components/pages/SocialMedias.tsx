import { SocialMediaValues } from "@/interfaces/content";
import { FC } from "react";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import Image from "next/image";

type SocialMediasProps = {
  data: SocialMediaValues[];
};

const SocialMedias: FC<SocialMediasProps> = ({ data }) => {

  return (
    <div className="p-[10px] flex flex-wrap justify-center items-center gap-6">
      {data.map((social) => (
        social.url !== "" &&
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
