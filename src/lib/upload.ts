import { prisma } from "@/lib/db";

const UPLOAD_URL_PREFIX = "/api/uploads/";

// Stored in Postgres because Render's filesystem is ephemeral and
// `next start` doesn't serve files added to public/ after the build.
export async function saveUploadedFile(
  file: File,
  folder: string,
): Promise<string> {
  const data = Buffer.from(await file.arrayBuffer());
  const upload = await prisma.upload.create({
    data: {
      folder,
      filename: file.name.slice(0, 255) || "file",
      contentType: file.type || "application/octet-stream",
      size: data.length,
      data,
    },
  });
  return `${UPLOAD_URL_PREFIX}${upload.id}`;
}

export async function deleteUploadByUrl(url: string | null | undefined) {
  if (!url?.startsWith(UPLOAD_URL_PREFIX)) return;
  const id = url.slice(UPLOAD_URL_PREFIX.length);
  await prisma.upload.deleteMany({ where: { id } });
}
