import Layout from "@/components/Layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ezbiz Admin",
  description: "Ezbiz Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`h-full bg-white ${inter.className}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
