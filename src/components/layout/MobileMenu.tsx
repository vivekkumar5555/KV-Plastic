"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { LinkButton } from "@/components/ui/Button";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-input text-text"
      >
        {open ? (
          <IconX size={22} stroke={1.75} />
        ) : (
          <IconMenu2 size={22} stroke={1.75} />
        )}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 border-b-[0.5px] border-border bg-white px-4 py-6 shadow-sm">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LinkButton
            href="/request-quote"
            onClick={() => setOpen(false)}
            className="mt-6 w-full"
          >
            Request Quote
          </LinkButton>
        </div>
      )}
    </div>
  );
}
