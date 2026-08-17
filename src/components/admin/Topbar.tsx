import Link from "next/link";
import { IconLogout, IconExternalLink } from "@tabler/icons-react";
import { logout } from "@/app/admin/logout-action";

export function Topbar({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b-[0.5px] border-border bg-white px-6">
      <div />
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-1 text-sm text-text-secondary transition-colors duration-200 hover:text-primary sm:flex"
        >
          View Site
          <IconExternalLink size={14} stroke={1.75} />
        </Link>

        <div className="text-right">
          <div className="text-sm text-text">{name}</div>
          <div className="text-xs text-text-secondary capitalize">
            {role.toLowerCase()}
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Sign out"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-bg-alt hover:text-primary"
          >
            <IconLogout size={18} stroke={1.75} />
          </button>
        </form>
      </div>
    </header>
  );
}
