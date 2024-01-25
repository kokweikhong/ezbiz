import "../globals.css";
import QueryProvider from "@/components/QueryProvider";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <QueryProvider>
          <body>
            <main className="h-full bg-white container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Toaster richColors position="top-center" className="z-[10005]" />
          </body>
        </QueryProvider>
      </AuthProvider>
    </html>
  );
}
