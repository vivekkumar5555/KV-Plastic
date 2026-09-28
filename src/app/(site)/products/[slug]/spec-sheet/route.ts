import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage } from "pdf-lib";
import { prisma } from "@/lib/db";
import { getProductBySlug, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const BRAND = rgb(0.055, 0.431, 0.337);
const TEXT = rgb(0.11, 0.11, 0.11);
const MUTED = rgb(0.42, 0.42, 0.42);
const LINE = rgb(0.88, 0.88, 0.86);
const TINT = rgb(0.95, 0.97, 0.96);

const REPLACEMENTS: Record<string, string> = {
  "→": "->",
  "←": "<-",
  "≤": "<=",
  "≥": ">=",
  "≈": "~",
  "×": "x",
  " ": " ",
};

// Standard PDF fonts only cover WinAnsi; anything else would throw while drawing.
function sanitize(text: string, font: PDFFont) {
  const supported = new Set(font.getCharacterSet());
  return Array.from(text.replace(/\r/g, ""))
    .map((ch) => REPLACEMENTS[ch] ?? ch)
    .join("")
    .split("")
    .filter((ch) => ch === "\n" || supported.has(ch.codePointAt(0)!))
    .join("")
    .replace(/[ \t]{2,}/g, " ");
}

// Behind Render's proxy request.url resolves to the internal host, so prefer forwarded headers.
function publicOrigin(request: Request) {
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return new URL(request.url).origin;
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0] ??
    new URL(request.url).protocol.replace(":", "");
  return `${proto}://${host}`;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }
  return lines;
}

async function loadProductImage(doc: PDFDocument, imageUrl: string | null) {
  const prefix = "/api/uploads/";
  if (!imageUrl?.startsWith(prefix)) return null;
  const upload = await prisma.upload.findUnique({
    where: { id: imageUrl.slice(prefix.length) },
  });
  if (!upload) return null;
  try {
    if (upload.contentType === "image/jpeg") return await doc.embedJpg(upload.data);
    if (upload.contentType === "image/png") return await doc.embedPng(upload.data);
  } catch {
    return null;
  }
  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return new Response("Product not found", { status: 404 });
  const settings = await getSiteSettings();

  const doc = await PDFDocument.create();
  doc.setTitle(`${product.name} - Spec Sheet`);
  doc.setAuthor(settings.companyName);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const image: PDFImage | null = await loadProductImage(doc, product.imageUrl);

  let page = doc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H;

  const ensureSpace = (needed: number) => {
    if (y - needed < MARGIN + 40) {
      page = doc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  };

  const drawLines = (text: string, font: PDFFont, size: number, color = TEXT, gap = 4) => {
    for (const line of wrap(sanitize(text, font), font, size, CONTENT_W)) {
      ensureSpace(size + gap);
      y -= size;
      page.drawText(line, { x: MARGIN, y, size, font, color });
      y -= gap;
    }
  };

  const headerH = 64;
  page.drawRectangle({ x: 0, y: PAGE_H - headerH, width: PAGE_W, height: headerH, color: BRAND });
  page.drawText(sanitize(settings.companyName, bold), {
    x: MARGIN,
    y: PAGE_H - 40,
    size: 18,
    font: bold,
    color: rgb(1, 1, 1),
  });
  const label = "PRODUCT SPECIFICATION SHEET";
  page.drawText(label, {
    x: PAGE_W - MARGIN - regular.widthOfTextAtSize(label, 9),
    y: PAGE_H - 38,
    size: 9,
    font: regular,
    color: rgb(1, 1, 1),
  });
  y = PAGE_H - headerH - 32;

  drawLines(product.category.toUpperCase(), bold, 9, BRAND, 6);
  drawLines(product.name, bold, 22, TEXT, 8);
  y -= 8;

  if (image) {
    const maxH = 220;
    const scale = Math.min(CONTENT_W / image.width, maxH / image.height, 1);
    const w = image.width * scale;
    const h = image.height * scale;
    ensureSpace(h + 16);
    page.drawRectangle({ x: MARGIN, y: y - h - 16, width: CONTENT_W, height: h + 16, color: TINT });
    page.drawImage(image, { x: MARGIN + (CONTENT_W - w) / 2, y: y - h - 8, width: w, height: h });
    y -= h + 32;
  }

  if (product.description) {
    drawLines("Overview", bold, 12, TEXT, 8);
    drawLines(product.description, regular, 10.5, TEXT, 5);
    y -= 14;
  }

  const specs: [string, string][] = [
    ["Material", product.material],
    ["Specification", product.shortSpec],
    ["Tolerance", product.tolerance],
    ["Weight", product.weight],
    ["Dimensions", product.dimensions],
    ["Minimum Order Quantity", product.moq],
  ];

  drawLines("Technical Specifications", bold, 12, TEXT, 10);
  const labelW = 170;
  for (const [key, rawValue] of specs) {
    const valueLines = wrap(sanitize(rawValue || "-", regular), regular, 10.5, CONTENT_W - labelW - 12);
    const rowH = Math.max(1, valueLines.length) * 15 + 12;
    ensureSpace(rowH);
    page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.5, color: LINE });
    page.drawText(key, { x: MARGIN, y: y - 18, size: 10, font: bold, color: MUTED });
    valueLines.forEach((line, i) => {
      page.drawText(line, { x: MARGIN + labelW, y: y - 18 - i * 15, size: 10.5, font: regular, color: TEXT });
    });
    y -= rowH;
  }
  page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.5, color: LINE });

  const origin = publicOrigin(request);
  const contact = [
    settings.email && `Email: ${settings.email}`,
    settings.phone && `Phone: ${settings.phone}`,
    settings.address && `Address: ${settings.address}`,
    `Request a quote: ${origin}/request-quote?product=${product.slug}`,
  ].filter(Boolean) as string[];

  y -= 24;
  ensureSpace(contact.length * 15 + 30);
  drawLines("Contact", bold, 12, TEXT, 8);
  for (const line of contact) drawLines(line, regular, 9.5, MUTED, 5);

  const generated = `Generated ${new Date().toISOString().slice(0, 10)} - specifications subject to change; confirm details with our team before ordering.`;
  for (const p of doc.getPages()) {
    p.drawText(sanitize(generated, regular), { x: MARGIN, y: 28, size: 7.5, font: regular, color: MUTED });
  }

  const bytes = await doc.save();
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${product.slug}-spec-sheet.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
