import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="py-14">
      <Container className="max-w-2xl">
        <h1 className="text-text">{title}</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Last updated: {updated}
        </p>
        <div className="mt-8 space-y-6 text-text-secondary">{children}</div>
      </Container>
    </section>
  );
}
