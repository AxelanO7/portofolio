import { Marquee } from "@/components/ui";

const FACTS = ["30,000+ visitors", "700+ bookings a month", "110+ partners", "6 agents on duty", "Bali live", "Las Vegas Oct 2026", "44 Web3 launch pages"];

/** Diagonal ribbon between hero and trailer. Replaces a plain divider. */
export default function Ribbon() {
  return (
    <div className="diag" aria-hidden="true">
      <Marquee className="diag-in" speed={34} gap={0} items={FACTS.map((f) => <span key={f}>{f}</span>)} />
    </div>
  );
}
