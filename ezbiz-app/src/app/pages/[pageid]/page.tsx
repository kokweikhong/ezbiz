import shareSvg from "@/../public/svg/share.svg";
import PageAbout from "@/components/PageAbout";
import PageFooter from "@/components/PageFooter";
import PageGallery from "@/components/PageGallery";
import PageQrcodeDialog from "@/components/PageQrcodeDialog";
import PageSaveContact from "@/components/PageSaveContact";
import QrcodeVCard from "@/components/QrcodeVCard";
import { isWithImageExtension } from "@/lib/image";
import { demoPageDetails as data } from "@/lib/mockdata";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page({ params }: { params: { pageid: string } }) {
  const sectionClass = "max-w-[500px] mx-auto p-[10px]";
  return (
    <main className="mx-auto">
      <section
        style={{ backgroundColor: data.themeColor }}
        className={cn("h-screen relative")}
      >
        {data.backgroundImage && isWithImageExtension(data.backgroundImage) && (
          <>
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src={data.backgroundImage}
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
            <PageQrcodeDialog themeColor={data.themeColor}>
              <div className="mx-auto md:mr-auto md:w-full">
                <QrcodeVCard
                  name="Zen Lai"
                  email="asdad@asdads.com"
                  phone="0123456789"
                  website="https://google.com"
                />
              </div>
            </PageQrcodeDialog>
            <button
              style={{ backgroundColor: data.themeColor }}
              className="p-[10px] shadow-lg rounded-lg"
            >
              <Image src={shareSvg} alt="share" width={29} height={29} />
            </button>
          </div>

          <div className="rounded-full overflow-hidden border-4 border-white bg-white mt-[20px]">
            {data.profilePicture &&
              isWithImageExtension(data.profilePicture) && (
                <Image
                  // loader={imageLoader}
                  src={data.profilePicture}
                  alt="profile picture"
                  width={172}
                  height={172}
                  className="rounded-full"
                />
              )}
          </div>

          <div className="text-center mt-[20px] font-semibold">
            <h2 className="text-[26px] mb-[5px]">{data.displayName}</h2>
            <h2 className="text-[21px]">{data.businessTagline}</h2>
          </div>

          <div className="mt-[20px] font-semibold">
            <PageSaveContact
              name="Zen Lai"
              email="asdad@asdads.com"
              phone="0123456789"
              website="https://google.com"
              themeColor={data.themeColor}
            />
          </div>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <PageAbout content={data.content} themeColor={data.themeColor} />
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <PageGallery themeColor={data.themeColor} images={data.gallery ?? []} />
      </section>

      <section className="mt-[30px] bg-[#3a3a3a]">
        <PageFooter themeColor={data.themeColor} />
      </section>
    </main>
  );
}
