interface TrafficCompositionProps {
  breakdown: {
    direct: number;
    search: number;
    referrals: number;
    paid_referrals: number;
    social: number;
    email: number;
  };
}

const LABELS: Record<string, string> = {
  direct: "Direct",
  search: "Search",
  referrals: "Referrals",
  paid_referrals: "Paid Referrals",
  social: "Social",
  email: "Email",
};

export function TrafficComposition({ breakdown }: TrafficCompositionProps) {
  const max = Math.max(...Object.values(breakdown));

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <h2 className="text-lg font-semibold">Traffic Composition</h2>
      <div className="bg-card border border-border rounded-lg p-5 space-y-3">
        {Object.entries(breakdown).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{LABELS[key]}</span>
              <span className="font-mono font-medium">{value}%</span>
            </div>
            <div className="h-2 bg-border rounded-sm overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-all duration-500"
                style={{ width: `${(value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
