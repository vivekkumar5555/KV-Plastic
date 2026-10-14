import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { SetupForm } from "./SetupForm";

export const dynamic = "force-dynamic";

export default async function AdminSetupPage() {
  const hasUsers = (await prisma.user.count()) > 0;
  if (hasUsers && !process.env.ADMIN_SETUP_KEY) redirect("/admin/login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="KV Plastic home">
            <Logo subtitle="Admin Panel" />
          </Link>
        </div>

        <Card className="p-8 shadow-sm">
          <h1 className="text-text">
            {hasUsers ? "Create or reset an admin" : "Create your admin account"}
          </h1>
          <p className="mt-1 mb-6 text-sm text-text-secondary">
            {hasUsers
              ? "Enter the setup key to add or reset an admin account."
              : "This will be the first admin account for your website."}
          </p>
          <SetupForm requireKey={hasUsers} />
        </Card>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/admin/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
