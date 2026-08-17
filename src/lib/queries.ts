import { prisma } from "@/lib/db";

export function getProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findFirst({ where: { slug, published: true } });
}

export function getRelatedProducts(category: string, excludeSlug: string) {
  return prisma.product.findMany({
    where: { published: true, category, slug: { not: excludeSlug } },
    take: 3,
  });
}

export function getPortfolios() {
  return prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getPortfolioBySlug(slug: string) {
  return prisma.portfolio.findFirst({ where: { slug, published: true } });
}

export function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

function publishedBlogFilter() {
  const now = new Date();
  return {
    published: true,
    OR: [{ publishAt: null }, { publishAt: { lte: now } }],
  };
}

export function getBlogPosts() {
  return prisma.blogPost.findMany({
    where: publishedBlogFilter(),
    orderBy: { createdAt: "desc" },
  });
}

export function getBlogPostBySlug(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug, ...publishedBlogFilter() },
  });
}

export function getRelatedBlogPosts(excludeSlug: string) {
  return prisma.blogPost.findMany({
    where: { ...publishedBlogFilter(), slug: { not: excludeSlug } },
    take: 2,
  });
}

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return (
    settings ?? {
      id: 1,
      companyName: "KV Plastic",
      email: "hello@kvplastic.com",
      phone: "",
      address: "",
      hours: "",
      facebookUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      footerNote: "",
    }
  );
}
