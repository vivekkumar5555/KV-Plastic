import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMapPin,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import { getSiteSettings } from "@/lib/queries";

const sitemap = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products", label: "All Products" },
      { href: "/request-quote", label: "Request a Quote" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/legal/terms-of-service", label: "Terms of Service" },
      { href: "/legal/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export async function Footer() {
  const settings = await getSiteSettings();

  const socials = [
    { href: settings.linkedinUrl, label: "LinkedIn", icon: IconBrandLinkedin },
    { href: settings.facebookUrl, label: "Facebook", icon: IconBrandFacebook },
    { href: settings.instagramUrl, label: "Instagram", icon: IconBrandInstagram },
  ].filter((s) => s.href);

  const contact = [
    { icon: IconMapPin, value: settings.address },
    { icon: IconPhone, value: settings.phone },
    { icon: IconMail, value: settings.email, href: `mailto:${settings.email}` },
  ].filter((c) => c.value);

  return (
    <footer className="bg-ink text-white">
      <div className="bg-primary">
        <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Have a part that needs manufacturing?
            </p>
            <p className="mt-2 text-white/80">
              Send us your drawings — we usually reply with a quote within two
              business days.
            </p>
          </div>
          <LinkButton
            href="/request-quote"
            variant="secondary"
            className="shrink-0 border-white! hover:text-primary-dark!"
          >
            Request a Quote
            <IconArrowRight
              size={18}
              stroke={1.75}
              className="transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </LinkButton>
        </Container>
      </div>

      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="KV Plastic home">
              <Logo light />
            </Link>
            {settings.footerNote && (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                {settings.footerNote}
              </p>
            )}
            <ul className="mt-6 space-y-3">
              {contact.map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3 text-sm text-white/75">
                  <Icon size={18} stroke={1.75} className="mt-0.5 shrink-0 text-primary-tint" />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-white">
                      {value}
                    </a>
                  ) : (
                    <span>{value}</span>
                  )}
                </li>
              ))}
            </ul>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href!}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-input bg-white/10 text-white transition-colors duration-200 hover:bg-primary"
                  >
                    <Icon size={18} stroke={1.75} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {sitemap.map((group) => (
            <div key={group.title}>
              <p className="font-display text-sm font-bold tracking-wide text-white">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} {settings.companyName}. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}
