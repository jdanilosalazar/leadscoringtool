interface RevenueOverviewProps {
  estimated_annual: string;
  monthly_visits: number;
  total_visits_3m: number;
  product_count: number;
  country: string;
  category: string;
}

function MetricCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-semibold ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function RevenueOverview({
  estimated_annual,
  monthly_visits,
  total_visits_3m,
  product_count,
  country,
  category,
}: RevenueOverviewProps) {
  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <h2 className="text-lg font-semibold">Revenue & Scale</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard label="Est. Annual Revenue" value={estimated_annual} mono />
        <MetricCard label="Monthly Visits" value={formatNumber(monthly_visits)} mono />
        <MetricCard label="Total Visits (3mo)" value={formatNumber(total_visits_3m)} mono />
        <MetricCard label="Products" value={formatNumber(product_count)} mono />
        <MetricCard label="Country" value={country} />
        <MetricCard label="Category" value={category} />
      </div>
    </section>
  );
}
