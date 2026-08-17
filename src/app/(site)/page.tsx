import Image from "next/image";
import {
  IconArrowRight,
  IconBuildingFactory2,
  IconRuler2,
  IconDroplet,
  IconStack2,
  IconTools,
  IconFlask,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Magnetic } from "@/components/motion/Magnetic";
import { AnimatedStat } from "@/components/motion/AnimatedStat";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { HeroVisual } from "@/components/home/HeroVisual";
import { stats, capabilities, clientLogos } from "@/lib/placeholder-data";
import { getFeaturedProducts, getTestimonials } from "@/lib/queries";

export const dynamic = "force-dynamic";

const capabilityIcons = [
  IconBuildingFactory2,
  IconTools,
  IconDroplet,
  IconStack2,
  IconRuler2,
  IconFlask,
];

export default async function Home() {
  const [featuredProducts, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="border-b-[0.5px] border-border bg-bg-alt">
        <Container className="grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-wide text-accent">
                Precision Manufacturing
              </p>
            </Reveal>
            <HeroHeadline
              text="Custom Plastic Manufacturing, Built to Your Spec"
              className="mt-2 text-text"
            />
            <Reveal delay={0.5}>
              <p className="mt-4 max-w-md text-text-secondary">
                From prototype to production, KV Plastic delivers precision
                injection molding, tooling, and finishing for industrial,
                consumer, and OEM clients.
              </p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic>
                  <LinkButton href="/request-quote" variant="primary">
                    Request a Quote
                    <IconArrowRight size={18} stroke={1.75} />
                  </LinkButton>
                </Magnetic>
                <Magnetic>
                  <LinkButton href="/portfolio" variant="secondary">
                    View Our Work
                  </LinkButton>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <HeroVisual />
        </Container>
      </section>

      {/* Trust stats */}
      <section className="py-14">
        <Container>
          <StaggerGrid className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} lift={false}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal className="max-w-xl">
            <h2 className="text-text">Capabilities & Materials</h2>
            <p className="mt-3 text-text-secondary">
              End-to-end manufacturing services, matched to the right process
              and resin for your part.
            </p>
          </Reveal>

          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length];
              return (
                <StaggerItem key={cap.title} className="h-full">
                  <a href={cap.href} className="block h-full">
                    <Card className="h-full transition-colors duration-200 hover:border-primary">
                      <IconChip icon={<Icon size={22} stroke={1.75} />} />
                      <h3 className="mt-4 text-text">{cap.title}</h3>
                      <p className="mt-2 text-sm text-text-secondary">
                        {cap.description}
                      </p>
                    </Card>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-text">Featured Products</h2>
              <p className="mt-3 text-text-secondary">
                A sample of what we manufacture — browse the full catalog for
                specs and downloads.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <LinkButton href="/products" variant="secondary">
                View All Products
              </LinkButton>
            </Reveal>
          </div>

          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <StaggerItem key={product.slug} lift={false}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal>
            <h2 className="text-text">What Clients Say</h2>
          </Reveal>
          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.id}>
                <Card className="flex h-full flex-col">
                  <p className="text-sm text-text-secondary">“{t.quote}”</p>
                  <div className="mt-6 flex items-center gap-3">
                    {t.photoUrl && (
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={t.photoUrl}
                          alt={t.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-text">
                        {t.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {t.role}, {t.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Client logo strip */}
      <section className="overflow-hidden py-14">
        <Container>
          <Reveal>
            <p className="text-center text-xs uppercase tracking-wide text-text-secondary">
              Trusted by teams at
            </p>
          </Reveal>
        </Container>
        <div className="mt-6 mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-x-16 hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-sm font-medium whitespace-nowrap text-text-secondary"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse"
          aria-hidden
        />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Reveal>
            <h2 className="text-white">Have a Part That Needs Manufacturing?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-white/85">
              Send us your drawings and we&apos;ll respond with a quote —
              usually within two business days.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic>
              <LinkButton
                href="/request-quote"
                variant="secondary"
                className="!bg-white"
              >
                Request a Quote
                <IconArrowRight size={18} stroke={1.75} />
              </LinkButton>
            </Magnetic>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
