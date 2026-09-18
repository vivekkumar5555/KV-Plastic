import Image from "next/image";
import {
  IconArrowRight,
  IconBuildingFactory2,
  IconTools,
  IconGauge,
} from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconChip } from "@/components/ui/IconChip";
import { DoodleSparkle, DoodleRing } from "@/components/ui/Doodle";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Magnetic } from "@/components/motion/Magnetic";
import { AnimatedStat } from "@/components/motion/AnimatedStat";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { HeroVisual } from "@/components/home/HeroVisual";
import {
  stats,
  capabilities,
  industries,
  clientLogos,
} from "@/lib/placeholder-data";
import { getFeaturedProducts, getTestimonials } from "@/lib/queries";

export const dynamic = "force-dynamic";

const capabilityIcons = [IconBuildingFactory2, IconTools, IconGauge];
const iconChipTones = ["primary", "accent", "yellow"] as const;
const statColors = ["text-primary", "text-accent", "text-ink", "text-primary"];
const pillTones = [
  "bg-primary-tint text-primary",
  "bg-accent-tint text-accent",
  "bg-yellow-tint text-ink",
  "bg-pink-tint text-accent",
];
const testimonialTints = ["bg-white", "bg-yellow-tint", "bg-pink-tint"];

export default async function Home() {
  const [featuredProducts, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-[0.5px] border-border bg-bg-alt">
        <DoodleSparkle className="pointer-events-none absolute top-10 right-[8%] hidden h-8 w-8 text-accent md:block" />
        <DoodleRing className="pointer-events-none absolute bottom-16 left-[4%] hidden h-10 w-10 text-primary/60 md:block" />
        <Container className="relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Reveal>
              <p className="inline-flex items-center rounded-full border-[0.5px] border-border bg-white px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase">
                [ Precision Manufacturing ]
              </p>
            </Reveal>
            <HeroHeadline
              text="Custom Plastic Manufacturing, Built to Your Spec"
              className="mt-3 text-text"
            />
            <Reveal delay={0.5}>
              <p className="mt-4 max-w-md text-text-secondary">
                KV Plastic is a product- and service-based manufacturing
                company specializing in plastic and rubber products. We
                manufacture quality products while also providing customized
                manufacturing solutions based on our customers&apos;
                specific requirements.
              </p>
            </Reveal>
            <Reveal delay={0.65}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnetic>
                  <LinkButton href="/request-quote" variant="primary">
                    Request a Quote
                    <IconArrowRight
                  size={18}
                  stroke={1.75}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
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
          <div className="relative">
            <HeroVisual />
            <Reveal delay={0.5} spring>
              <div className="absolute -bottom-6 -left-6 hidden -rotate-6 rounded-md bg-yellow-tint px-4 py-3 shadow-sm ring-1 ring-black/5 md:block">
                <p className="font-hand text-lg leading-none text-ink">
                  Real engineers on every quote →
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Trust stats */}
      <section className="py-14">
        <Container>
          <div className="mb-8 flex gap-2" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
            <span className="h-2.5 w-2.5 rounded-full bg-pink" />
          </div>
          <StaggerGrid className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <StaggerItem key={stat.label} lift={false}>
                <AnimatedStat
                  value={stat.value}
                  label={stat.label}
                  numberClassName={statColors[i % statColors.length]}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Machine Details */}
      <section className="bg-bg-alt py-20">
        <Container>
          <Reveal className="max-w-xl">
            <h2 className="text-text">Machine Details</h2>
            <p className="mt-3 text-text-secondary">
              Our available machinery for manufacturing plastic and rubber
              products and components.
            </p>
          </Reveal>

          <StaggerGrid className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length];
              return (
                <StaggerItem key={cap.title} className="h-full">
                  <a href={cap.href} className="block h-full">
                    <Card className="h-full transition-colors duration-200 hover:border-primary">
                      <div className="flex items-start justify-between">
                        <IconChip
                          icon={<Icon size={22} stroke={1.75} />}
                          tone={iconChipTones[i % iconChipTones.length]}
                        />
                        <span className="font-hand text-lg text-text-secondary">
                          [ 0{i + 1} ]
                        </span>
                      </div>
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

      {/* Industries served */}
      <section className="py-20">
        <Container>
          <Reveal className="max-w-xl">
            <h2 className="text-text">Industries We Serve</h2>
            <p className="mt-3 text-text-secondary">
              We manufacture custom plastic and rubber products and
              components for diverse industries and applications, according
              to customer requirements, drawings, samples, designs, and
              specifications.
            </p>
          </Reveal>

          <StaggerGrid className="mt-8 flex flex-wrap gap-3">
            {industries.map((industry, i) => (
              <StaggerItem key={industry} lift={false}>
                <span
                  className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${pillTones[i % pillTones.length]}`}
                >
                  {industry}
                </span>
              </StaggerItem>
            ))}
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
            {testimonials.map((t, i) => (
              <StaggerItem key={t.id}>
                <Card
                  className={`relative flex h-full flex-col overflow-hidden ${testimonialTints[i % testimonialTints.length]}`}
                >
                  <span
                    className="font-display pointer-events-none absolute -top-4 right-3 text-7xl text-text/10 italic"
                    aria-hidden
                  >
                    &rdquo;
                  </span>
                  <p className="relative text-sm text-text-secondary">
                    &ldquo;{t.quote}&rdquo;
                  </p>
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
      <section className="overflow-hidden border-y-[0.5px] border-border bg-bg-alt py-10">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-semibold tracking-wide text-text-secondary uppercase">
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
        <DoodleSparkle className="pointer-events-none absolute top-8 left-[10%] hidden h-7 w-7 text-yellow md:block" />
        <DoodleRing className="pointer-events-none absolute right-[8%] bottom-8 hidden h-9 w-9 text-white/40 md:block" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse"
          aria-hidden
        />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <Reveal>
            <p className="inline-flex items-center rounded-full border-[0.5px] border-white/30 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
              [ Let&apos;s Build It ]
            </p>
          </Reveal>
          <Reveal delay={0.05}>
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
                <IconArrowRight
                  size={18}
                  stroke={1.75}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </LinkButton>
            </Magnetic>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
