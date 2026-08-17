import { HTMLAttributes } from "react";

export function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-4 md:px-8 ${className}`}
      {...props}
    />
  );
}
