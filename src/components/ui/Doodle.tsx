type DoodleProps = {
  className?: string;
};

export function DoodleSparkle({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 2C20.8 12 22 20 34 20C22 20 20.8 28 20 38C19.2 28 18 20 6 20C18 20 19.2 12 20 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DoodleRing({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="3 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleSquiggle({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 100 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 14C10 4 16 4 24 14C32 24 38 24 46 14C54 4 60 4 68 14C76 24 82 24 90 14C94 9.5 96 8 98 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 6C22 6 34 14 30 34"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 30C22 33 26 34 30 34C31 30 32 26 32 21"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodlePlus({ className = "" }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 3V21M3 12H21"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
