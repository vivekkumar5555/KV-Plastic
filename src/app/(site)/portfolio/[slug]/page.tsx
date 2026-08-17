import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getPortfolioBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getPortfolioBySlug(slug);
  if (!caseStudy) notFound();

  const sections: [string, string][] = [
    ["Challenge", caseStudy.challenge],
    ["Solution", caseStudy.solution],
    ["Outcome", caseStudy.outcome],
  ];

  return (
    <section className="py-14">
      <Container className="max-w-3xl">
        <Reveal>
          <Badge tone="primary">{caseStudy.industry}</Badge>
          <h1 className="mt-3 text-text">{caseStudy.title}</h1>
        </Reveal>

        {caseStudy.imageUrl && (
          <Reveal delay={0.1}>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-card border-[0.5px] border-border md:h-96">
              <Image
                src={caseStudy.imageUrl}
                alt={caseStudy.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <Card className="mt-8 flex items-center justify-between">
            <span className="text-sm text-text-secondary">Result</span>
            <span className="text-lg font-medium text-primary">
              {caseStudy.metric}
            </span>
          </Card>
        </Reveal>

        <StaggerGrid className="mt-10 space-y-8">
          {sections.map(([label, text]) => (
            <StaggerItem key={label} lift={false}>
              <h2 className="text-text">{label}</h2>
              <p className="mt-2 text-text-secondary">{text}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <LinkButton href="/request-quote">Start a Similar Project</LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
