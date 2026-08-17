import { LegalLayout } from "@/components/LegalLayout";

export const dynamic = "force-dynamic";

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="August 12, 2026">
      <p>
        This placeholder policy will be replaced with KV Plastic&apos;s full
        privacy policy, covering what data we collect through this site
        (contact forms, RFQ submissions, file uploads, analytics), how it is
        stored, and how visitors can request access or deletion.
      </p>
      <p>
        Sections to complete: Information We Collect, How We Use Information,
        Cookies & Tracking, Third-Party Services, Data Retention, Your
        Rights, Contact Us.
      </p>
    </LegalLayout>
  );
}
