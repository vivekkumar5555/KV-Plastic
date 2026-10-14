import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="site flex min-h-full flex-1 flex-col bg-bg text-text">
      <Header
        phone={settings.phone.split(",")[0]?.trim() ?? ""}
        email={settings.email}
        hours={settings.hours ?? ""}
      />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
