import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
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
    { href: settings.linkedinUrl || "#", label: "LinkedIn", icon: IconBrandLinkedin },
    { href: settings.facebookUrl || "#", label: "Facebook", icon: IconBrandFacebook },
    { href: settings.instagramUrl || "#", label: "Instagram", icon: IconBrandInstagram },
  ];

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 md:py-20">
        <p className="font-display text-3xl italic leading-tight text-white md:text-5xl">
          Every part starts with a conversation.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic strength={0.3}>
            <LinkButton
              href="/request-quote"
              className="!bg-yellow !text-ink hover:!bg-white"
            >
              Request a Quote
              <IconArrowRight
                size={18}
                stroke={1.75}
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              />
            </LinkButton>
          </Magnetic>
        </div>
      </Container>

      <Container className="border-t border-white/10 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-lg font-medium text-white">
              KV <span className="text-yellow">Plastic</span>
            </Link>
            <p className="mt-3 text-sm text-white/60">{settings.footerNote}</p>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-yellow hover:text-ink"
                >
                  <Icon size={18} stroke={1.75} />
                </a>
              ))}
            </div>
          </div>

          {sitemap.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                {group.title}
              </p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition-colors duration-200 hover:text-yellow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} {settings.companyName}. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}
