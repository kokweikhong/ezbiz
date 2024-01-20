"use client";

import shareSvg from "@/../public/svg/share.svg";
import About from "@/components/pages/About";
import Footer from "@/components/pages/Footer";
import Gallery from "@/components/pages/Gallery";
import QrcodeDialog from "@/components/pages/QrcodeDialog";
import SaveContact from "@/components/pages/SaveContact";
import QrcodeVCard from "@/components/pages/QrcodeVCard";
import { imageLoader, isWithImageExtension } from "@/lib/image";
import { demoPageDetails as data } from "@/lib/mockdata";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useQuery } from "react-query";
import { getContentsByUrl } from "@/services/content";
import ShareContent from "@/components/pages/ShareContent";

export default function Page({ params }: { params: { pageid: string } }) {
  const content = useQuery({
    queryKey: ["page", params.pageid],
    queryFn: () => getContentsByUrl(params.pageid),
    enabled: !!params.pageid,
  });
  console.log(content.data);
  const sectionClass = "max-w-[500px] mx-auto p-[10px]";

  if (content.isLoading) {
    return <div>Loading...</div>;
  }

  if (content.isError) {
    throw content.error;
  }

  if (!content.data) {
    return <div>Page not found</div>;
  }

  return (
    <main className="mx-auto">
      <section
        style={{ backgroundColor: content.data.themeColor }}
        className={cn("h-screen relative")}
      >
        {content.data.backgroundImage &&
          isWithImageExtension(content.data.backgroundImage) && (
            <>
              <div className="absolute top-0 left-0 w-full h-full">
                <Image
                  loader={imageLoader}
                  src={content.data.backgroundImage}
                  alt="background image"
                  sizes="(max-width: 640px) 100vw, 640px"
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute left-0 top-0 w-full h-full z-10 bg-black/25"></div>
            </>
          )}
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-20 flex flex-col items-center justify-center text-white",
            sectionClass
          )}
        >
          <div className="w-full flex justify-between p-[10px]">
            <QrcodeDialog themeColor={content.data.themeColor}>
              <div className="mx-auto md:mr-auto md:w-full">
                <QrcodeVCard
                  name={content.data.displayName}
                  email={content.data.emailAddress}
                  phone={content.data.contactNo ?? ""}
                  website={content.data.website}
                />
              </div>
            </QrcodeDialog>
            <ShareContent themeColor={content.data.themeColor} />
          </div>

          <div className="rounded-full overflow-hidden border-4 border-white bg-white mt-[20px]">
            {content.data.profilePicture &&
              isWithImageExtension(content.data.profilePicture) && (
                <Image
                  loader={imageLoader}
                  src={content.data.profilePicture}
                  alt="profile picture"
                  width={172}
                  height={172}
                  className="rounded-full"
                />
              )}
          </div>

          <div className="text-center mt-[20px] font-semibold">
            <h2 className="text-[26px] mb-[5px]">{content.data.displayName}</h2>
            <h2 className="text-[21px]">{content.data.businessTagline}</h2>
          </div>

          <div className="mt-[20px] font-semibold">
            <SaveContact
              name={content.data.displayName}
              email={content.data.emailAddress}
              phone={content.data.contactNo ?? ""}
              website={content.data.website}
              themeColor={content.data.themeColor}
            />
          </div>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <About
          content={content.data.content}
          themeColor={content.data.themeColor}
        />
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <Gallery
          themeColor={content.data.themeColor}
          images={content.data.gallery?.filter((image) => image !== "") ?? []}
        />
      </section>

      <section className="mt-[30px] bg-[#3a3a3a]">
        <Footer themeColor={content.data.themeColor} />
      </section>
    </main>
  );
}
