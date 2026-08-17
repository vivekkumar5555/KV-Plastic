"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconBuildingFactory2 } from "@tabler/icons-react";

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative flex h-64 items-center justify-center overflow-hidden rounded-card border-[0.5px] border-border bg-white text-text-secondary md:h-80"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        className="absolute h-56 w-56 rounded-full bg-primary-tint blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-40 w-40 translate-x-16 translate-y-10 rounded-full bg-accent-tint blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="relative flex h-24 w-24 items-center justify-center rounded-full border-[0.5px] border-border bg-white shadow-sm"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <IconBuildingFactory2 size={44} stroke={1.25} className="text-primary" />
      </motion.div>
    </motion.div>
  );
}
