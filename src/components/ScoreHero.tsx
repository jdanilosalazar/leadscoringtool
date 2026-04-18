import { useEffect, useState } from "react";
import { Tier, ICPFit } from "@/types/lead-score";

const TIER_COLOR: Record<string, string> = {
  Caliente:   "text-tier-hot",
  Tibio:      "text-tier-warm",
  "Frío":     "text-tier-cold",
  "Congelado":"text-muted-foreground",
  DESCARTADO: "text-muted-foreground",
};

const TIER_BG: Record<string, string> = {
  Caliente:   "bg-tier-hot/15 text-tier-hot border-tier-hot/30",
  Tibio:      "bg-tier-warm/15 text-tier-warm border-tier-warm/30",
  "Frío":     "bg-tier-cold/15 text-tier-cold border-tier-cold/30",
  "Congelado":"bg-muted text-muted-foreground border-border",
  DESCARTADO: "bg-muted text-muted-foreground border-border",
};

const TIER_BAR: Record<string, string> = {
  Caliente:   "bg-tier-hot",
  Tibio:      "bg-tier-warm",
  "Frío":     "bg-tier-cold",
  "Congelado":"bg-muted-foreground",
  DESCARTADO: "bg-muted-foreground",
};

const TIER_THRESHOLD: Record<string, string> = {
  Caliente:   "≥ 20 pts",
  Tibio:      "≥ 16 pts",
  "Frío":     "≥ 10 pts",
  "Congelado":"< 10 pts",
  DESCARTADO: "Descartado",
};

const ICP_BG: Record<string, string> = {
  "ICP Core":      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "ICP Secondary": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "ICP Weak":      "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Desconocido":   "bg-muted text-muted-foreground border-border",
};

// Visual max for the progress bar (theoretical ceiling of the scoring model)
const DISPLAY_MAX = 28;

interface ScoreHeroProps {
  points: number;
  tier: Tier;
  icp_fit: ICPFit;
  url: string;
  merchant_name: string | null;
  sitio_title: string | null;
  fecha_calculo: string;
  pais_codigo: string | null;
  revision_manual: string | null;
}

export function ScoreHero({
  points, tier, icp_fit, url, merchant_name, sitio_title, fecha_calculo, pais_codigo, revision_manual
}: ScoreHeroProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const steps = 40;
    const increment = points / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= points) { setDisplayed(points); clearInterval(interval); }
      else setDisplayed(Math.floor(current));
    }, 800 / steps);
    return () => clearInterval(interval);
  }, [points]);

  const needsReview = revision_manual === "SI";

  return (
    <section className="text-center space-y-6 py-14">
      {/* Revision warning badge */}
      {needsReview && (
        <div className="inline-flex items-center gap-2 bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-md px-4 py-2 text-sm font-semibold">
          ⚠ Requiere revisión manual de categoría
        </div>
      )}

      {/* Score */}
      <div className="space-y-3">
        <div className={`text-8xl font-bold tracking-tight font-mono ${TIER_COLOR[tier] ?? "text-foreground"}`}>
          {displayed}
          <span className="text-3xl text-muted-foreground font-normal"> pts</span>
        </div>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-md border text-sm font-semibold font-mono ${TIER_BG[tier] ?? "bg-muted"}`}>
            {tier.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-md border text-sm font-semibold ${ICP_BG[icp_fit] ?? "bg-muted"}`}>
            {icp_fit}
          </span>
          {pais_codigo && (
            <span className="inline-flex items-center px-3 py-1 rounded-md border text-sm font-mono border-border text-muted-foreground">
              {pais_codigo}
            </span>
          )}
        </div>
      </div>

      {/* Store identity */}
      <div className="space-y-1">
        {merchant_name && (
          <p className="text-xl font-semibold">{merchant_name}</p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-primary hover:underline"
        >
          {url}
        </a>
        {sitio_title && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed pt-1">
            {sitio_title}
          </p>
        )}
        <p className="font-mono text-xs text-muted-foreground pt-1">
          Puntuado el {new Date(fecha_calculo).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </div>

      {/* Score bar */}
      <div className="max-w-xs mx-auto space-y-1">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${TIER_BAR[tier] ?? "bg-muted-foreground"}`}
            style={{ width: `${Math.min((points / DISPLAY_MAX) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-mono text-right">
          {points} pts · {TIER_THRESHOLD[tier] ?? ""}
        </p>
      </div>
    </section>
  );
}
