"use client";

import { useQRCode } from "next-qrcode";
import React from "react";
import VCard from "vcard-creator";

type QrcodeVCardProps = {
  name: string;
  email?: string;
  phone: string;
  website?: string;
};

const QrcodeVCard: React.FC<QrcodeVCardProps> = ({
  name,
  email = "",
  phone,
  website = "",
}) => {
  const { Image } = useQRCode();
  const myVCard = new VCard();

  myVCard.addName(name).addEmail(email).addPhoneNumber(phone).addURL(website);

  return (
    <Image
      text={`${myVCard.toString()}`}
      options={{
        type: "image/jpeg",
        quality: 0.3,
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
      }}
    />
  );
};

export default QrcodeVCard;
