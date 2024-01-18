export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </section>
  );
}
