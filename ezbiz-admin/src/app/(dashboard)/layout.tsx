import Layout from "@/components/Layout";
import QueryProvider from "@/components/QueryProvider";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { poppins } from "@/lib/fonts";
import type { Metadata } from "next";
import "../globals.css";

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
      <AuthProvider>
        <QueryProvider>
          <body className={`h-full bg-white ${poppins.className} font-poppins`}>
            <Layout>{children}</Layout>
            <Toaster richColors position="top-center" className="z-[10005]" />
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  );
}
