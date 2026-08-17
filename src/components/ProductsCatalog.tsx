"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconSearch } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { staggerItem } from "@/lib/motion-variants";
import type { Product } from "@prisma/client";

export function ProductsCatalog({ products }: { products: Product[] }) {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, category, query]);

  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border-[0.5px] px-4 py-1.5 text-sm transition-colors duration-200 ${
                  category === c
                    ? "border-primary bg-primary-tint text-primary"
                    : "border-border text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <IconSearch
              size={18}
              stroke={1.75}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or materials"
              className="w-full rounded-input border-[0.5px] border-border py-2 pl-10 pr-3 text-sm outline-none transition-colors duration-200 focus:border-primary"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            layout
            className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  variants={staggerItem}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center text-text-secondary"
          >
            No products match your filters. Try a different category or
            search term.
          </motion.div>
        )}
      </Container>
    </section>
  );
}
