"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import type { Session } from "next-auth";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/activity";
import { auth } from "@/auth";
import type { Role } from "@prisma/client";

async function requireAdmin(): Promise<Session> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return session;
}

function actorName(session: Session) {
  return session.user?.name || session.user?.email || "Unknown";
}

export async function createUser(formData: FormData) {
  const session = await requireAdmin();

  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  await logActivity(actorName(session), "created", "user", user.id);
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (session.user?.id === id) {
    throw new Error("You cannot delete your own account.");
  }
  await prisma.user.delete({ where: { id } });
  await logActivity(actorName(session), "deleted", "user", id);
}

export async function updateUserRole(id: string, role: Role) {
  const session = await requireAdmin();
  await prisma.user.update({ where: { id }, data: { role } });
  await logActivity(actorName(session), `set role to ${role} on`, "user", id);
}
