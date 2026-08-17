import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getTestimonialById } from "@/lib/admin-queries";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <div>
      <h1 className="text-text">Edit Testimonial</h1>
      <div className="mt-6 max-w-2xl">
        <TestimonialForm testimonial={testimonial} action={action} />
      </div>
    </div>
  );
}
