interface ScoringJustificationsProps {
  justifications: {
    sector: string;
    traffic: string;
    email_tool: string;
    cms: string;
    engagement: string;
  };
}

const LABELS: Record<string, string> = {
  sector: "Justificación (Sector)",
  traffic: "Justificación (Trafico)",
  email_tool: "Justificación (Email mktg tool)",
  cms: "Justificación (CMS)",
  engagement: "Justificación (Engagement)",
};

export function ScoringJustifications({ justifications }: ScoringJustificationsProps) {
  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <h2 className="text-lg font-semibold">Scoring Rule Justifications</h2>
      <div className="space-y-3">
        {Object.entries(justifications).map(([key, value]) => (
          <div key={key} className="bg-card border border-border rounded-lg p-4 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {LABELS[key] || key}
            </p>
            <p className="text-sm leading-relaxed">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
