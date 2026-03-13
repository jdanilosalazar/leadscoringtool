import { useEffect, useState } from "react";
import { Tier, ICPFit } from "@/types/lead-score";

const TIER_COLOR: Record<string, string> = {
  Hot:  "text-tier-hot",
  Warm: "text-tier-warm",
  Cold: "text-tier-cold",
};

const TIER_BG: Record<string, string> = {
  Hot:  "bg-tier-hot/15 text-tier-hot border-tier-hot/30",
  Warm: "bg-tier-warm/15 text-tier-warm border-tier-warm/30",
  Cold: "bg-tier-cold/15 text-tier-cold border-tier-cold/30",
};

const ICP_BG: Record<string, string> = {
  "ICP Core":      "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "ICP Secondary": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "ICP Weak":      "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "unknown":       "bg-muted text-muted-foreground border-border",
};

interface ScoreHeroProps {
  points: number;
  tier: Tier;
  icp_fit: ICPFit;
  url: string;
  merchant_name: string | null;
  sitio_descripcion: string | null;
  fecha_calculo: string;
  pais_codigo: string | null;
}

export function ScoreHero({
  points, tier, icp_fit, url, merchant_name, sitio_descripcion, fecha_calculo, pais_codigo
}: ScoreHeroProps) {
  const [displayed, setDisplayed] = useState(0);
  const MAX = 13;

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

  return (
    <section className="text-center space-y-6 py-14">
      {/* Score */}
      <div className="space-y-3">
        <div className={`text-8xl font-bold tracking-tight font-mono ${TIER_COLOR[tier] ?? "text-foreground"}`}>
          {displayed}
          <span className="text-3xl text-muted-foreground font-normal">/{MAX}</span>
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
        {sitio_descripcion && (
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed pt-1">
            {sitio_descripcion}
          </p>
        )}
        <p className="font-mono text-xs text-muted-foreground pt-1">
          Scored {new Date(fecha_calculo).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </div>

      {/* Score bar */}
      <div className="max-w-xs mx-auto space-y-1">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              tier === "Hot" ? "bg-tier-hot" : tier === "Warm" ? "bg-tier-warm" : "bg-tier-cold"
            }`}
            style={{ width: `${(points / MAX) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-mono text-right">
          {points} / {MAX} pts · {tier === "Hot" ? "≥7 Hot" : tier === "Warm" ? "≥4 Warm" : "<4 Cold"}
        </p>
      </div>
    </section>
  );
}
