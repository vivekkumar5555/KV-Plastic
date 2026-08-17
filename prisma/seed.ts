import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  products,
  caseStudies,
  testimonials,
  blogPosts,
} from "../src/lib/placeholder-data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@kvplastic.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@kvplastic.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p },
    });
  }

  for (const cs of caseStudies) {
    await prisma.portfolio.upsert({
      where: { slug: cs.slug },
      update: {},
      create: {
        slug: cs.slug,
        title: cs.title,
        industry: cs.industry,
        challenge: cs.challenge,
        solution: cs.solution,
        outcome: cs.outcome,
        metric: cs.metric,
      },
    });
  }

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: t.name, company: t.company },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...t } });
    }
  }

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        published: true,
        createdAt: new Date(post.date),
      },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "KV Plastic",
      email: "hello@kvplastic.com",
      phone: "+91 98765 43210",
      address: "42 Industrial Estate Road, Sector 7, Your City, 000000",
      hours: "Mon–Sat, 9:00 AM – 6:00 PM",
      footerNote: "Custom plastic products manufacturing for industrial, consumer, and OEM clients.",
    },
  });

  const sampleLeadCount = await prisma.rfqSubmission.count();
  if (sampleLeadCount === 0) {
    await prisma.rfqSubmission.createMany({
      data: [
        {
          name: "Rahul Mehta",
          email: "rahul.mehta@example.com",
          company: "Orbit Automotive",
          phone: "+91 90000 11111",
          product: "Automotive Duct Connector",
          material: "PC",
          quantity: "3,000 units",
          timeline: "8 weeks",
          notes: "Need heat resistance validated above 110°C.",
          status: "NEW",
        },
        {
          name: "Sara Iyer",
          email: "sara.iyer@example.com",
          company: "Clearline Medical",
          product: "Medical Device Enclosure",
          material: "Polycarbonate",
          quantity: "1,200 units",
          timeline: "6 weeks",
          status: "IN_REVIEW",
          adminNotes: "Waiting on sterilization spec confirmation from client.",
        },
        {
          name: "Vikram Nair",
          email: "vikram.nair@example.com",
          company: "Fieldworks Agri",
          product: "Agricultural Tank Fitting",
          quantity: "5,000 units",
          status: "QUOTED",
        },
      ],
    });
  }

  console.log("Seed complete.");
  console.log("Admin login: admin@kvplastic.com / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
