"use client";

import { useActionState } from "react";
import { bootstrapAdmin } from "./actions";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export function SetupForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    bootstrapAdmin,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-sm text-text-secondary" htmlFor="name">
          Name
        </label>
        <input id="name" name="name" required className={inputClass} />
      </div>
      <div>
        <label className="text-sm text-text-secondary" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-sm text-text-secondary" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className={inputClass}
        />
      </div>

      {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Creating account…" : "Create Admin Account"}
      </Button>
    </form>
  );
}
