interface StoreOverviewProps {
  promedio_visitas_mensuales: number;
  visitas_totales_mensuales: number | null;
  visitas_ultimo_mes: number | null;
  traffic_band: string;
  m1_to_m3_growth_pct: number | null;
  numero_productos: number;
  categoria: string | null;
  categoria_original: string | null;
  rank_global: number | null;
  tasa_rebote: number | null;
  paginas_por_sesion: number | null;
  duracion_visita_minutos: number | null;
}

function MetricCard({ label, value, mono = false, highlight }: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: "positive" | "negative" | "neutral";
}) {
  const highlightClass =
    highlight === "positive" ? "text-emerald-400" :
    highlight === "negative" ? "text-red-400" : "";

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-semibold ${mono ? "font-mono" : ""} ${highlightClass}`}>{value}</p>
    </div>
  );
}

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

export function StoreOverview({
  promedio_visitas_mensuales,
  visitas_totales_mensuales,
  visitas_ultimo_mes,
  traffic_band,
  m1_to_m3_growth_pct,
  numero_productos,
  categoria,
  categoria_original,
  rank_global,
  tasa_rebote,
  paginas_por_sesion,
  duracion_visita_minutos,
}: StoreOverviewProps) {
  const growthDisplay = m1_to_m3_growth_pct !== null
    ? `${m1_to_m3_growth_pct > 0 ? "+" : ""}${m1_to_m3_growth_pct}%`
    : "—";

  const growthHighlight = m1_to_m3_growth_pct === null ? "neutral"
    : m1_to_m3_growth_pct >= 30 ? "positive"
    : m1_to_m3_growth_pct < 0 ? "negative"
    : "neutral";

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h2 className="text-lg font-semibold">Store Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard label="Avg Monthly Visits" value={fmt(promedio_visitas_mensuales)} mono />
        <MetricCard label="Traffic Band" value={traffic_band} mono />
        <MetricCard label="M1→M3 Growth" value={growthDisplay} mono highlight={growthHighlight} />
        <MetricCard label="Last Month Visits" value={visitas_ultimo_mes !== null ? fmt(visitas_ultimo_mes) : "—"} mono />
        <MetricCard label="Total Visits (3mo)" value={visitas_totales_mensuales !== null ? fmt(visitas_totales_mensuales) : "—"} mono />
        <MetricCard label="Products" value={fmt(numero_productos)} mono />
        <MetricCard label="Category" value={categoria ?? "—"} />
        <MetricCard label="Original Category" value={categoria_original ?? "—"} />
        {rank_global ? <MetricCard label="Global Rank" value={`#${fmt(rank_global)}`} mono /> : null}
      </div>

      {/* Engagement row */}
      {(tasa_rebote !== null || paginas_por_sesion !== null || duracion_visita_minutos !== null) && (
        <>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-2">Engagement</h3>
          <div className="grid grid-cols-3 gap-3">
            {tasa_rebote !== null && (
              <MetricCard label="Bounce Rate" value={`${tasa_rebote}%`} mono
                highlight={tasa_rebote < 30 ? "positive" : tasa_rebote > 60 ? "negative" : "neutral"} />
            )}
            {paginas_por_sesion !== null && (
              <MetricCard label="Pages / Session" value={paginas_por_sesion.toFixed(2)} mono />
            )}
            {duracion_visita_minutos !== null && (
              <MetricCard label="Avg Visit (min)" value={duracion_visita_minutos.toFixed(2)} mono />
            )}
          </div>
        </>
      )}
    </section>
  );
}
