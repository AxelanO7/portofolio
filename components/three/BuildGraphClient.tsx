"use client";

import dynamic from "next/dynamic";

// three.js is code-split and never rendered on the server.
const BuildGraph = dynamic(() => import("./BuildGraph"), {
  ssr: false,
  loading: () => null,
});

export default BuildGraph;
