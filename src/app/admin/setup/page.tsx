import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { SetupForm } from "./SetupForm";

export const dynamic = "force-dynamic";

export default async function AdminSetupPage() {
  const hasUsers = (await prisma.user.count()) > 0;
  if (hasUsers && !process.env.ADMIN_SETUP_KEY) redirect("/admin/login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link href="/" className="text-lg font-medium text-text">
            KV <span className="text-primary">Plastic</span>
          </Link>
          <p className="mt-1 text-sm text-text-secondary">
            {hasUsers
              ? "Create or reset an admin account"
              : "Create the first admin account"}
          </p>
        </div>

        <Card>
          <SetupForm requireKey={hasUsers} />
        </Card>

        <p className="mt-4 text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link href="/admin/login" className="text-primary underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
