"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  IconBuildingFactory2,
  IconCertificate,
  IconCalendarStats,
} from "@tabler/icons-react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const float = (delay: number) =>
    reduceMotion
      ? undefined
      : { y: [0, -8, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease, delay: 0.2 }}
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-card border border-border bg-linear-to-br from-primary to-ink shadow-xl shadow-primary/10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="relative flex h-full flex-col items-center justify-center gap-4 text-white">
          <div className="flex h-24 w-24 items-center justify-center rounded-card bg-white/10 ring-1 ring-white/25 backdrop-blur">
            <IconBuildingFactory2 size={48} stroke={1.25} />
          </div>
          <p className="font-display text-lg font-semibold tracking-tight">
            Plastic &amp; Rubber Manufacturing
          </p>
        </div>
      </div>

      <motion.div
        animate={float(0)}
        className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-card border border-border bg-white px-4 py-3 shadow-lg md:-left-8"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-input bg-primary-tint text-primary">
          <IconCertificate size={22} stroke={1.75} />
        </span>
        <span>
          <span className="block font-display text-sm font-bold text-text">ISO 9001</span>
          <span className="block text-xs text-text-secondary">Certified processes</span>
        </span>
      </motion.div>

      <motion.div
        animate={float(1.2)}
        className="absolute -top-5 -right-3 flex items-center gap-3 rounded-card border border-border bg-white px-4 py-3 shadow-lg md:-right-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-input bg-primary-tint text-primary">
          <IconCalendarStats size={22} stroke={1.75} />
        </span>
        <span>
          <span className="block font-display text-sm font-bold text-text">25+ Years</span>
          <span className="block text-xs text-text-secondary">In operation</span>
        </span>
      </motion.div>
    </motion.div>
  );
}
