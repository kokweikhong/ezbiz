import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <AdminHeader />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}
