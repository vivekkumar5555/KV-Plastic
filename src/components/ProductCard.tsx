"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconPackage, IconArrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/Badge";

type Product = {
  slug: string;
  name: string;
  category: string;
  material: string;
  shortSpec: string;
  featured?: boolean;
  imageUrl?: string | null;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/5"
      >
        <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden bg-bg-alt text-primary/40">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <IconPackage
              size={48}
              stroke={1.25}
              className="transition-transform duration-500 ease-out group-hover:scale-110"
            />
          )}
          <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-text shadow-sm">
            {product.category}
          </span>
          {product.featured && (
            <Badge tone="primary" className="absolute top-3 right-3 bg-primary! text-white!">
              Featured
            </Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-text transition-colors duration-200 group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            {product.material} &middot; {product.shortSpec}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
            View Details &amp; Request Quote
            <IconArrowRight
              size={16}
              stroke={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
