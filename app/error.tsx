"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="sec">
      <div className="wrap">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="t" style={{ marginTop: 14 }}>This page did not load.</h1>
        <p className="cap" style={{ margin: "14px 0 24px" }}>Try again, or go back to the start.</p>
        <button className="btn pri" type="button" onClick={() => reset()}>Try again</button>
      </div>
    </section>
  );
}
