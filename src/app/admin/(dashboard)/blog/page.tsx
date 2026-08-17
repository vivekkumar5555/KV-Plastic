import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllBlogPosts } from "@/lib/admin-queries";
import { deleteBlogPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-text">Blog</h1>
        <LinkButton href="/admin/blog/new">New Post</LinkButton>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              const scheduled =
                post.published && post.publishAt && post.publishAt > new Date();
              return (
                <tr key={post.id} className="border-b-[0.5px] border-border last:border-0">
                  <td className="px-6 py-3 text-text">{post.title}</td>
                  <td className="px-6 py-3 text-text-secondary">{post.category}</td>
                  <td className="px-6 py-3">
                    <Badge tone={post.published ? "primary" : "accent"}>
                      {scheduled
                        ? `Scheduled: ${post.publishAt!.toLocaleDateString("en-US")}`
                        : post.published
                          ? "Published"
                          : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton onDelete={deleteBlogPost.bind(null, post.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">
                  No blog posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
