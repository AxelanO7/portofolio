import { CLIENTS, SYSTEMS, type Item } from "@/config/work";
import { SectionHead, StatusTag } from "@/components/status";

function Card({ item }: { item: Item }) {
  const inner = (
    <>
      {item.img ? (
        <div className="border-b border-white/[0.09]">
          <div className="flex gap-[5px] px-2.5 py-2" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-[#2a3b47]" />
            <i className="h-2 w-2 rounded-full bg-[#2a3b47]" />
            <i className="h-2 w-2 rounded-full bg-[#2a3b47]" />
          </div>
          <img src={`/work/${item.img}.webp`} alt={`${item.name} screenshot`} loading="lazy" decoding="async" className="shot aspect-[16/10]" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold leading-tight">{item.name}</h3>
          <StatusTag status={item.status} label={item.label} />
        </div>
        <p className="text-[13px] text-mist">{item.text}</p>
        {item.label && item.url && <p className="mt-auto pt-2 font-mono text-[11px] text-cy">{item.label} ↗</p>}
      </div>
    </>
  );
  return item.url ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="card flex flex-col">
      {inner}
    </a>
  ) : (
    <article className="card flex flex-col">{inner}</article>
  );
}

function Grid({ items }: { items: Item[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <Card key={i.id} item={i} />
      ))}
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section id="clients" className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="Client platforms"
          title="Built for businesses"
          lead="Booking systems, ERPs, storefronts and company sites, most with a custom back office."
        />
        <Grid items={CLIENTS} />

        <h3 className="mt-14 font-display text-2xl font-semibold tracking-tight">Full-stack systems</h3>
        <p className="lead">Separate backend and frontend builds: fintech, inventory, travel, campus and public-service systems.</p>
        <Grid items={SYSTEMS} />
      </div>
    </section>
  );
}
