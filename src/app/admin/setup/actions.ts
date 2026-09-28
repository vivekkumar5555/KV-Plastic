"use server";

import { timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/db";
import { signIn } from "@/auth";

function setupKeyMatches(input: string) {
  const expected = process.env.ADMIN_SETUP_KEY;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function bootstrapAdmin(
  _prevState: string | undefined,
  formData: FormData,
) {
  const hasUsers = (await prisma.user.count()) > 0;
  if (hasUsers && !setupKeyMatches(String(formData.get("setupKey") ?? ""))) {
    return process.env.ADMIN_SETUP_KEY
      ? "Invalid setup key."
      : "An admin account already exists. Please sign in instead.";
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || password.length < 8) {
    return "Please fill in all fields (password must be at least 8 characters).";
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
  });
  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { name, passwordHash, role: "ADMIN" },
    });
  } else {
    await prisma.user.create({
      data: { name, email, passwordHash, role: "ADMIN" },
    });
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/admin" });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Account saved, but automatic sign-in failed. Please sign in manually.";
    }
    throw error;
  }
}
