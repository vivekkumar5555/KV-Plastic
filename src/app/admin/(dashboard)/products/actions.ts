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

function productFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    name: str(formData, "name"),
    category: str(formData, "category"),
    material: str(formData, "material"),
    shortSpec: str(formData, "shortSpec"),
    description: str(formData, "description"),
    tolerance: str(formData, "tolerance"),
    weight: str(formData, "weight"),
    dimensions: str(formData, "dimensions"),
    moq: str(formData, "moq"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await saveUploadedFile(imageFile, "products")
      : undefined;

  const product = await prisma.product.create({
    data: { ...productFields(formData), imageUrl },
  });

  await logActivity(await getActor(), "created", "product", product.id);
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const imageFile = formData.get("image") as File | null;
  const imageUrl =
    imageFile && imageFile.size > 0
      ? await saveUploadedFile(imageFile, "products")
      : undefined;

  await prisma.product.update({
    where: { id },
    data: { ...productFields(formData), ...(imageUrl ? { imageUrl } : {}) },
  });

  await logActivity(await getActor(), "updated", "product", id);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  await logActivity(await getActor(), "deleted", "product", id);
}
