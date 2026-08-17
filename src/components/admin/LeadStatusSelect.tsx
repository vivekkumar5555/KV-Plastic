"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { LeadStatus } from "@prisma/client";
import { updateLeadStatus } from "@/app/admin/(dashboard)/leads/actions";

const options: LeadStatus[] = ["NEW", "IN_REVIEW", "QUOTED", "WON", "LOST"];

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const value = e.target.value as LeadStatus;
        startTransition(async () => {
          await updateLeadStatus(id, value);
          router.refresh();
        });
      }}
      className="rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary disabled:opacity-50"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
