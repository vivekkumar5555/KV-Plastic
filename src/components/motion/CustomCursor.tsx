"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { IconHandFinger } from "@tabler/icons-react";
import { gsap } from "@/lib/gsap";

const HOVER_SELECTOR = 'a, button, [role="button"], input[type="submit"]';
const FIELD_SELECTOR = "input, textarea, select";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const enabled =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!enabled || !cursorRef.current) return;

    document.body.classList.add("custom-cursor-active");

    const cursor = cursorRef.current;

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(FIELD_SELECTOR)) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      } else if (target.closest(HOVER_SELECTOR)) {
        gsap.to(cursor, { scale: 1.25, duration: 0.15, ease: "power2.out" });
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(FIELD_SELECTOR)) {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      } else if (target.closest(HOVER_SELECTOR)) {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "back.out(2)" });
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden md:block"
      aria-hidden
    >
      {/* Offsets the icon so its fingertip (not its center) sits at the pointer position. */}
      <div
        className="h-9 w-9 translate-x-[-38%] translate-y-[-16%] text-primary"
        style={{
          filter:
            "drop-shadow(0 0 1.5px rgba(255,255,255,0.95)) drop-shadow(0 2px 4px rgba(20,17,15,0.3))",
        }}
      >
        <IconHandFinger size={36} stroke={2} className="h-full w-full" />
      </div>
    </div>
  );
}
