"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/db";
import { signIn } from "@/auth";

export async function bootstrapAdmin(
  _prevState: string | undefined,
  formData: FormData,
) {
  const existingUsers = await prisma.user.count();
  if (existingUsers > 0) {
    return "An admin account already exists. Please sign in instead.";
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!name || !email || !password || password.length < 8) {
    return "Please fill in all fields (password must be at least 8 characters).";
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, role: "ADMIN" },
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Account created, but sign-in failed. Please sign in manually.";
    }
    throw error;
  }
}
