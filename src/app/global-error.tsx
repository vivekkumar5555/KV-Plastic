"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "Arial, Helvetica, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 500 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#5f5e5a", maxWidth: "28rem" }}>
          An unexpected error occurred. Please try again, and contact us if
          the problem continues.
        </p>
        <button
          onClick={() => reset()}
          style={{
            padding: "0.625rem 1.25rem",
            borderRadius: "8px",
            background: "#0f6e56",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
