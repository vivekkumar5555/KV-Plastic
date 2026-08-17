"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";
import { logActivity } from "@/lib/activity";
import { auth } from "@/auth";

async function getActor() {
  const session = await auth();
  return session?.user?.name || session?.user?.email || "Unknown";
}

function str(formData: FormData, key: string) {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

function portfolioFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    industry: str(formData, "industry"),
    challenge: str(formData, "challenge"),
    solution: str(formData, "solution"),
    outcome: str(formData, "outcome"),
    metric: str(formData, "metric"),
    published: formData.get("published") === "on",
  };
}

export async function createPortfolio(formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await saveUploadedFile(imageFile, "portfolio")
      : undefined;

  const item = await prisma.portfolio.create({
    data: { ...portfolioFields(formData), imageUrl },
  });

  await logActivity(await getActor(), "created", "portfolio item", item.id);
  redirect("/admin/portfolio");
}

export async function updatePortfolio(id: string, formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await saveUploadedFile(imageFile, "portfolio")
      : undefined;

  await prisma.portfolio.update({
    where: { id },
    data: { ...portfolioFields(formData), ...(imageUrl ? { imageUrl } : {}) },
  });

  await logActivity(await getActor(), "updated", "portfolio item", id);
  redirect("/admin/portfolio");
}

export async function deletePortfolio(id: string) {
  await prisma.portfolio.delete({ where: { id } });
  await logActivity(await getActor(), "deleted", "portfolio item", id);
}
