import { LeadScoreResult } from "@/types/lead-score";
import { ScoreHero } from "@/components/ScoreHero";
import { RevenueOverview } from "@/components/RevenueOverview";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { ScoringJustifications } from "@/components/ScoringJustifications";
import { TrafficComposition } from "@/components/TrafficComposition";
import { TierDefinitions } from "@/components/TierDefinitions";

interface VerdictViewProps {
  data: LeadScoreResult;
  onReset: () => void;
}

export function VerdictView({ data, onReset }: VerdictViewProps) {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">
            Probance Lead Scoring
          </h1>
          <button
            onClick={onReset}
            className="text-sm text-primary hover:underline font-medium transition-colors"
          >
            New Analysis
          </button>
        </header>

        <ScoreHero score={data.score} tier={data.tier} url={data.url} date={data.date} />

        <RevenueOverview
          estimated_annual={data.revenue.estimated_annual}
          monthly_visits={data.traffic.monthly_visits}
          total_visits_3m={data.traffic.total_visits_3m}
          product_count={data.products.count}
          country={data.traffic.country}
          category={data.traffic.category}
        />

        <InfrastructureSection
          cms={data.infrastructure.cms}
          cms_confidence={data.infrastructure.cms_confidence}
          email_tool={data.infrastructure.email_tool}
          email_tool_confidence={data.infrastructure.email_tool_confidence}
          scoring_version={data.infrastructure.scoring_version}
          metrics_date={data.infrastructure.metrics_date}
        />

        <ScoringJustifications justifications={data.justifications} />

        <TrafficComposition breakdown={data.traffic_breakdown} />

        <TierDefinitions />

        <footer className="pt-8 pb-16 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Probance Lead Scoring — Internal Use Only
          </p>
        </footer>
      </div>
    </div>
  );
}
