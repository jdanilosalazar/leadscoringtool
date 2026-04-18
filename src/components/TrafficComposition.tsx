interface TrafficCompositionProps {
  trafico_direct: number;
  trafico_search: number;
  trafico_referrals: number;
  trafico_paid_referrals: number;
  trafico_social: number;
  trafico_mail: number;
  traffic_volatility: string | null;
  m1_vs_m3_pct: number | null;
}

const LABELS: Record<string, string> = {
  trafico_direct:        "Directo",
  trafico_search:        "Búsqueda",
  trafico_referrals:     "Referencias",
  trafico_paid_referrals:"Referencias Pagadas",
  trafico_social:        "Social",
  trafico_mail:          "Email",
};

const VOLATILITY_LABEL: Record<string, string> = {
  stable:   "Estable",
  moderate: "Moderada",
  volatile: "Volátil",
  unknown:  "—",
};

const VOLATILITY_COLOR: Record<string, string> = {
  stable:   "text-emerald-400",
  moderate: "text-yellow-400",
  volatile: "text-red-400",
  unknown:  "text-muted-foreground",
};

export function TrafficComposition({
  trafico_direct,
  trafico_search,
  trafico_referrals,
  trafico_paid_referrals,
  trafico_social,
  trafico_mail,
  traffic_volatility,
  m1_vs_m3_pct,
}: TrafficCompositionProps) {
  const channelEntries: [string, number][] = [
    ["trafico_direct", trafico_direct],
    ["trafico_search", trafico_search],
    ["trafico_referrals", trafico_referrals],
    ["trafico_paid_referrals", trafico_paid_referrals],
    ["trafico_social", trafico_social],
    ["trafico_mail", trafico_mail],
  ];
  const max = Math.max(...channelEntries.map(([, v]) => v));

  const growthDisplay = m1_vs_m3_pct !== null
    ? `${m1_vs_m3_pct > 0 ? "+" : ""}${m1_vs_m3_pct}%`
    : null;

  const growthColor = m1_vs_m3_pct === null ? ""
    : m1_vs_m3_pct >= 0 ? "text-emerald-400"
    : "text-red-400";

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h2 className="text-lg font-semibold">Composición de Tráfico</h2>

      {/* Volatility + growth summary */}
      {(traffic_volatility || growthDisplay) && (
        <div className="flex gap-4 flex-wrap">
          {traffic_volatility && (
            <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Volatilidad</span>
              <span className={`font-mono text-sm font-semibold ${VOLATILITY_COLOR[traffic_volatility] ?? "text-foreground"}`}>
                {VOLATILITY_LABEL[traffic_volatility] ?? traffic_volatility}
              </span>
            </div>
          )}
          {growthDisplay && (
            <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">M1 vs M3 (trimestre)</span>
              <span className={`font-mono text-sm font-semibold ${growthColor}`}>{growthDisplay}</span>
            </div>
          )}
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        {channelEntries
          .sort(([, a], [, b]) => b - a)
          .map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{LABELS[key] ?? key}</span>
                <span className="font-mono font-medium">{value.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-border rounded-sm overflow-hidden">
                <div
                  className="h-full bg-primary rounded-sm transition-all duration-500"
                  style={{ width: max > 0 ? `${(value / max) * 100}%` : "0%" }}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
