export function TierDefinitions() {
  const tiers = [
    { label: "CALIENTE", color: "bg-tier-hot",  threshold: "≥ 20 pts", description: "Alta calificación — priorizar contacto" },
    { label: "TIBIO",     color: "bg-tier-warm",        threshold: "≥ 16 pts", description: "Calificación media — vale la pena seguir" },
    { label: "FRÍO",      color: "bg-tier-cold",        threshold: "≥ 10 pts", description: "Calificación baja — evaluar con cautela" },
    { label: "CONGELADO", color: "bg-muted-foreground", threshold: "< 10 pts", description: "Muy baja calificación — despriorizar" },
  ];

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
      <h2 className="text-lg font-semibold">Definiciones de Nivel</h2>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiers.map((t) => (
            <div key={t.label} className="text-center space-y-2">
              <div className={`h-2 rounded-full ${t.color}`} />
              <p className="font-mono text-sm font-semibold">{t.label}</p>
              <p className="font-mono text-xs text-primary">{t.threshold}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
