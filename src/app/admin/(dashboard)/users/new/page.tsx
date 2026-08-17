import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createUser } from "../actions";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export default async function NewUserPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  return (
    <div>
      <h1 className="text-text">Invite User</h1>
      <div className="mt-6 max-w-md">
        <form action={createUser} className="space-y-6">
          <Card className="space-y-4">
            <div>
              <label className="text-sm text-text-secondary" htmlFor="name">
                Name *
              </label>
              <input id="name" name="name" required className={inputClass} />
            </div>
            <div>
              <label className="text-sm text-text-secondary" htmlFor="email">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary" htmlFor="password">
                Temporary Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                defaultValue="EDITOR"
                className={inputClass}
              >
                <option value="ADMIN">Admin</option>
                <option value="EDITOR">Editor</option>
              </select>
            </div>
          </Card>
          <Button type="submit">Create User</Button>
        </form>
      </div>
    </div>
  );
}
