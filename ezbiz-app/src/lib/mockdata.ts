import type { ContentValues } from "@/interfaces/content";

export const demoPageDetails: ContentValues = {
  id: 1,
  userId: 1,
  backgroundImage: "/demo-1/EZBIZ-MAEJIC-BG.jpg",
  themeColor: "#5c109b",
  profilePicture: "/demo-1/Maejic-Final-Logo-Square-01.jpg",
  companyLogo: "",
  displayName: "MAEJIC MEDIA",
  businessTagline: "Digital Marketing Agency",
  contactNo: "09123456789",
  emailAddress: "",
  website: "ezbiz.maejicmedia.com",
  socialMedias: [
    {
      id: "facebook",
      name: "Facebook",
      placeholder: "https://facebook.com/",
      url: "www.facebook.com",
    },
  ],
  location: "",
  content:
    '<p>With&nbsp;<strong>3 years</strong>&nbsp;of experiences, our team has helped more than&nbsp;<strong>62 brands</strong>&nbsp;in their marketing, every single case we’ve got satisfaction rates up to&nbsp;<strong>91%</strong>&nbsp;from our happy customers.</p><p style="text-align: start">The services we cover include:<br><strong>1. Corporate Branding<br>2. Digital Marketing</strong><br><strong>3. Website development&nbsp;</strong></p>',
  gallery: [
    "/demo-1/Gallery-01.jpg",
    "/demo-1/Gallery-02.jpg",
    "/demo-1/Gallery-03.jpg",
    "/demo-1/Gallery-04.jpg",
    "/demo-1/Gallery-05.jpg",
    "/demo-1/Gallery-06.jpg",
    "/demo-1/Gallery-07.jpg",
    "/demo-1/Gallery-08.jpg",
    "/demo-1/Gallery-09.jpg",
    "/demo-1/Gallery-10.jpg",
  ],
  isActive: true,
};
