import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-bg-alt">
      <Sidebar isAdmin={session.user.role === "ADMIN"} />
      <div className="flex flex-1 flex-col">
        <Topbar
          name={session.user.name ?? session.user.email ?? "Admin"}
          role={session.user.role}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
