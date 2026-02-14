interface InfrastructureSectionProps {
  cms: string;
  cms_confidence: number;
  email_tool: string;
  email_tool_confidence: number;
  scoring_version: string;
  metrics_date: string;
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono text-sm font-medium">{value}</span>
    </div>
  );
}

export function InfrastructureSection({
  cms,
  cms_confidence,
  email_tool,
  email_tool_confidence,
  scoring_version,
  metrics_date,
}: InfrastructureSectionProps) {
  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h2 className="text-lg font-semibold">Infrastructure & Stack Detection</h2>
      <div className="bg-card border border-border rounded-lg px-5">
        <DataRow label="CMS" value={`${cms} — ${cms_confidence}%`} />
        <DataRow label="Email Marketing Tool" value={email_tool_confidence > 0 ? `${email_tool} — ${email_tool_confidence}%` : "Not detected"} />
        <DataRow label="Scoring Version" value={scoring_version} />
        <DataRow label="Metrics Date" value={metrics_date} />
      </div>
    </section>
  );
}
