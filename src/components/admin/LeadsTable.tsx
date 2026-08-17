"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { RfqSubmission } from "@prisma/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  IN_REVIEW: "In Review",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

const STATUS_TONES: Record<string, "accent" | "primary" | "success" | "error"> = {
  NEW: "accent",
  IN_REVIEW: "primary",
  QUOTED: "primary",
  WON: "success",
  LOST: "error",
};

function toCsv(rows: RfqSubmission[]) {
  const headers = [
    "Name",
    "Email",
    "Company",
    "Phone",
    "Product",
    "Material",
    "Quantity",
    "Timeline",
    "Status",
    "Assigned To",
    "Created At",
  ];
  const lines = rows.map((r) =>
    [
      r.name,
      r.email,
      r.company ?? "",
      r.phone ?? "",
      r.product ?? "",
      r.material ?? "",
      r.quantity ?? "",
      r.timeline ?? "",
      STATUS_LABELS[r.status],
      r.assignedTo ?? "",
      new Date(r.createdAt).toISOString(),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [headers.join(","), ...lines].join("\n");
}

export function LeadsTable({ leads }: { leads: RfqSubmission[] }) {
  const [status, setStatus] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = status === "ALL" || l.status === status;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [leads, status, query]);

  function exportCsv() {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company"
            className="w-64 rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <Button type="button" variant="secondary" onClick={exportCsv}>
          Export CSV
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-card border-[0.5px] border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Phone</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-b-[0.5px] border-border last:border-0 hover:bg-bg-alt"
              >
                <td className="px-6 py-3">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {lead.name}
                  </Link>
                  <div className="text-xs text-text-secondary">{lead.email}</div>
                </td>
                <td className="px-6 py-3 text-text-secondary">
                  {lead.phone ?? "—"}
                </td>
                <td className="px-6 py-3 text-text-secondary">
                  {lead.company ?? "—"}
                </td>
                <td className="px-6 py-3 text-text-secondary">
                  {lead.product ?? "—"}
                </td>
                <td className="px-6 py-3">
                  <Badge tone={STATUS_TONES[lead.status]}>
                    {STATUS_LABELS[lead.status]}
                  </Badge>
                </td>
                <td className="px-6 py-3 text-text-secondary">
                  {new Date(lead.createdAt).toLocaleDateString("en-US")}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
