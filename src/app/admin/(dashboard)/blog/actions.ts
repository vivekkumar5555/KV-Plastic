"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/activity";
import { auth } from "@/auth";

async function getActor() {
  const session = await auth();
  return session?.user?.name || session?.user?.email || "Unknown";
}

function str(formData: FormData, key: string) {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

function parsePublishAt(formData: FormData) {
  const raw = str(formData, "publishAt");
  if (!raw) return null;
  const offsetMinutes = Number(str(formData, "publishAtTzOffset")) || 0;
  const utc = Date.parse(`${raw}:00Z`);
  return Number.isNaN(utc) ? null : new Date(utc + offsetMinutes * 60_000);
}

function blogFields(formData: FormData) {
  return {
    slug: str(formData, "slug"),
    title: str(formData, "title"),
    excerpt: str(formData, "excerpt"),
    content: str(formData, "content"),
    category: str(formData, "category"),
    metaTitle: str(formData, "metaTitle") || null,
    metaDescription: str(formData, "metaDescription") || null,
    published: formData.get("published") === "on",
    publishAt: parsePublishAt(formData),
  };
}

export async function createBlogPost(formData: FormData) {
  const post = await prisma.blogPost.create({ data: blogFields(formData) });
  await logActivity(await getActor(), "created", "blog post", post.id);
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await prisma.blogPost.update({ where: { id }, data: blogFields(formData) });
  await logActivity(await getActor(), "updated", "blog post", id);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  await logActivity(await getActor(), "deleted", "blog post", id);
}
