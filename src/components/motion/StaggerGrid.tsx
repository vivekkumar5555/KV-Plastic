"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

export function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  lift = true,
  ...props
}: HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
      whileHover={
        lift
          ? { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
