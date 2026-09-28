"use client";

function toLocalInputValue(iso: string) {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

// datetime-local has no timezone; the server runs in UTC, so we send the
// browser's offset alongside it and fill the initial value in the browser.
export function LocalDateTimeInput({
  id,
  name,
  iso,
  className,
}: {
  id: string;
  name: string;
  iso?: string | null;
  className?: string;
}) {
  return (
    <>
      <input
        id={id}
        name={name}
        type="datetime-local"
        className={className}
        ref={(el) => {
          if (el && iso && !el.value) el.value = toLocalInputValue(iso);
        }}
      />
      <input
        type="hidden"
        name={`${name}TzOffset`}
        ref={(el) => {
          if (el) el.value = String(new Date().getTimezoneOffset());
        }}
      />
    </>
  );
}
