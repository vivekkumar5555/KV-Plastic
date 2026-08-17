import { PageHero } from "@/components/PageHero";
import { ProductsCatalog } from "@/components/ProductsCatalog";
import { getProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHero
        eyebrow="Catalog"
        title="Products & Capabilities"
        description="Browse by category or material, or search for a specific part type."
      />
      <ProductsCatalog products={products} />
    </>
  );
}
