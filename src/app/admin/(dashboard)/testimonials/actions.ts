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

function testimonialFields(formData: FormData) {
  return {
    quote: str(formData, "quote"),
    name: str(formData, "name"),
    role: str(formData, "role"),
    company: str(formData, "company"),
    published: formData.get("published") === "on",
  };
}

export async function createTestimonial(formData: FormData) {
  const photoFile = formData.get("photo") as File | null;
  const photoUrl =
    photoFile && photoFile.size > 0
      ? await saveUploadedFile(photoFile, "testimonials")
      : undefined;

  const item = await prisma.testimonial.create({
    data: { ...testimonialFields(formData), photoUrl },
  });

  await logActivity(await getActor(), "created", "testimonial", item.id);
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const photoFile = formData.get("photo") as File | null;
  const photoUrl =
    photoFile && photoFile.size > 0
      ? await saveUploadedFile(photoFile, "testimonials")
      : undefined;

  const previous = await prisma.testimonial.findUnique({
    where: { id },
    select: { photoUrl: true },
  });
  await prisma.testimonial.update({
    where: { id },
    data: { ...testimonialFields(formData), ...(photoUrl ? { photoUrl } : {}) },
  });
  if (photoUrl) await deleteUploadByUrl(previous?.photoUrl);

  await logActivity(await getActor(), "updated", "testimonial", id);
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const deleted = await prisma.testimonial.delete({ where: { id } });
  await deleteUploadByUrl(deleted.photoUrl);
  await logActivity(await getActor(), "deleted", "testimonial", id);
}
