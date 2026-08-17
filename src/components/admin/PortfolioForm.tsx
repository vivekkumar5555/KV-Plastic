import type { Portfolio } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export function PortfolioForm({
  item,
  action,
}: {
  item?: Portfolio;
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
              defaultValue={item?.title}
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
              defaultValue={item?.slug}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="industry">
              Industry *
            </label>
            <input
              id="industry"
              name="industry"
              required
              defaultValue={item?.industry}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="metric">
              Result Metric *
            </label>
            <input
              id="metric"
              name="metric"
              required
              defaultValue={item?.metric}
              placeholder="e.g. 30% weight reduction"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="challenge">
            Challenge *
          </label>
          <textarea
            id="challenge"
            name="challenge"
            required
            rows={3}
            defaultValue={item?.challenge}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="solution">
            Solution *
          </label>
          <textarea
            id="solution"
            name="solution"
            required
            rows={3}
            defaultValue={item?.solution}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="outcome">
            Outcome *
          </label>
          <textarea
            id="outcome"
            name="outcome"
            required
            rows={3}
            defaultValue={item?.outcome}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="image">
            Cover Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className={inputClass}
          />
          {item?.imageUrl && (
            <p className="mt-1 text-xs text-text-secondary">
              Current: {item.imageUrl}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="published"
            defaultChecked={item?.published ?? true}
          />
          Published
        </label>
      </Card>

      <Button type="submit">{item ? "Save Changes" : "Create Case Study"}</Button>
    </form>
  );
}
