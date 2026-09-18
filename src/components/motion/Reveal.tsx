"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { easeOut, springOut } from "@/lib/motion-variants";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut, delay },
  }),
};

const springVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: springOut, delay },
  }),
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  spring = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Use a bouncy spring pop-in instead of the standard fade-up — reserved for small playful accents. */
  spring?: boolean;
}) {
  return (
    <motion.div
      className={className}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={spring ? springVariants : variants}
    >
      {children}
    </motion.div>
  );
}
