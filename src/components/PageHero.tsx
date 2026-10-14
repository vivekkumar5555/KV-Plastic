import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-alt py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mask-[linear-gradient(to_left,black,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <Container className="relative">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className={`max-w-3xl text-text ${eyebrow ? "mt-4" : ""}`}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
