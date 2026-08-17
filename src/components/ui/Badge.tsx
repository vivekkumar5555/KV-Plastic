import { HTMLAttributes } from "react";

const tones = {
  accent: "bg-accent-tint text-accent",
  primary: "bg-primary-tint text-primary",
  success: "bg-success/10 text-success",
  error: "bg-error/10 text-error",
  neutral: "bg-bg-alt text-text-secondary",
} as const;

type Tone = keyof typeof tones;

export function Badge({
  tone = "accent",
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
