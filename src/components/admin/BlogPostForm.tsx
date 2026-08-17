import type { BlogPost } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

function toDateTimeLocal(date: Date | null | undefined) {
  if (!date) return "";
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function BlogPostForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="title">
              Title *
            </label>
            <input
              id="title"
              name="title"
              required
              defaultValue={post?.title}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="slug">
              Slug *
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={post?.slug}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="category">
            Category *
          </label>
          <input
            id="category"
            name="category"
            required
            defaultValue={post?.category}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="excerpt">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={2}
            defaultValue={post?.excerpt}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="content">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            defaultValue={post?.content}
            className={inputClass}
          />
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-text">SEO</h2>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="metaTitle">
            Meta Title
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            defaultValue={post?.metaTitle ?? ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="metaDescription">
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            rows={2}
            defaultValue={post?.metaDescription ?? ""}
            className={inputClass}
          />
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-text">Publishing</h2>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="publishAt">
            Scheduled Publish Date (optional)
          </label>
          <input
            id="publishAt"
            name="publishAt"
            type="datetime-local"
            defaultValue={toDateTimeLocal(post?.publishAt)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-text-secondary">
            Leave blank to publish immediately once &quot;Published&quot; is checked.
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published}
          />
          Published
        </label>
      </Card>

      <Button type="submit">{post ? "Save Changes" : "Create Post"}</Button>
    </form>
  );
}
