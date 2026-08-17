import type { Product } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border-[0.5px] border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-primary";

export function ProductForm({
  product,
  action,
}: {
  product?: Product;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="name">
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              defaultValue={product?.name}
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
              defaultValue={product?.slug}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="category">
              Category *
            </label>
            <input
              id="category"
              name="category"
              required
              defaultValue={product?.category}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="material">
              Material *
            </label>
            <input
              id="material"
              name="material"
              required
              defaultValue={product?.material}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="shortSpec">
            Short Spec *
          </label>
          <input
            id="shortSpec"
            name="shortSpec"
            required
            defaultValue={product?.shortSpec}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            defaultValue={product?.description}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="tolerance">
              Tolerance *
            </label>
            <input
              id="tolerance"
              name="tolerance"
              required
              defaultValue={product?.tolerance}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="weight">
              Weight *
            </label>
            <input
              id="weight"
              name="weight"
              required
              defaultValue={product?.weight}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="dimensions">
              Dimensions *
            </label>
            <input
              id="dimensions"
              name="dimensions"
              required
              defaultValue={product?.dimensions}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="moq">
              MOQ *
            </label>
            <input
              id="moq"
              name="moq"
              required
              defaultValue={product?.moq}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="image">
            Product Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className={inputClass}
          />
          {product?.imageUrl && (
            <p className="mt-1 text-xs text-text-secondary">
              Current: {product.imageUrl}
            </p>
          )}
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={product?.featured}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="published"
              defaultChecked={product?.published ?? true}
            />
            Published
          </label>
        </div>
      </Card>

      <Button type="submit">{product ? "Save Changes" : "Create Product"}</Button>
    </form>
  );
}
