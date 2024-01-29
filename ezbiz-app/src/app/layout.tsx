import AuthSessionProvider from "@/components/AuthSessionProvider";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { rajdhani } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ezbiz - Your Business Card",
  description: "Ezbiz is a business card generator.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <QueryProvider>
          <body className={`${rajdhani.variable} font-rajdhani`}>
            {children}
            <Toaster richColors />
          </body>
        </QueryProvider>
      </AuthSessionProvider>
    </html>
  );
}
