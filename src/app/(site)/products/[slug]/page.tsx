import { notFound } from "next/navigation";
import Image from "next/image";
import { IconPackage, IconFileDownload } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getProductBySlug, getRelatedProducts } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.slug);

  const specs: [string, string][] = [
    ["Material", product.material],
    ["Tolerance", product.tolerance],
    ["Weight", product.weight],
    ["Dimensions", product.dimensions],
    ["MOQ", product.moq],
  ];

  return (
    <>
      <section className="border-b-[0.5px] border-border py-14">
        <Container className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-card border-[0.5px] border-border bg-bg-alt text-text-secondary md:h-96">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <IconPackage size={64} stroke={1.25} />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-accent">
                {product.category}
              </p>
              <h1 className="mt-2 text-text">{product.name}</h1>
              <p className="mt-4 text-text-secondary">{product.description}</p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t-[0.5px] border-border pt-6">
                {specs.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-text-secondary">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-text">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton href={`/request-quote?product=${product.slug}`}>
                  Request Quote for This Product
                </LinkButton>
                <LinkButton href="#" variant="secondary">
                  <IconFileDownload size={18} stroke={1.75} />
                  Download Spec Sheet
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16">
          <Container>
            <Reveal>
              <h2 className="text-text">Related Products</h2>
            </Reveal>
            <StaggerGrid className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.slug} lift={false}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Container>
        </section>
      )}
    </>
  );
}
