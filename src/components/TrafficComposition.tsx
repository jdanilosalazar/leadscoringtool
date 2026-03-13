interface TrafficCompositionProps {
  trafico_direct: number;
  trafico_search: number;
  trafico_referrals: number;
  trafico_paid_referrals: number;
  trafico_social: number;
  trafico_mail: number;
}

const LABELS: Record<string, string> = {
  trafico_direct:        "Directo",
  trafico_search:        "Búsqueda",
  trafico_referrals:     "Referencias",
  trafico_paid_referrals:"Referencias Pagadas",
  trafico_social:        "Social",
  trafico_mail:          "Email",
};

export function TrafficComposition(props: TrafficCompositionProps) {
  const entries = Object.entries(props) as [string, number][];
  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h2 className="text-lg font-semibold">Composición de Tráfico</h2>
      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        {entries
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
