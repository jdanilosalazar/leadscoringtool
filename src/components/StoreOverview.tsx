interface StoreOverviewProps {
  mediana_visitas_mensuales: number;
  promedio_visitas_mensuales: number;
  visitas_totales_mensuales: number | null;
  visits_m1: number | null;
  traffic_band: string;
  traffic_volatility: string | null;
  m1_to_median_growth_pct: number | null;
  numero_productos: number;
  category: string | null;
  categoria_api_raw: string | null;
  rank_global: number | null;
  tasa_rebote: number | null;
  paginas_por_sesion: number | null;
  duracion_visita_minutos: number | null;
  last_plan_shopify: string | null;
  created: string | null;
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

const VOLATILITY_LABEL: Record<string, string> = {
  stable:   "Estable",
  moderate: "Moderada",
  volatile: "Volátil",
  unknown:  "—",
};

export function StoreOverview({
  mediana_visitas_mensuales,
  promedio_visitas_mensuales,
  visitas_totales_mensuales,
  visits_m1,
  traffic_band,
  traffic_volatility,
  m1_to_median_growth_pct,
  numero_productos,
  category,
  categoria_api_raw,
  rank_global,
  tasa_rebote,
  paginas_por_sesion,
  duracion_visita_minutos,
  last_plan_shopify,
  created,
}: StoreOverviewProps) {
  const growthDisplay = m1_to_median_growth_pct !== null
    ? `${m1_to_median_growth_pct > 0 ? "+" : ""}${m1_to_median_growth_pct}%`
    : "—";

  const growthHighlight = m1_to_median_growth_pct === null ? "neutral"
    : m1_to_median_growth_pct >= 30 ? "positive"
    : m1_to_median_growth_pct < 0 ? "negative"
    : "neutral";

  const volatilityHighlight = traffic_volatility === "stable" ? "positive"
    : traffic_volatility === "volatile" ? "negative"
    : "neutral";

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h2 className="text-lg font-semibold">Resumen de la Tienda</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard label="Visitas Mensuales (Mediana)" value={fmt(mediana_visitas_mensuales)} mono />
        <MetricCard label="Banda de Tráfico" value={traffic_band} mono />
        <MetricCard label="Crecimiento M1 vs Mediana" value={growthDisplay} mono highlight={growthHighlight} />
        <MetricCard label="Visitas Último Mes" value={visits_m1 !== null ? fmt(visits_m1) : "—"} mono />
        <MetricCard label="Visitas Prom. Mensuales" value={fmt(promedio_visitas_mensuales)} mono />
        <MetricCard
          label="Volatilidad Tráfico"
          value={traffic_volatility ? (VOLATILITY_LABEL[traffic_volatility] ?? traffic_volatility) : "—"}
          mono
          highlight={volatilityHighlight}
        />
        <MetricCard label="Visitas Totales (3m)" value={visitas_totales_mensuales !== null ? fmt(visitas_totales_mensuales) : "—"} mono />
        <MetricCard label="Productos" value={fmt(numero_productos)} mono />
        <MetricCard label="Categoría" value={category ?? "—"} />
        {categoria_api_raw && <MetricCard label="Categoría Raw" value={categoria_api_raw} />}
        {rank_global ? <MetricCard label="Ranking Global" value={`#${fmt(rank_global)}`} mono /> : null}
        {created && <MetricCard label="Creada" value={created.slice(0, 10)} mono />}
        {last_plan_shopify && <MetricCard label="Plan Shopify" value={last_plan_shopify} mono />}
      </div>

      {/* Engagement row */}
      {(tasa_rebote !== null || paginas_por_sesion !== null || duracion_visita_minutos !== null) && (
        <>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pt-2">Engagement</h3>
          <div className="grid grid-cols-3 gap-3">
            {tasa_rebote !== null && (
              <MetricCard label="Tasa de Rebote" value={`${tasa_rebote}%`} mono
                highlight={tasa_rebote < 30 ? "positive" : tasa_rebote > 60 ? "negative" : "neutral"} />
            )}
            {paginas_por_sesion !== null && (
              <MetricCard label="Páginas / Sesión" value={paginas_por_sesion.toFixed(2)} mono />
            )}
            {duracion_visita_minutos !== null && (
              <MetricCard label="Duración Visita (min)" value={duracion_visita_minutos.toFixed(2)} mono />
            )}
          </div>
        </>
      )}
    </section>
  );
}
