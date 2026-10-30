"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Same layout and type as the 404 page (app/not-found.tsx), so a failure looks like part of the site. */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="sec" style={{ padding: "clamp(48px, 9vw, 112px) 0 clamp(64px, 10vw, 128px)" }}>
      <div className="wrap" style={{ maxWidth: 860 }}>
        <span className="eyebrow">Something went wrong</span>
        <h1 className="t" style={{ marginTop: 14 }}>This page did not load.</h1>
        <p style={{ marginTop: 14, maxWidth: "46ch", color: "var(--mut)", fontSize: 18 }}>Try again, or go back to the start.</p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button className="btn pri" type="button" onClick={() => reset()}>Try again</button>
          <Link className="btn" href="/">Back to the home page</Link>
        </div>
      </div>
    </section>
  );
}
