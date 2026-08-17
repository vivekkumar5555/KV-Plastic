"use client";

import { useActionState } from "react";
import type { SiteSettings } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updateSiteSettings } from "@/app/admin/(dashboard)/settings/actions";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [message, formAction, isPending] = useActionState(
    updateSiteSettings,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <Card className="space-y-4">
        <h2 className="text-text">Company Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="companyName">
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              required
              defaultValue={settings.companyName}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={settings.email}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="phone">
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              required
              defaultValue={settings.phone}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="hours">
              Business Hours
            </label>
            <input
              id="hours"
              name="hours"
              defaultValue={settings.hours ?? ""}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="address">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            required
            rows={2}
            defaultValue={settings.address}
            className={inputClass}
          />
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-text">Social Links</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="linkedinUrl">
              LinkedIn
            </label>
            <input
              id="linkedinUrl"
              name="linkedinUrl"
              defaultValue={settings.linkedinUrl ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="facebookUrl">
              Facebook
            </label>
            <input
              id="facebookUrl"
              name="facebookUrl"
              defaultValue={settings.facebookUrl ?? ""}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="instagramUrl">
              Instagram
            </label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              defaultValue={settings.instagramUrl ?? ""}
              className={inputClass}
            />
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-text">Footer</h2>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="footerNote">
            Footer Note
          </label>
          <textarea
            id="footerNote"
            name="footerNote"
            rows={2}
            defaultValue={settings.footerNote ?? ""}
            className={inputClass}
          />
        </div>
      </Card>

      {message && <p className="text-sm text-success">{message}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
