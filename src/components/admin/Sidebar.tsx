"use client";

import { useEffect, useState } from "react";
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
  IconMenu2,
  IconX,
  IconExternalLink,
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = isAdmin
    ? [...links, { href: "/admin/users", label: "Users", icon: IconUsers }]
    : links;

  const nav = (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-input px-3 py-2.5 text-sm transition-colors duration-200 ${
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
  );

  const brand = (
    <Link href="/admin" className="text-base font-medium text-text">
      KV <span className="text-primary">Plastic</span>
    </Link>
  );

  return (
    <>
      <aside className="hidden w-56 shrink-0 border-r-[0.5px] border-border bg-white md:block">
        <div className="flex h-16 items-center border-b-[0.5px] border-border px-6">
          {brand}
        </div>
        {nav}
      </aside>

      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3.5 z-40 flex h-9 w-9 items-center justify-center rounded-input text-text transition-colors duration-200 hover:bg-bg-alt md:hidden"
      >
        <IconMenu2 size={22} stroke={1.75} />
      </button>

      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-64 max-w-[80vw] flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b-[0.5px] border-border px-4">
            {brand}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-input text-text-secondary hover:bg-bg-alt hover:text-text"
            >
              <IconX size={20} stroke={1.75} />
            </button>
          </div>
          {nav}
          <Link
            href="/"
            target="_blank"
            className="mx-4 mt-auto mb-6 flex items-center gap-2 rounded-input px-3 py-2.5 text-sm text-text-secondary hover:bg-bg-alt hover:text-primary"
          >
            <IconExternalLink size={16} stroke={1.75} />
            View Site
          </Link>
        </aside>
      </div>
    </>
  );
}
