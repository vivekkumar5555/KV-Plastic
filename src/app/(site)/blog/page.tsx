import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageHero } from "@/components/PageHero";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getBlogPosts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Blog"
        description="Notes on materials, tolerances, and getting the most out of the RFQ process."
      />

      <section className="py-14">
        <Container>
          <StaggerGrid className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="flex h-full flex-col transition-colors duration-200 hover:border-primary">
                    <Badge tone="primary">{post.category}</Badge>
                    <h3 className="mt-4 text-text">{post.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 text-xs text-text-secondary">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </Container>
      </section>
    </>
  );
}
