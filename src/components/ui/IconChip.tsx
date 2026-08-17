import { ReactNode } from "react";

const tones = {
  primary: "bg-primary-tint text-primary",
  accent: "bg-accent-tint text-accent",
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
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${tones[tone]} ${className}`}
    >
      {icon}
    </div>
  );
}
