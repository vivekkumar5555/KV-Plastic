import { prisma } from "@/lib/db";
import { auth } from "@/auth";

const INLINE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const PRIVATE_FOLDERS = new Set(["rfq"]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const file = await prisma.upload.findUnique({ where: { id } });
  if (!file) return new Response("Not found", { status: 404 });

  const isPrivate = PRIVATE_FOLDERS.has(file.folder);
  if (isPrivate) {
    const session = await auth();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });
  }

  // Non-image types are forced to download so uploaded HTML/SVG can't run on our origin.
  const inline = INLINE_TYPES.has(file.contentType);
  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": inline ? file.contentType : "application/octet-stream",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
      "Content-Length": String(file.size),
      "Cache-Control": isPrivate
        ? "private, no-store"
        : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
