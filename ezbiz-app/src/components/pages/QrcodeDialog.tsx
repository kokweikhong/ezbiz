"use client";

import qrCodeSvg from "@/../public/svg/qrcode.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

type QrcodeDialogProps = {
  children?: React.ReactNode;
  themeColor?: string;
};

const QrcodeDialog: React.FC<QrcodeDialogProps> = ({
  children,
  themeColor,
}) => {
  return (
    <Dialog>
      <DialogTrigger
        style={{ backgroundColor: themeColor }}
        className="p-[10px] shadow-lg rounded-lg"
      >
        <Image src={qrCodeSvg} alt="qr code" width={29} height={29} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            style={{ color: themeColor }}
            className="text-[29px] font-semibold"
          >
            QR Code
          </DialogTitle>
          <DialogDescription className="text-[19px] text-[#7A7A7A]">
            Scan The QR Code To Save My Contact In Your Phone Book.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default QrcodeDialog;
