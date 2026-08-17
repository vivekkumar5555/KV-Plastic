import { LegalLayout } from "@/components/LegalLayout";

export const dynamic = "force-dynamic";

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" updated="August 12, 2026">
      <p>
        This placeholder page will be replaced with KV Plastic&apos;s full
        terms of service, covering site usage, RFQ submission terms, quote
        validity, and intellectual property handling for uploaded drawings
        and CAD files.
      </p>
      <p>
        Sections to complete: Acceptance of Terms, Use of Site, RFQ &amp;
        Quote Terms, Intellectual Property, Limitation of Liability,
        Governing Law.
      </p>
    </LegalLayout>
  );
}
