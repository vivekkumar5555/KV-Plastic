"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutDashboard,
  IconPackage,
  IconBriefcase,
  IconQuote,
  IconArticle,
  IconInbox,
  IconSettings,
  IconUsers,
  IconHistory,
} from "@tabler/icons-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: IconLayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: IconPackage },
  { href: "/admin/portfolio", label: "Portfolio", icon: IconBriefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: IconQuote },
  { href: "/admin/blog", label: "Blog", icon: IconArticle },
  { href: "/admin/leads", label: "Leads", icon: IconInbox },
  { href: "/admin/activity", label: "Activity Log", icon: IconHistory },
  { href: "/admin/settings", label: "Site Settings", icon: IconSettings },
];

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const items = isAdmin
    ? [...links, { href: "/admin/users", label: "Users", icon: IconUsers }]
    : links;

  return (
    <aside className="hidden w-56 shrink-0 border-r-[0.5px] border-border bg-white md:block">
      <div className="flex h-16 items-center border-b-[0.5px] border-border px-6">
        <Link href="/admin" className="text-base font-medium text-text">
          KV <span className="text-primary">Plastic</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {items.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-input px-3 py-2 text-sm transition-colors duration-200 ${
                active
                  ? "bg-primary-tint text-primary"
                  : "text-text-secondary hover:bg-bg-alt hover:text-text"
              }`}
            >
              <link.icon size={18} stroke={1.75} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
