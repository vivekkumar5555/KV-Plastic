import { prisma } from "@/lib/db";

export async function logActivity(
  actor: string,
  action: string,
  entity: string,
  entityId?: string,
) {
  await prisma.activityLog.create({
    data: { actor, action, entity, entityId },
  });
}
