"use client";

import ToolGalaxy from "@/components/ToolGalaxy";
import { TOOL_COUNT } from "@/config/arsenal";
import { useI18n } from "@/lib/i18n";

export default function StackSection() {
  const { t } = useI18n();
  return (
    <section id="stack" className="section">
      <div className="wrap text-center">
        <p className="eyebrow">{t("stack_eyebrow")}</p>
        <h2 className="h2 mx-auto">
          {TOOL_COUNT} tools. <span className="text-cy">One builder.</span>
        </h2>
        <p className="lead mx-auto">{t("stack_sub")}</p>
        <div className="mt-8">
          <ToolGalaxy />
        </div>
      </div>
    </section>
  );
}
