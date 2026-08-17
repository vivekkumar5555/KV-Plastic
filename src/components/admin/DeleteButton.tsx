"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function DeleteButton({
  onDelete,
  confirmMessage = "Are you sure you want to delete this?",
}: {
  onDelete: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(async () => {
            await onDelete();
            router.refresh();
          });
        }
      }}
      className="text-sm text-error transition-opacity duration-200 hover:underline disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
