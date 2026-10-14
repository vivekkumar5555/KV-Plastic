"use client";

import { useActionState } from "react";
import { authenticate } from "./actions";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="text-sm text-text-secondary" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-input border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-primary focus:ring-3 focus:ring-primary/15"
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
          className="mt-1 w-full rounded-input border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-primary focus:ring-3 focus:ring-primary/15"
        />
      </div>

      {errorMessage && <p className="text-sm text-error">{errorMessage}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
