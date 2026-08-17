import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/queries";

const markdownComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 text-text" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-6 text-text" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-4 leading-relaxed text-text-secondary" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-text-secondary" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-text-secondary" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-relaxed marker:text-primary" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-medium text-text" {...props} />
  ),
  a: ({ href, ...props }: React.ComponentProps<"a">) =>
    href?.startsWith("/") ? (
      <Link href={href} className="text-primary hover:underline" {...props} />
    ) : (
      <a href={href} className="text-primary hover:underline" {...props} />
    ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="mt-4 border-l-2 border-primary pl-4 text-text-secondary italic"
      {...props}
    />
  ),
};

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug);

  return (
    <section className="py-14">
      <Container className="max-w-2xl">
        <Reveal>
          <Badge tone="primary">{post.category}</Badge>
          <h1 className="mt-3 text-text">{post.title}</h1>
          <p className="mt-2 text-sm text-text-secondary">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8">
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Reveal>

        {related.length > 0 && (
          <Reveal delay={0.25}>
            <div className="mt-16 border-t-[0.5px] border-border pt-8">
              <h2 className="text-text">Related Posts</h2>
              <ul className="mt-4 space-y-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
