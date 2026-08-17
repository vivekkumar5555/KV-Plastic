import { prisma } from "@/lib/db";

export function getAllProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export function getAllPortfolios() {
  return prisma.portfolio.findMany({ orderBy: { createdAt: "desc" } });
}

export function getPortfolioById(id: string) {
  return prisma.portfolio.findUnique({ where: { id } });
}

export function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export function getTestimonialById(id: string) {
  return prisma.testimonial.findUnique({ where: { id } });
}

export function getAllBlogPosts() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}

export function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export function getAllLeads() {
  return prisma.rfqSubmission.findMany({ orderBy: { createdAt: "desc" } });
}

export function getLeadById(id: string) {
  return prisma.rfqSubmission.findUnique({ where: { id } });
}

export function getAllUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: "desc" } });
}

export function getRecentActivity(limit = 10) {
  return prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getDashboardStats() {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const [newLeads, totalProducts, totalPortfolio, totalBlogPosts, totalLeads] =
    await Promise.all([
      prisma.rfqSubmission.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.product.count(),
      prisma.portfolio.count(),
      prisma.blogPost.count(),
      prisma.rfqSubmission.count(),
    ]);

  return { newLeads, totalProducts, totalPortfolio, totalBlogPosts, totalLeads };
}
