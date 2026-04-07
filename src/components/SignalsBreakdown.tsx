interface SignalsBreakdownProps {
  fortalezas: (string | null)[];
  oportunidades: (string | null)[];
  riesgos: (string | null)[];
  points: number;
}

function SignalList({ items, icon, colorClass }: {
  items: string[];
  icon: string;
  colorClass: string;
}) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      {items.map((text, i) => (
        <div key={i} className={`bg-card border rounded-lg p-4 flex gap-3 ${colorClass}`}>
          <span className="shrink-0 mt-0.5">{icon}</span>
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}

export function SignalsBreakdown({ fortalezas, oportunidades, riesgos, points }: SignalsBreakdownProps) {
  const activeFortalezas  = fortalezas.filter(Boolean) as string[];
  const activeOportunidades = oportunidades.filter(Boolean) as string[];
  const activeRiesgos     = riesgos.filter(Boolean) as string[];

  const hasAny = activeFortalezas.length || activeOportunidades.length || activeRiesgos.length;
  if (!hasAny) return null;

  return (
    <section className="space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Análisis de Señales</h2>
        <span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
          {points} pts
        </span>
      </div>

      {activeFortalezas.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
            Fortalezas ({activeFortalezas.length})
          </h3>
          <SignalList
            items={activeFortalezas}
            icon="✓"
            colorClass="border-emerald-500/20 text-foreground"
          />
        </div>
      )}

      {activeOportunidades.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Oportunidades ({activeOportunidades.length})
          </h3>
          <SignalList
            items={activeOportunidades}
            icon="→"
            colorClass="border-blue-500/20 text-foreground"
          />
        </div>
      )}

      {activeRiesgos.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider">
            Riesgos ({activeRiesgos.length})
          </h3>
          <SignalList
            items={activeRiesgos}
            icon="✕"
            colorClass="border-red-500/20 text-foreground"
          />
        </div>
      )}
    </section>
  );
}
