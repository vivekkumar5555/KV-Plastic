import type { Testimonial } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-4">
        <div>
          <label className="text-sm text-text-secondary" htmlFor="quote">
            Quote *
          </label>
          <textarea
            id="quote"
            name="quote"
            required
            rows={4}
            defaultValue={testimonial?.quote}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={testimonial?.name}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="role">
              Role *
            </label>
            <input
              id="role"
              name="role"
              required
              defaultValue={testimonial?.role}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="company">
              Company *
            </label>
            <input
              id="company"
              name="company"
              required
              defaultValue={testimonial?.company}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="photo">
            Photo / Logo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            className={inputClass}
          />
          {testimonial?.photoUrl && (
            <p className="mt-1 text-xs text-text-secondary">
              Current: {testimonial.photoUrl}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            name="published"
            defaultChecked={testimonial?.published ?? true}
          />
          Published
        </label>
      </Card>

      <Button type="submit">
        {testimonial ? "Save Changes" : "Create Testimonial"}
      </Button>
    </form>
  );
}
