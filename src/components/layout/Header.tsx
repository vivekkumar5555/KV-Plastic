"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { IconPhone, IconMail, IconClock } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  phone,
  email,
  hours,
}: {
  phone: string;
  email: string;
  hours: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40"
    >
      <div className="hidden bg-ink text-white/80 md:block">
        <Container className="flex h-10 items-center justify-between text-[13px]">
          <div className="flex items-center gap-6">
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <IconPhone size={15} stroke={1.75} className="text-primary-tint" />
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <IconMail size={15} stroke={1.75} className="text-primary-tint" />
                {email}
              </a>
            )}
          </div>
          {hours && (
            <span className="inline-flex items-center gap-2">
              <IconClock size={15} stroke={1.75} className="text-primary-tint" />
              {hours}
            </span>
          )}
        </Container>
      </div>

      <div
        className={`border-b bg-white/95 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
          scrolled ? "border-border shadow-sm" : "border-transparent"
        }`}
      >
        <Container
          className={`relative flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" aria-label="KV Plastic home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[15px] font-medium transition-colors duration-200 hover:text-primary ${
                    active ? "text-primary" : "text-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-primary transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <LinkButton href="/request-quote">Request a Quote</LinkButton>
          </div>

          <MobileMenu />
        </Container>
      </div>
    </motion.header>
  );
}
