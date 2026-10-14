"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Role } from "@prisma/client";
import { updateUserRole } from "@/app/admin/(dashboard)/users/actions";

export function UserRoleSelect({
  id,
  role,
  disabled,
}: {
  id: string;
  role: Role;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      defaultValue={role}
      disabled={isPending || disabled}
      onChange={(e) => {
        const value = e.target.value as Role;
        startTransition(async () => {
          await updateUserRole(id, value);
          router.refresh();
        });
      }}
      className="rounded-input border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-primary disabled:opacity-50"
    >
      <option value="ADMIN">Admin</option>
      <option value="EDITOR">Editor</option>
    </select>
  );
}
