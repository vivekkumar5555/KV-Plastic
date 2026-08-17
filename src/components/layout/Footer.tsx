import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
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
    <footer className="border-t-[0.5px] border-border bg-bg-alt">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-lg font-medium text-text">
              KV <span className="text-primary">Plastic</span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary">
              {settings.footerNote}
            </p>
            <div className="mt-4 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-tint text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
                >
                  <Icon size={18} stroke={1.75} />
                </a>
              ))}
            </div>
          </div>

          {sitemap.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-text">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t-[0.5px] border-border pt-6 text-sm text-text-secondary">
          © {new Date().getFullYear()} {settings.companyName}. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}
