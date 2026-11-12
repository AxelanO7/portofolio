import { ldString } from "@/lib/jsonld";

/** Structured data for search engines. Server component: the script is in the static HTML, nothing runs in the browser. */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldString(data) }} />;
}
