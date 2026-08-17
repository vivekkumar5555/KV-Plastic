"use server";

import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";
import { logActivity } from "@/lib/activity";

function str(formData: FormData, key: string) {
  return ((formData.get(key) as string | null) ?? "").trim();
}

export async function submitRfq(formData: FormData) {
  const fileEntries = formData.getAll("files") as File[];
  const savedFiles: { name: string; url: string }[] = [];

  for (const file of fileEntries) {
    if (file && file.size > 0) {
      const url = await saveUploadedFile(file, "rfq");
      savedFiles.push({ name: file.name, url });
    }
  }

  const lead = await prisma.rfqSubmission.create({
    data: {
      name: str(formData, "name"),
      email: str(formData, "email"),
      company: str(formData, "company") || null,
      phone: str(formData, "phone") || null,
      product: str(formData, "product") || null,
      material: str(formData, "material") || null,
      quantity: str(formData, "quantity") || null,
      timeline: str(formData, "timeline") || null,
      notes: str(formData, "notes") || null,
      files: savedFiles.length > 0 ? JSON.stringify(savedFiles) : null,
    },
  });

  await logActivity("Website visitor", "submitted RFQ", "lead", lead.id);
}
