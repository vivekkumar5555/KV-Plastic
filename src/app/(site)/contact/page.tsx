import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const info = [
    { icon: IconMapPin, label: "Address", value: settings.address },
    {
      icon: IconPhone,
      label: "Phone",
      value: settings.phone,
      href: `tel:${settings.phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: IconMail,
      label: "Email",
      value: settings.email,
      href: `mailto:${settings.email}`,
    },
    { icon: IconClock, label: "Hours", value: settings.hours || "" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="General inquiries only — for a manufacturing quote, use the Request a Quote page instead."
      />

      <section className="py-14">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <StaggerGrid className="space-y-4">
              {info.map((item) => (
                <StaggerItem key={item.label} lift={false}>
                  <Card className="flex items-center gap-4 p-4">
                    <IconChip icon={<item.icon size={20} stroke={1.75} />} />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-text-secondary">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-text hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm text-text">{item.value}</div>
                      )}
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <Reveal delay={0.2}>
              <a
                href={`https://wa.me/${settings.phone.replace(/[^\d]/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 rounded-input border-[0.5px] border-border px-4 py-2.5 text-sm font-medium text-primary transition-colors duration-200 hover:border-primary"
              >
                <IconBrandWhatsapp size={18} stroke={1.75} />
                Chat on WhatsApp
              </a>

              <div className="mt-6 flex h-56 items-center justify-center rounded-card border-[0.5px] border-border bg-bg-alt text-sm text-text-secondary">
                Map embed placeholder
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card>
              <h2 className="text-text">Send a Message</h2>
              <form className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-secondary" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
