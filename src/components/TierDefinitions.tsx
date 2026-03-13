export function TierDefinitions() {
  const tiers = [
    { label: "HOT",  color: "bg-tier-hot",  threshold: "≥ 7 pts", description: "High qualification — prioritize contact" },
    { label: "WARM", color: "bg-tier-warm", threshold: "4–6 pts", description: "Medium qualification — worth pursuing" },
    { label: "COLD", color: "bg-tier-cold", threshold: "< 4 pts", description: "Low qualification — deprioritize" },
  ];

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "500ms" }}>
      <h2 className="text-lg font-semibold">Tier Definitions</h2>
      <div className="bg-card border border-border rounded-lg p-5">
        <div className="grid grid-cols-3 gap-4">
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
