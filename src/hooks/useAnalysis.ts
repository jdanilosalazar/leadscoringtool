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
      
      let data: LeadScoreResult;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid JSON from webhook:", text.substring(0, 200));
        throw new Error("Webhook did not return valid JSON. Check n8n workflow output.");
      }

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
