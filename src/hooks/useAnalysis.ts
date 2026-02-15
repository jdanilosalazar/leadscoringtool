import { useState, useCallback } from "react";
import { LeadScoreResult } from "@/types/lead-score";

type AnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: LeadScoreResult }
  | { status: "error"; message: string };

export function useAnalysis() {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });

  const analyze = useCallback(async (url: string) => {
    setState({ status: "loading" });

    try {
      const params = new URLSearchParams({ url });
      const response = await fetch(`https://n8n.jdanilosalazar.lat/webhook-test/0eeb2579-6cc3-4c27-80d1-1f5a2b23eb75?${params}`);
      if (!response.ok) throw new Error(`Analysis failed (status ${response.status})`);
      
      const text = await response.text();
      console.log("Webhook raw response:", text.substring(0, 500));
      
      if (!text.trim()) throw new Error("Webhook returned an empty response. Make sure the n8n workflow is active and returns JSON.");
      
      let raw: any;
      try {
        raw = JSON.parse(text);
      } catch {
        console.error("Invalid JSON from webhook:", text.substring(0, 200));
        throw new Error("Webhook did not return valid JSON. Check n8n workflow output.");
      }

      // The webhook may return { status, data: {...} } or a flat object
      const src = raw?.data ?? raw;

      const data: LeadScoreResult = {
        score: src.score ?? 0,
        tier: src.tier ?? "COLD",
        url: src.url ?? url,
        date: src.date ?? new Date().toISOString().slice(0, 10),
        revenue: {
          estimated_annual: src.revenue?.estimated_annual ?? src.estimated_annual ?? "N/A",
          currency: src.revenue?.currency ?? src.currency ?? "EUR",
        },
        traffic: {
          monthly_visits: src.traffic?.monthly_visits ?? (typeof src.traffic === "number" ? src.traffic : 0),
          total_visits_3m: src.traffic?.total_visits_3m ?? (typeof src.traffic === "number" ? src.traffic * 3 : 0),
          country: src.traffic?.country ?? src.country ?? "Unknown",
          category: src.traffic?.category ?? src.sector ?? src.category ?? "Unknown",
        },
        products: {
          count: src.products?.count ?? src.product_count ?? 0,
        },
        infrastructure: {
          cms: src.infrastructure?.cms ?? src.cms ?? "Unknown",
          cms_confidence: src.infrastructure?.cms_confidence ?? src.cms_confidence ?? 0,
          email_tool: src.infrastructure?.email_tool ?? src.email_tool ?? "Unknown",
          email_tool_confidence: src.infrastructure?.email_tool_confidence ?? src.email_tool_confidence ?? 0,
          scoring_version: src.infrastructure?.scoring_version ?? src.scoring_version ?? "N/A",
          metrics_date: src.infrastructure?.metrics_date ?? src.metrics_date ?? "N/A",
        },
        traffic_breakdown: src.traffic_breakdown ?? {
          direct: 0, search: 0, referrals: 0, paid_referrals: 0, social: 0, email: 0,
        },
        justifications: src.justifications ?? {
          sector: src.resumen || "No data available.",
          traffic: src.estrategia || "No data available.",
          email_tool: "",
          cms: "",
          engagement: "",
        },
      };

      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Analysis failed. Please try again.",
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: "idle" });
  }, []);

  return { state, analyze, reset };
}
