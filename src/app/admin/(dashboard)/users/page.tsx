import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { UserRoleSelect } from "@/components/admin/UserRoleSelect";
import { getAllUsers } from "@/lib/admin-queries";
import { deleteUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const users = await getAllUsers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-text">Users</h1>
        <LinkButton href="/admin/users/new">Invite User</LinkButton>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const isSelf = u.id === session.user.id;
              return (
                <tr key={u.id} className="border-b-[0.5px] border-border last:border-0">
                  <td className="px-6 py-3 text-text">
                    {u.name}
                    {isSelf && (
                      <span className="ml-2 text-xs text-text-secondary">(you)</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-text-secondary">{u.email}</td>
                  <td className="px-6 py-3">
                    <UserRoleSelect id={u.id} role={u.role} disabled={isSelf} />
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end">
                      {!isSelf && (
                        <DeleteButton onDelete={deleteUser.bind(null, u.id)} />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
