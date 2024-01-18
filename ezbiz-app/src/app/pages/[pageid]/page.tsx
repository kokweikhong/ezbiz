import qrCodeSvg from "@/../public/svg/qrcode.svg";
import shareSvg from "@/../public/svg/share.svg";
import PageFooter from "@/components/PageFooter";
import PageImageSlider from "@/components/PageImageSlider";
import { Button } from "@/components/ui/button";
import { demoPageDetails as data } from "@/lib/mockdata";
import { cn, isWithImageExtension } from "@/lib/utils";
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
            <button
              style={{ backgroundColor: data.themeColor }}
              className="p-[10px] shadow-lg rounded-lg"
            >
              <Image src={shareSvg} alt="share" width={29} height={29} />
            </button>

            <button
              style={{ backgroundColor: data.themeColor }}
              className="p-[10px] shadow-lg rounded-lg"
            >
              <Image src={qrCodeSvg} alt="qr code" width={29} height={29} />
            </button>
          </div>

          <div className="rounded-full overflow-hidden border-4 border-white bg-white mt-[20px]">
            {data.profilePicture &&
              isWithImageExtension(data.profilePicture) && (
                <Image
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
            <Button
              style={{ backgroundColor: data.themeColor }}
              className="text-white px-[25px] py-[15px] rounded-[50px] text-[14pt] font-semibold"
              asChild
            >
              <a href="#">Save Contact</a>
            </Button>
          </div>
        </div>
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <h2
          style={{ color: data.themeColor }}
          className="text-3xl font-semibold mb-[20px]"
        >
          About
        </h2>
        <article
          className="prose lg:prose-xl text-[#808080]"
          dangerouslySetInnerHTML={{ __html: data.content as string }}
        ></article>
      </section>

      <section className={cn(sectionClass, "mt-[30px]")}>
        <h2
          style={{ color: data.themeColor }}
          className="text-3xl font-semibold mb-[20px]"
        >
          Gallery
        </h2>
        <div>
          <PageImageSlider images={data.gallery ?? []} />
        </div>
      </section>

      <section className="mt-[30px] bg-[#3a3a3a]">
        <PageFooter themeColor={data.themeColor} />
      </section>
    </main>
  );
}
