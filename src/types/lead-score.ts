export type Tier = "HOT" | "WARM" | "COLD";

export interface LeadScoreResult {
  score: number;
  tier: Tier;
  url: string;
  date: string;
  revenue: {
    estimated_annual: string;
    currency: string;
  };
  traffic: {
    monthly_visits: number;
    total_visits_3m: number;
    country: string;
    category: string;
  };
  products: {
    count: number;
  };
  infrastructure: {
    cms: string;
    cms_confidence: number;
    email_tool: string;
    email_tool_confidence: number;
    scoring_version: string;
    metrics_date: string;
  };
  traffic_breakdown: {
    direct: number;
    search: number;
    referrals: number;
    paid_referrals: number;
    social: number;
    email: number;
  };
  justifications: {
    sector: string;
    traffic: string;
    email_tool: string;
    cms: string;
    engagement: string;
  };
}

export const MOCK_RESULT: LeadScoreResult = {
  score: 84,
  tier: "HOT",
  url: "https://www.example-ecommerce.com",
  date: "2026-02-14",
  revenue: {
    estimated_annual: "€12,400,000",
    currency: "EUR",
  },
  traffic: {
    monthly_visits: 1_240_000,
    total_visits_3m: 3_720_000,
    country: "France",
    category: "Fashion & Apparel",
  },
  products: {
    count: 4_832,
  },
  infrastructure: {
    cms: "Shopify",
    cms_confidence: 94,
    email_tool: "Klaviyo",
    email_tool_confidence: 87,
    scoring_version: "v2.4.1",
    metrics_date: "2026-02",
  },
  traffic_breakdown: {
    direct: 32.4,
    search: 41.2,
    referrals: 8.1,
    paid_referrals: 10.5,
    social: 5.3,
    email: 2.5,
  },
  justifications: {
    sector: "Fashion & Apparel is a high-value vertical for marketing automation with strong repeat purchase behavior.",
    traffic: "Monthly traffic exceeds 1M visits, indicating significant scale and acquisition maturity.",
    email_tool: "Klaviyo detected with 87% confidence. Current tool is a direct competitor — high switching potential.",
    cms: "Shopify detected with 94% confidence. Native integration available, reducing onboarding friction.",
    engagement: "Traffic composition shows healthy organic mix with 41.2% search traffic, suggesting strong content and SEO investment.",
  },
};
