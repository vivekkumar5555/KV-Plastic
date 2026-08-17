import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllTestimonials } from "@/lib/admin-queries";
import { deleteTestimonial } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-text">Testimonials</h1>
        <LinkButton href="/admin/testimonials/new">New Testimonial</LinkButton>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id} className="border-b-[0.5px] border-border last:border-0">
                <td className="px-6 py-3 text-text">{t.name}</td>
                <td className="px-6 py-3 text-text-secondary">{t.company}</td>
                <td className="px-6 py-3">
                  <Badge tone={t.published ? "primary" : "accent"}>
                    {t.published ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton onDelete={deleteTestimonial.bind(null, t.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
