interface SignalsBreakdownProps {
  signals_llm_readable: string;
  points: number;
}

export function SignalsBreakdown({ signals_llm_readable, points }: SignalsBreakdownProps) {
  const lines = signals_llm_readable
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  if (!lines.length) return null;

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Señales de contacto</h2>
        <span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-0.5">
          {points} pts
        </span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => {
          const text = line.replace(/^\d+\.\s*/, "");
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
              <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0 w-5">
                {i + 1}.
              </span>
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
