"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { LinkButton } from "@/components/ui/Button";
import { navLinks } from "@/components/layout/Header";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-input border border-border text-text"
      >
        {open ? (
          <IconX size={22} stroke={1.75} />
        ) : (
          <IconMenu2 size={22} stroke={1.75} />
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-white px-4 pt-2 pb-6 shadow-lg">
          <nav className="flex flex-col">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-border py-3 text-[15px] font-medium transition-colors duration-200 hover:text-primary ${
                    active ? "text-primary" : "text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <LinkButton
            href="/request-quote"
            onClick={() => setOpen(false)}
            className="mt-6 w-full"
          >
            Request a Quote
          </LinkButton>
        </div>
      )}
    </div>
  );
}
