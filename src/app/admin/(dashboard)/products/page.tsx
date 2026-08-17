import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getAllProducts } from "@/lib/admin-queries";
import { deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-text">Products</h1>
        <LinkButton href="/admin/products/new">New Product</LinkButton>
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-[0.5px] border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Material</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b-[0.5px] border-border last:border-0">
                <td className="px-6 py-3 text-text">{p.name}</td>
                <td className="px-6 py-3 text-text-secondary">{p.category}</td>
                <td className="px-6 py-3 text-text-secondary">{p.material}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    {p.featured && <Badge tone="accent">Featured</Badge>}
                    <Badge tone={p.published ? "primary" : "accent"}>
                      {p.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton onDelete={deleteProduct.bind(null, p.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
