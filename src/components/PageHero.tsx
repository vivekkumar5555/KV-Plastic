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
    <section className="border-b-[0.5px] border-border bg-bg-alt py-16">
      <Container>
        <Reveal>
          {eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {eyebrow}
            </p>
          )}
          <h1 className={`text-text ${eyebrow ? "mt-2" : ""}`}>{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-text-secondary">{description}</p>
          )}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
