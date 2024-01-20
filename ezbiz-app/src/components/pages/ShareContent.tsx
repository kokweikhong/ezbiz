import Image from "next/image";
import React from "react";
import shareSvg from "@/../public/svg/share.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type ShareContentProps = {
  themeColor?: string;
};

const shareConfig = {
  facebook: {
    bg: "bg-[#3b5998]",
    bd: "border-[#3b5998]",
    tx: "text-[#3b5998]",
    path: (
      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
    ),
  },
  twitter: {
    path: (
      <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
    ),
  },
};

const ShareContent: React.FC<ShareContentProps> = ({ themeColor }) => {
  return (
    <Dialog>
      <DialogTrigger
        style={{ backgroundColor: themeColor }}
        className="p-[10px] shadow-lg rounded-lg"
      >
        <Image src={shareSvg} alt="share" width={29} height={29} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share it to your friends</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={cn(
              "border-2 h-[40px] flex items-center hover:brightness-[1.2] hover:saturate-[1.5] cursor-pointer",
              shareConfig.facebook.tx,
              shareConfig.facebook.bd
            )}
          >
            <div
              className={cn(
                "flex items-center w-[40px] justify-center h-[40px] border-2",
                shareConfig.facebook.bg,
                shareConfig.facebook.bd
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
                width={18}
                className={cn("rounded-full", shareConfig.facebook.bg)}
              >
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                {shareConfig.facebook.path}
              </svg>
            </div>
            <span className="flex-1 pl-[15px] text-[15px] font-bold">
              Facebook
            </span>
          </div>

          <div
            className={cn(
              "border-2 h-[40px] flex items-center hover:brightness-[1.2] hover:saturate-[1.5] cursor-pointer",
              shareConfig.facebook.tx,
              shareConfig.facebook.bd
            )}
          >
            <div
              className={cn(
                "flex items-center w-[40px] justify-center h-[40px] border-2",
                shareConfig.facebook.bg,
                shareConfig.facebook.bd
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
                width={18}
                className={cn("rounded-full", shareConfig.facebook.bg)}
              >
                {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
              </svg>
            </div>
            <span className="pl-[15px] text-[15px] font-bold">Facebook</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareContent;
