export function TierDefinitions() {
  const tiers = [
    { label: "HOT", color: "bg-tier-hot", description: "High qualification score" },
    { label: "WARM", color: "bg-tier-warm", description: "Medium qualification score" },
    { label: "COLD", color: "bg-tier-cold", description: "Low qualification score" },
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
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
