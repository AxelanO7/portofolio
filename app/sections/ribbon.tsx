import { Marquee } from "@/components/ui";
import { PROOF } from "@/config/cases";
import { AGENTS_DAILY, WEB3 } from "@/config/work";

/** Numbers come from config (PROOF, the agent and Web3 lists), so the ribbon follows them. "Booking requests", as everywhere else: most are hand-offs to the partner's checkout. */
const FACTS = [`${PROOF.visitors} visits`, `${PROOF.bookings} booking requests a month`, `${PROOF.partners} partners`, `${AGENTS_DAILY} agents on duty`, "Bali live", "Las Vegas Oct 2026", `${WEB3.length} Web3 launch pages`];

/** Diagonal ribbon between hero and trailer. Replaces a plain divider. */
export default function Ribbon() {
  return (
    <div className="diag" aria-hidden="true">
      <Marquee className="diag-in" speed={34} gap={0} items={FACTS.map((f) => <span key={f}>{f}</span>)} />
    </div>
  );
}
