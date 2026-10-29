"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { saveUploadedFile, deleteUploadByUrl } from "@/lib/upload";
import { logActivity } from "@/lib/activity";
import { auth } from "@/auth";

async function getActor() {
  const session = await auth();
  return session?.user?.name || session?.user?.email || "Unknown";
}

function str(formData: FormData, key: string) {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Slug is unique in the DB and used in the product URL, so an empty one is generated.
async function resolveSlug(formData: FormData, excludeId?: string) {
  const entered = str(formData, "slug");
  if (entered) return entered;

  const base = slugify(str(formData, "name")) || "product";
  for (let n = 1; ; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;
    const clash = await prisma.product.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    });
    if (!clash) return candidate;
  }
}

function productFields(formData: FormData) {
  return {
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
    data: { ...productFields(formData), slug: await resolveSlug(formData), imageUrl },
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

  const previous = await prisma.product.findUnique({
    where: { id },
    select: { imageUrl: true },
  });
  await prisma.product.update({
    where: { id },
    data: {
      ...productFields(formData),
      slug: await resolveSlug(formData, id),
      ...(imageUrl ? { imageUrl } : {}),
    },
  });
  if (imageUrl) await deleteUploadByUrl(previous?.imageUrl);

  await logActivity(await getActor(), "updated", "product", id);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const deleted = await prisma.product.delete({ where: { id } });
  await deleteUploadByUrl(deleted.imageUrl);
  await logActivity(await getActor(), "deleted", "product", id);
}
