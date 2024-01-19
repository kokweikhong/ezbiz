"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import VCard from "vcard-creator";

type PageSaveContactProps = {
  name: string;
  email?: string;
  phone: string;
  website?: string;
  themeColor?: string;
};

const PageSaveContact: React.FC<PageSaveContactProps> = ({
  name,
  email = "",
  phone,
  website = "",
  themeColor,
}) => {
  const vcfRef = React.useRef<HTMLAnchorElement>(null);
  const [url, setUrl] = React.useState<string>("");
  const myVCard = new VCard();

  myVCard.addName(name).addEmail(email).addPhoneNumber(phone).addURL(website);

  var blob = new Blob([myVCard.toString()], { type: "text/vcard" });

  vcfRef.current?.download && (vcfRef.current.download = "contact.vcf");
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.URL.createObjectURL(blob));
    }
  }, []);

  return (
    <div>
      <Button
        style={{ backgroundColor: themeColor }}
        className="text-white px-[25px] py-[15px] rounded-[50px] text-[14pt] font-semibold"
        asChild
      >
        <a href={url}>Save Contact</a>
      </Button>
    </div>
  );
};

export default PageSaveContact;
