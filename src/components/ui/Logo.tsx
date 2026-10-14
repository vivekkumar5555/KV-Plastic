export function Logo({
  light = false,
  subtitle,
}: {
  light?: boolean;
  subtitle?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-input bg-primary font-display text-sm font-extrabold tracking-tight text-white">
        KV
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-text"}`}
        >
          KV Plastic
        </span>
        {subtitle && (
          <span className="mt-1 text-[11px] font-semibold tracking-widest text-text-secondary uppercase">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
