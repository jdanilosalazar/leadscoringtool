import { useState, useCallback } from "react";
import { LeadScoreResult, MOCK_RESULT } from "@/types/lead-score";

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
      // TODO: Replace with actual API call to /api/analyze
      // const response = await fetch("/api/analyze", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ url }),
      // });
      // if (!response.ok) throw new Error("Analysis failed");
      // const data = await response.json();

      // Simulate API delay with mock data
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const data: LeadScoreResult = { ...MOCK_RESULT, url, date: new Date().toISOString().split("T")[0] };

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
