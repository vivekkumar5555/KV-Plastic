import { notFound } from "next/navigation";
import { IconFile } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";
import { getLeadById } from "@/lib/admin-queries";
import { updateLeadDetails } from "../actions";

export const dynamic = "force-dynamic";

const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

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
    [
      "Received",
      lead.createdAt.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }),
    ],
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
            <dd className="mt-1 whitespace-pre-wrap wrap-break-word text-sm text-text">
              {lead.notes}
            </dd>
          </div>
        )}
      </Card>

      <Card className="mt-6">
        <h2 className="text-text">Uploaded Files</h2>
        {files.length === 0 ? (
          <p className="mt-3 text-sm text-text-secondary">
            No files were attached to this request.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {files.map((f) => {
              const stored = f.url.startsWith("/api/uploads/");
              const isImage = IMAGE_EXT.test(f.name);
              return (
                <li
                  key={f.url}
                  className="overflow-hidden rounded-input border-[0.5px] border-border"
                >
                  {stored && isImage && (
                    <a href={f.url} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element -- auth-protected file, not optimizable */}
                      <img
                        src={f.url}
                        alt={f.name}
                        loading="lazy"
                        className="h-48 w-full bg-bg-alt object-contain"
                      />
                    </a>
                  )}
                  <div className="flex items-center gap-2 px-3 py-2 text-sm">
                    <IconFile size={16} stroke={1.75} className="shrink-0 text-text-secondary" />
                    {stored ? (
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="min-w-0 break-all text-primary hover:underline"
                      >
                        {f.name}
                      </a>
                    ) : (
                      <span className="min-w-0 wrap-break-word text-text-secondary">
                        {f.name} — no longer available (uploaded before file
                        storage was fixed)
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

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
