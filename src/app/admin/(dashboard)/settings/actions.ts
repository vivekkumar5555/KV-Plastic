"use server";

import { revalidatePath } from "next/cache";
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

export async function updateSiteSettings(
  _prevState: string | undefined,
  formData: FormData,
): Promise<string> {
  const data = {
    companyName: str(formData, "companyName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    address: str(formData, "address"),
    hours: str(formData, "hours") || null,
    facebookUrl: str(formData, "facebookUrl") || null,
    instagramUrl: str(formData, "instagramUrl") || null,
    linkedinUrl: str(formData, "linkedinUrl") || null,
    footerNote: str(formData, "footerNote") || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  await logActivity(await getActor(), "updated", "site settings");
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");

  return "Settings saved.";
}
