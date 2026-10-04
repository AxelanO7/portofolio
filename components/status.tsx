import { STATUS_LABEL, type Status } from "@/config/work";

export function StatusTag({ status, label }: { status: Status; label?: string }) {
  return (
    <span className="status" data-s={status}>
      {status === "live" && label ? "live" : STATUS_LABEL[status]}
    </span>
  );
}

export function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2">{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}
