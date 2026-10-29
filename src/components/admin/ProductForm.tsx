import type { Product } from "@prisma/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const inputClass =
  "mt-1 w-full rounded-input border border-border bg-white px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-primary focus:ring-3 focus:ring-primary/15";

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
              Name
            </label>
            <input
              id="name"
              name="name"
              defaultValue={product?.name}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="slug">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={product?.slug}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              defaultValue={product?.category}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="material">
              Material
            </label>
            <input
              id="material"
              name="material"
              defaultValue={product?.material}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="shortSpec">
            Short Spec
          </label>
          <input
            id="shortSpec"
            name="shortSpec"
            defaultValue={product?.shortSpec}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-text-secondary" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          <div>
            <label className="text-sm text-text-secondary" htmlFor="tolerance">
              Tolerance
            </label>
            <input
              id="tolerance"
              name="tolerance"
              defaultValue={product?.tolerance}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="weight">
              Weight
            </label>
            <input
              id="weight"
              name="weight"
              defaultValue={product?.weight}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="dimensions">
              Dimensions
            </label>
            <input
              id="dimensions"
              name="dimensions"
              defaultValue={product?.dimensions}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm text-text-secondary" htmlFor="moq">
              MOQ
            </label>
            <input
              id="moq"
              name="moq"
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
