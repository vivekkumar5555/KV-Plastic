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
      <section className="border-b border-border bg-bg-alt py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-card border border-border bg-white text-primary/40 shadow-sm md:h-112">
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
              <p className="eyebrow">{product.category}</p>
              <h1 className="mt-4 text-text">{product.name}</h1>
              <p className="mt-5 text-lg text-text-secondary">{product.description}</p>

              <dl className="mt-8 grid grid-cols-2 overflow-hidden rounded-card border border-border bg-white">
                {specs.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`border-border px-5 py-4 ${i % 2 === 0 ? "border-r" : ""} ${i < specs.length - 1 ? "border-b" : ""} ${i === specs.length - 1 && i % 2 === 0 ? "col-span-2 border-r-0" : ""}`}
                  >
                    <dt className="text-xs font-semibold tracking-wide text-text-secondary uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1 font-medium text-text">{value || "—"}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-4">
                <LinkButton href={`/request-quote?product=${product.slug}`}>
                  Request Quote for This Product
                </LinkButton>
                <LinkButton
                  href={`/products/${product.slug}/spec-sheet`}
                  download={`${product.slug}-spec-sheet.pdf`}
                  variant="secondary"
                >
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
