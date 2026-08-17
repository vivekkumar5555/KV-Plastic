import { notFound } from "next/navigation";
import { IconFile } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { getLeadById } from "@/lib/admin-queries";
import { updateLeadDetails } from "../actions";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);
  if (!lead) notFound();

  const files: { name: string; url: string }[] = lead.files
    ? JSON.parse(lead.files)
    : [];

  const fields: [string, string | null][] = [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Product", lead.product],
    ["Material", lead.material],
    ["Quantity", lead.quantity],
    ["Timeline", lead.timeline],
  ];

  const action = updateLeadDetails.bind(null, lead.id);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-text">{lead.name}</h1>
        <LeadStatusSelect id={lead.id} status={lead.status} />
      </div>

      <Card className="mt-6">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {fields.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-wide text-text-secondary">
                {label}
              </dt>
              <dd className="mt-1 text-sm text-text">{value || "—"}</dd>
            </div>
          ))}
        </dl>
        {lead.notes && (
          <div className="mt-4 border-t-[0.5px] border-border pt-4">
            <dt className="text-xs uppercase tracking-wide text-text-secondary">
              Customer Notes
            </dt>
            <dd className="mt-1 text-sm text-text">{lead.notes}</dd>
          </div>
        )}
      </Card>

      {files.length > 0 && (
        <Card className="mt-6">
          <h2 className="text-text">Uploaded Files</h2>
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li key={f.url}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <IconFile size={16} stroke={1.75} />
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="mt-6">
        <h2 className="text-text">Internal Notes</h2>
        <form action={action} className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="assignedTo">
              Assigned To
            </label>
            <input
              id="assignedTo"
              name="assignedTo"
              defaultValue={lead.assignedTo ?? ""}
              className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="adminNotes">
              Notes
            </label>
            <textarea
              id="adminNotes"
              name="adminNotes"
              rows={4}
              defaultValue={lead.adminNotes ?? ""}
              className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary"
            />
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Card>
    </div>
  );
}
