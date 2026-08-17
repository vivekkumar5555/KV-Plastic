import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-text">New Testimonial</h1>
      <div className="mt-6 max-w-2xl">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
