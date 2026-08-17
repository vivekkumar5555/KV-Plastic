import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { RequestQuoteForm } from "./RequestQuoteForm";

export const dynamic = "force-dynamic";

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get Started"
        title="Request a Quote"
        description="Tell us about your part and we'll get back to you with pricing and lead time — usually within two business days."
      />
      <section className="py-14">
        <Container>
          <Suspense fallback={null}>
            <RequestQuoteForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
