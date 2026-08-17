import { HTMLAttributes } from "react";

export function Card({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-card border-[0.5px] border-border bg-white p-6 ${className}`}
      {...props}
    />
  );
}
