import Image from "next/image";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBuildingFactory2,
  IconTools,
  IconGauge,
  IconCircleCheck,
  IconFileUpload,
  IconRuler2,
  IconSettings,
  IconTruckDelivery,
  IconQuote,
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
import {
  stats,
  capabilities,
  industries,
  clientLogos,
} from "@/lib/placeholder-data";
import { getFeaturedProducts, getTestimonials } from "@/lib/queries";

export const dynamic = "force-dynamic";

const capabilityIcons = [IconBuildingFactory2, IconTools, IconGauge];

const process = [
  {
    icon: IconFileUpload,
    title: "Share Your Requirement",
    description: "Send drawings, samples or specifications through our quote form.",
  },
  {
    icon: IconRuler2,
    title: "Engineering Review",
    description: "Every quote starts with a design review to flag issues before tooling.",
  },
  {
    icon: IconSettings,
    title: "Precision Production",
    description: "Parts are moulded on our injection and hydraulic press machines.",
  },
  {
    icon: IconTruckDelivery,
    title: "Inspection & Delivery",
    description: "Quality-checked parts are packed and shipped to your schedule.",
  },
];

const heroPoints = [
  "Custom parts from your drawings or samples",
  "Plastic injection & rubber moulding",
  "Quotes usually within two business days",
];

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-text">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-text-secondary">{description}</p>
      )}
    </Reveal>
  );
}

export default async function Home() {
  const [featuredProducts, testimonials] = await Promise.all([
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-alt">
        <div
          className="pointer-events-none absolute inset-0 opacity-70 mask-[radial-gradient(ellipse_at_top_right,black,transparent_65%)]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <Container className="relative grid gap-16 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Reveal>
              <p className="eyebrow">Precision Manufacturing</p>
            </Reveal>
            <HeroHeadline
              text="Custom Plastic & Rubber Parts, Built to Your Spec"
              className="mt-5 text-text"
            />
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-xl text-lg text-text-secondary">
                KV Plastic is a product- and service-based manufacturing
                company specializing in plastic and rubber products. We
                manufacture quality products while also providing customized
                manufacturing solutions based on our customers&apos;
                specific requirements.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <ul className="mt-6 space-y-2.5">
                {heroPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-[15px] font-medium text-text">
                    <IconCircleCheck size={20} stroke={1.75} className="shrink-0 text-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnetic>
                  <LinkButton href="/request-quote" className="px-6 py-3">
                    Request a Quote
                    <IconArrowRight
                      size={18}
                      stroke={1.75}
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    />
                  </LinkButton>
                </Magnetic>
                <Magnetic>
                  <LinkButton href="/products" variant="secondary" className="px-6 py-3">
                    Explore Products
                  </LinkButton>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <div className="px-4 lg:px-0">
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-white">
        <Container>
          <StaggerGrid className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} lift={false} className="px-4 py-10">
                <AnimatedStat value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Machine Details */}
      <section className="py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Our Capabilities"
            title="Machine Details"
            description="Our available machinery for manufacturing plastic and rubber products and components."
          />

          <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length];
              return (
                <StaggerItem key={cap.title} className="h-full">
                  <a href={cap.href} className="group block h-full">
                    <Card className="relative h-full overflow-hidden p-8 transition-[border-color,box-shadow] duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/5">
                      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                      <div className="flex items-start justify-between">
                        <IconChip
                          icon={<Icon size={24} stroke={1.75} />}
                          className="transition-colors duration-300 group-hover:bg-primary group-hover:text-white"
                        />
                        <span className="font-display text-sm font-bold text-text-secondary/60">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 text-text">{cap.title}</h3>
                      <p className="mt-3 text-[15px] text-text-secondary">
                        {cap.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Learn more
                        <IconArrowUpRight
                          size={16}
                          stroke={2}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </Card>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-bg-alt py-20 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="From Drawing to Delivery"
            description="A straightforward process designed around your specifications and timelines."
            center
          />
          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <StaggerItem key={step.title} lift={false} className="relative text-center">
                {i < process.length - 1 && (
                  <span
                    className="absolute top-8 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] border-t-2 border-dashed border-primary/25 lg:block"
                    aria-hidden
                  />
                )}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-sm ring-1 ring-border">
                  <step.icon size={28} stroke={1.5} />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-text">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] text-text-secondary">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Industries served */}
      <section className="py-20 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="Industries"
            title="Industries We Serve"
            description="We manufacture custom plastic and rubber products and components for diverse industries and applications, according to customer requirements, drawings, samples, designs, and specifications."
          />

          <StaggerGrid className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <StaggerItem key={industry} lift={false}>
                <div className="flex items-center gap-3 rounded-input border border-border bg-white px-4 py-3.5 text-[15px] font-medium text-text transition-colors duration-200 hover:border-primary">
                  <IconCircleCheck size={20} stroke={1.75} className="shrink-0 text-primary" />
                  {industry}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
        <section className="bg-bg-alt py-20 md:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Products"
                title="Featured Products"
                description="A sample of what we manufacture — browse the full catalog for specs and downloads."
              />
              <Reveal delay={0.15}>
                <LinkButton href="/products" variant="secondary">
                  View All Products
                  <IconArrowRight
                    size={18}
                    stroke={1.75}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                  />
                </LinkButton>
              </Reveal>
            </div>

            <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <StaggerItem key={product.slug} lift={false}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 md:py-24">
          <Container>
            <SectionHeading eyebrow="Testimonials" title="What Clients Say" center />
            <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.id}>
                  <Card className="flex h-full flex-col p-8">
                    <IconQuote size={32} stroke={1.5} className="text-primary/30" aria-hidden />
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text">
                      {t.quote}
                    </p>
                    <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                      {t.photoUrl ? (
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={t.photoUrl}
                            alt={t.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-tint font-display text-sm font-bold text-primary">
                          {t.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <div className="font-display text-sm font-bold text-text">
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
      )}

      {/* Client logo strip */}
      <section className="overflow-hidden border-t border-border bg-white py-12">
        <Container>
          <Reveal>
            <p className="text-center text-xs font-bold tracking-[0.12em] text-text-secondary uppercase">
              Trusted by teams at
            </p>
          </Reveal>
        </Container>
        <div className="mt-6 mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-x-20 hover:[animation-play-state:paused]">
            {[...clientLogos, ...clientLogos].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-display text-lg font-bold whitespace-nowrap text-text-secondary/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
