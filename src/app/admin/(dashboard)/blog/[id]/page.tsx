import { notFound } from "next/navigation";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { getBlogPostById } from "@/lib/admin-queries";
import { updateBlogPost } from "../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  const action = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="text-text">Edit Blog Post</h1>
      <div className="mt-6 max-w-2xl">
        <BlogPostForm post={post} action={action} />
      </div>
    </div>
  );
}
