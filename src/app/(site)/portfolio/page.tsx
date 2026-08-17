import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getPortfolios } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const caseStudies = await getPortfolios();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Portfolio"
        description="Real projects, real outcomes — a look at how we've solved manufacturing problems for clients across industries."
      />

      <section className="py-14">
        <Container>
          <StaggerGrid className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs) => (
              <StaggerItem key={cs.slug} className="h-full">
                <Link href={`/portfolio/${cs.slug}`} className="block h-full">
                  <Card className="group flex h-full flex-col overflow-hidden p-0 transition-colors duration-200 hover:border-primary">
                    {cs.imageUrl && (
                      <div className="relative h-44 w-full overflow-hidden">
                        <Image
                          src={cs.imageUrl}
                          alt={cs.title}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <Badge tone="primary">{cs.industry}</Badge>
                      <h3 className="mt-4 text-text">{cs.title}</h3>
                      <p className="mt-2 text-sm text-text-secondary">
                        {cs.challenge}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-primary">
                        {cs.metric}
                        <IconArrowRight size={16} stroke={1.75} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </>
  );
}
