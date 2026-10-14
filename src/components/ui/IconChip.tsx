import { ReactNode } from "react";

const tones = {
  primary: "bg-primary-tint text-primary",
  solid: "bg-primary text-white",
} as const;

type Tone = keyof typeof tones;

export function IconChip({
  icon,
  tone = "primary",
  className = "",
}: {
  icon: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-input ${tones[tone]} ${className}`}
    >
      {icon}
    </div>
  );
}
