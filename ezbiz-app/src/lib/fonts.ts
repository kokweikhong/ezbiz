import localFont from "next/font/local";

export const rajdhani = localFont({
  variable: "--font-rajdhani",
  src: [
    {
      path: "../../public/fonts/Rajdhani/Rajdhani-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rajdhani/Rajdhani-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rajdhani/Rajdhani-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rajdhani/Rajdhani-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Rajdhani/Rajdhani-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
