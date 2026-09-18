"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { MobileMenu } from "@/components/layout/MobileMenu";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const tickerItems = [
  "Custom Plastic & Rubber Manufacturing",
  "Request a Quote →",
  "Horizontal · Vertical · Hydraulic Press",
  "Serving Automotive, Medical, Packaging & More",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40"
    >
      <div className="overflow-hidden bg-ink">
        <div className="flex w-max animate-marquee gap-x-10 py-2">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 whitespace-nowrap text-xs font-medium tracking-wide text-white/90 uppercase"
            >
              {item}
              <span className="text-yellow">&#10022;</span>
            </span>
          ))}
        </div>
      </div>

      <div
        className={`border-b-[0.5px] bg-bg/90 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
          scrolled ? "border-border shadow-sm" : "border-transparent"
        }`}
      >
        <Container
          className={`relative flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <Link
            href="/"
            className="font-display text-xl font-medium text-text"
          >
            KV <span className="text-primary">Plastic</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium tracking-wide text-text-secondary uppercase transition-colors duration-200 hover:text-primary"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Magnetic strength={0.3}>
              <LinkButton href="/request-quote">Request Quote</LinkButton>
            </Magnetic>
          </div>

          <MobileMenu />
        </Container>
      </div>
    </motion.header>
  );
}
