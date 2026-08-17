import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/admin-queries";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const action = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-text">Edit Product</h1>
      <div className="mt-6 max-w-2xl">
        <ProductForm product={product} action={action} />
      </div>
    </div>
  );
}
