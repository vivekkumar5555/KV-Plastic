import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  const hasUsers = (await prisma.user.count()) > 0;
  const canSignUp = !hasUsers || !!process.env.ADMIN_SETUP_KEY;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <Link href="/" className="text-lg font-medium text-text">
            KV <span className="text-primary">Plastic</span>
          </Link>
          <p className="mt-1 text-sm text-text-secondary">Admin Panel</p>
        </div>

        <Card>
          <LoginForm />
        </Card>

        {canSignUp && (
          <p className="mt-4 text-center text-sm text-text-secondary">
            {hasUsers ? "Need an admin account?" : "No admin account yet?"}{" "}
            <Link href="/admin/setup" className="text-primary underline">
              Sign up as admin
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
