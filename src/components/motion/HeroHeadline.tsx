"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export function HeroHeadline({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
      });

      gsap.from(split.words, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.06,
        delay: 0.15,
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <h1 ref={ref} className={className}>
      {text}
    </h1>
  );
}
