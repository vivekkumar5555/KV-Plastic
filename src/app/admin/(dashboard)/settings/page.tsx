import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="text-text">Site Settings</h1>
      <div className="mt-6 max-w-2xl">
        <SiteSettingsForm settings={settings} />
      </div>
    </div>
  );
}
