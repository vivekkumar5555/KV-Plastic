import { LeadsTable } from "@/components/admin/LeadsTable";
import { getAllLeads } from "@/lib/admin-queries";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await getAllLeads();

  return (
    <div>
      <h1 className="text-text">Leads</h1>
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
