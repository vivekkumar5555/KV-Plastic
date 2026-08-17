"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconPackage } from "@tabler/icons-react";
import { Card } from "@/components/ui/Card";
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
      <Card className="group flex h-full flex-col p-0 overflow-hidden transition-colors duration-200 hover:border-primary">
        <div className="relative flex h-40 items-center justify-center overflow-hidden bg-bg-alt text-text-secondary">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <IconPackage
              size={40}
              stroke={1.5}
              className="transition-transform duration-500 ease-out group-hover:scale-110"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-text">{product.name}</h3>
            {product.featured && <Badge tone="accent">Featured</Badge>}
          </div>
          <p className="text-sm text-text-secondary">
            {product.material} &middot; {product.shortSpec}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-xs text-text-secondary">
              {product.category}
            </span>
            <Link
              href={`/products/${product.slug}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Request Quote →
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
