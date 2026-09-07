/**
 * Guestlist system architecture — data for the orbitable 3D diagram.
 * Layers stack on Y; clients → API gateway → Go microservices → datastores,
 * with external integrations. This is the flagship "how I think as an architect"
 * moment for engineering hiring managers.
 */

export type Layer = "client" | "gateway" | "service" | "data" | "external";

export interface ArchNode {
  id: string;
  label: string;
  tech: string;
  layer: Layer;
}

export interface ArchEdge {
  a: string;
  b: string;
}

// Monochrome + one accent: client/data/external stay neutral, the gateway
// (white hub) anchors the diagram, and the service layer — the part of the
// architecture that's actually "mine" as the architect — carries the accent.
export const LAYER_COLOR: Record<Layer, string> = {
  client: "#9a9a94", // neutral gray
  gateway: "#ffffff", // white hub
  service: "#c9a875", // accent
  data: "#b8b8b3", // neutral gray
  external: "#8a8a84", // dimmer neutral gray
};

export const ARCH_NODES: ArchNode[] = [
  // Clients
  { id: "mobile", label: "Mobile App", tech: "React Native", layer: "client" },
  { id: "partner", label: "Partner App", tech: "React Native", layer: "client" },
  { id: "web", label: "Web Platform", tech: "Next.js", layer: "client" },
  { id: "bo", label: "Back Office", tech: "Next.js · HeroUI", layer: "client" },
  { id: "landing", label: "Landing", tech: "Next.js", layer: "client" },

  // Gateway
  { id: "gw", label: "API Gateway", tech: "Go · Gin", layer: "gateway" },

  // Microservices — functional categories (genericized, not internal names)
  { id: "svc_user", label: "Identity", tech: "Go", layer: "service" },
  { id: "svc_txn", label: "Payments", tech: "Go", layer: "service" },
  { id: "svc_aff", label: "Partnerships", tech: "Go", layer: "service" },
  { id: "svc_service", label: "Catalog", tech: "Go", layer: "service" },
  { id: "svc_event", label: "Bookings", tech: "Go", layer: "service" },
  { id: "svc_recruit", label: "Talent", tech: "Go", layer: "service" },

  // Data
  { id: "pg", label: "PostgreSQL", tech: "primary store", layer: "data" },
  { id: "mongo", label: "MongoDB", tech: "documents", layer: "data" },
  { id: "redis", label: "Redis", tech: "cache · queues", layer: "data" },

  // External
  { id: "doku", label: "DOKU", tech: "payments", layer: "external" },
  { id: "fcm", label: "Firebase FCM", tech: "push", layer: "external" },
];

export const ARCH_EDGES: ArchEdge[] = [
  // clients → gateway
  { a: "mobile", b: "gw" },
  { a: "partner", b: "gw" },
  { a: "web", b: "gw" },
  { a: "bo", b: "gw" },
  { a: "landing", b: "gw" },

  // gateway → services
  { a: "gw", b: "svc_user" },
  { a: "gw", b: "svc_txn" },
  { a: "gw", b: "svc_aff" },
  { a: "gw", b: "svc_service" },
  { a: "gw", b: "svc_event" },
  { a: "gw", b: "svc_recruit" },

  // services → data
  { a: "svc_user", b: "pg" },
  { a: "svc_txn", b: "pg" },
  { a: "svc_aff", b: "pg" },
  { a: "svc_recruit", b: "pg" },
  { a: "svc_service", b: "mongo" },
  { a: "svc_event", b: "mongo" },
  { a: "svc_user", b: "redis" },
  { a: "svc_txn", b: "redis" },

  // external
  { a: "svc_txn", b: "doku" },
  { a: "gw", b: "fcm" },
];

// Layout: y per layer, x spread computed in the component.
export const LAYER_Y: Record<Layer, number> = {
  client: 3.1,
  gateway: 1.1,
  service: -1.1,
  data: -3.2,
  external: -3.2,
};
