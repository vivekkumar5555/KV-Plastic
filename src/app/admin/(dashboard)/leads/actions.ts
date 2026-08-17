"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/activity";
import { auth } from "@/auth";
import type { LeadStatus } from "@prisma/client";

async function getActor() {
  const session = await auth();
  return session?.user?.name || session?.user?.email || "Unknown";
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await prisma.rfqSubmission.update({ where: { id }, data: { status } });
  await logActivity(await getActor(), `set status to ${status} on`, "lead", id);
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadDetails(id: string, formData: FormData) {
  const adminNotes = (formData.get("adminNotes") as string | null) ?? "";
  const assignedTo = (formData.get("assignedTo") as string | null) ?? "";

  await prisma.rfqSubmission.update({
    where: { id },
    data: { adminNotes, assignedTo: assignedTo || null },
  });

  await logActivity(await getActor(), "updated notes on", "lead", id);
  revalidatePath(`/admin/leads/${id}`);
}
