import { GUESTLIST_TILES, LAS_VEGAS, type Tile } from "@/config/work";
import { SectionHead, StatusTag } from "@/components/status";

const GRID: Record<Tile["size"], string> = {
  hero: "md:col-span-4 md:row-span-2",
  phone: "md:col-span-2",
  small: "md:col-span-2",
};

function Visual({ tile }: { tile: Tile }) {
  if (tile.phones) {
    return (
      <div className="mt-auto flex justify-center gap-2.5 px-4 pb-5 pt-2">
        {tile.phones.map((p) => (
          <img
            key={p}
            src={`/work/${p}.webp`}
            alt={`${tile.name} screen`}
            loading="lazy"
            decoding="async"
            className={`${tile.pan ? "pan" : "aspect-[9/19] object-cover object-top"} w-[38%] max-w-[130px] rounded-[14px] border-2 border-[#26343e]`}
          />
        ))}
      </div>
    );
  }
  if (tile.shot) {
    return (
      <img
        src={`/work/${tile.shot}.webp`}
        alt={`${tile.name} screenshot`}
        loading="lazy"
        decoding="async"
        className={`shot mt-auto border-t border-white/[0.09] ${tile.size === "hero" ? "aspect-[16/9] md:min-h-0 md:flex-1 md:aspect-auto" : "aspect-[16/9]"}`}
      />
    );
  }
  return null;
}

export default function FlagshipSection() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Flagship"
          title="Guestlist Ticket, end to end"
          lead="One brand across web, two mobile apps, a link hub, a landing page and a back office, now expanding to Las Vegas, with advanced SEO behind it."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-6">
          {GUESTLIST_TILES.map((tile) => (
            <article key={tile.id} className={`card flex flex-col ${GRID[tile.size]}`}>
              <div className="p-5">
                <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-display text-xl font-semibold tracking-tight">
                  {tile.id === "glw" ? <span className="text-gold">{tile.name}</span> : tile.name}
                  <StatusTag status={tile.status} />
                </h3>
                <p className="mt-1.5 text-sm text-mist">{tile.text}</p>
                {tile.url && (
                  <a href={tile.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-xs text-cy hover:underline">
                    {tile.url.replace("https://", "")} ↗
                  </a>
                )}
              </div>
              <Visual tile={tile} />
            </article>
          ))}

          <article className="card md:col-span-6">
            <div className="p-5">
              <h3 className="flex flex-wrap items-baseline gap-x-3 font-display text-xl font-semibold tracking-tight">
                {LAS_VEGAS.name}
                <StatusTag status={LAS_VEGAS.status} />
              </h3>
              <p className="mt-1.5 text-sm text-mist">{LAS_VEGAS.text}</p>
            </div>
            <dl className="grid grid-cols-3 border-t border-white/[0.09]">
              {LAS_VEGAS.stats.map((s) => (
                <div key={s.label} className="border-r border-white/[0.09] px-5 py-4 last:border-r-0">
                  <dt className="whitespace-nowrap font-display text-[clamp(18px,5vw,30px)] font-semibold leading-none text-gold">{s.value}</dt>
                  <dd className="mt-1 text-xs text-mist">{s.label}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
