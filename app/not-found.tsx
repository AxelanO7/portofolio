import type { Metadata } from "next";
import Link from "next/link";
import { CASES } from "@/config/cases";
import "@/styles/notfound.css";

/**
 * Next sends the 404 status and adds noindex itself. The rest of the site's head (description, canonical,
 * share card, "index, follow") would describe the home page, so it is switched off for this one.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: null,
  alternates: null,
  robots: null,
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <span className="eyebrow">Error 404</span>
        <div className="nf-code" aria-hidden="true">404</div>
        <h1 className="t">This page does not exist.</h1>
        <p className="lead">The link may be old, or there is a typo in the address. These will get you back.</p>
        <div className="nf-term" aria-hidden="true">
          <div><span className="pr">axel@bali ~ %</span> open this-page</div>
          <div className="er">open: this-page: no such page</div>
        </div>
        <div className="acts">
          <Link className="btn pri" href="/">Back to the home page</Link>
          <Link className="btn" href="/#cases">See the case studies</Link>
        </div>
        <div className="nf-more">
          <span className="eyebrow">Or read one</span>
          <ul>
            {CASES.map((c) => (
              <li key={c.id}>
                <Link href={`/cases/${c.id}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
