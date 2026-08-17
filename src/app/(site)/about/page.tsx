import { IconCertificate, IconUsers, IconBulb } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { PageHero } from "@/components/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export const dynamic = "force-dynamic";

const values = [
  {
    icon: IconBulb,
    title: "Engineering-First",
    description:
      "Every quote starts with a design review — we flag issues before they become tooling costs.",
  },
  {
    icon: IconUsers,
    title: "Long-Term Partnerships",
    description:
      "Most of our clients have worked with us for 5+ years across multiple product lines.",
  },
  {
    icon: IconCertificate,
    title: "Quality Without Exception",
    description:
      "ISO 9001 certified processes and 100% dimensional inspection on tight-tolerance parts.",
  },
];

const certifications = [
  { name: "ISO 9001:2015", description: "Quality Management Systems" },
  { name: "ISO 14001:2015", description: "Environmental Management" },
  { name: "RoHS Compliant", description: "Restriction of Hazardous Substances" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Two Decades of Precision Plastic Manufacturing"
        description="KV Plastic was founded to give industrial and OEM clients a manufacturing partner they don't have to double-check. That's still the goal today."
      />

      <section className="py-16">
        <Container>
          <StaggerGrid className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <Card>
                  <IconChip icon={<v.icon size={22} stroke={1.75} />} />
                  <h3 className="mt-4 text-text">{v.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {v.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      <section className="bg-bg-alt py-16">
        <Container>
          <Reveal>
            <h2 className="text-text">Certifications</h2>
          </Reveal>
          <StaggerGrid className="mt-8 grid gap-6 md:grid-cols-3">
            {certifications.map((cert) => (
              <StaggerItem key={cert.name}>
                <Card className="text-center">
                  <div className="text-base font-medium text-primary">
                    {cert.name}
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">
                    {cert.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      <section className="py-16 text-center">
        <Container>
          <Reveal>
            <h2 className="text-text">Want to See It in Action?</h2>
            <p className="mx-auto mt-3 max-w-md text-text-secondary">
              Browse our case studies or send us your drawings for a quote.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <LinkButton href="/portfolio" variant="secondary">
                View Portfolio
              </LinkButton>
              <LinkButton href="/request-quote">Request a Quote</LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
