import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-text">New Product</h1>
      <div className="mt-6 max-w-2xl">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
