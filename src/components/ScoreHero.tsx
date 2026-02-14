import { useEffect, useState } from "react";
import { Tier } from "@/types/lead-score";

function useTierColor(tier: Tier) {
  switch (tier) {
    case "HOT": return "text-tier-hot";
    case "WARM": return "text-tier-warm";
    case "COLD": return "text-tier-cold";
  }
}

function useTierBg(tier: Tier) {
  switch (tier) {
    case "HOT": return "bg-tier-hot/15 text-tier-hot border-tier-hot/30";
    case "WARM": return "bg-tier-warm/15 text-tier-warm border-tier-warm/30";
    case "COLD": return "bg-tier-cold/15 text-tier-cold border-tier-cold/30";
  }
}

interface ScoreHeroProps {
  score: number;
  tier: Tier;
  url: string;
  date: string;
}

export function ScoreHero({ score, tier, url, date }: ScoreHeroProps) {
  const [displayed, setDisplayed] = useState(0);
  const tierColor = useTierColor(tier);
  const tierBg = useTierBg(tier);

  useEffect(() => {
    const duration = 800;
    const steps = 40;
    const increment = score / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayed(score);
        clearInterval(interval);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [score]);

  return (
    <section className="text-center space-y-6 py-16">
      <div className="space-y-4">
        <div className={`text-8xl font-bold tracking-tight font-mono ${tierColor}`}>
          {displayed}
        </div>
        <div className={`inline-flex items-center px-4 py-1.5 rounded-md border text-sm font-semibold font-mono ${tierBg}`}>
          {tier}
        </div>
      </div>
      <div className="space-y-1">
        <p className="font-mono text-sm text-muted-foreground">{url}</p>
        <p className="font-mono text-xs text-muted-foreground">{date}</p>
      </div>
      <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
        Score calculated using internal qualification rules across traffic, infrastructure, engagement, and stack detection.
      </p>
    </section>
  );
}
