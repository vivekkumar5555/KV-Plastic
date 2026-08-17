import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-text">New Blog Post</h1>
      <div className="mt-6 max-w-2xl">
        <BlogPostForm action={createBlogPost} />
      </div>
    </div>
  );
}
