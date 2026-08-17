"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function AnimatedStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const numberRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const match = value.match(/^([\d,.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1].replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  useGSAP(
    () => {
      if (numeric === null || !numberRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const counter = { val: reduceMotion ? numeric : 0 };
      const el = numberRef.current;
      el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;

      if (reduceMotion) return;

      gsap.to(counter, {
        val: numeric,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: containerRef, dependencies: [value] }
  );

  return (
    <div ref={containerRef} className="text-center">
      <div className="text-3xl font-medium text-primary" ref={numberRef}>
        {value}
      </div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </div>
  );
}
