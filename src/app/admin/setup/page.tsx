import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { SetupForm } from "./SetupForm";

export default async function AdminSetupPage() {
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) redirect("/admin/login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link href="/" className="text-lg font-medium text-text">
            KV <span className="text-primary">Plastic</span>
          </Link>
          <p className="mt-1 text-sm text-text-secondary">
            Create the first admin account
          </p>
        </div>

        <Card>
          <SetupForm />
        </Card>
      </div>
    </div>
  );
}
