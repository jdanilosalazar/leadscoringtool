import { useState } from "react";
import { useAnalysis } from "@/hooks/useAnalysis";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import { VerdictView } from "@/components/VerdictView";

const Index = () => {
  const [url, setUrl] = useState("");
  const { state, analyze, reset } = useAnalysis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    analyze(url.trim());
  };

  if (state.status === "loading") {
    return <AnalysisLoading />;
  }

  if (state.status === "success") {
    return (
      <VerdictView
        data={state.data}
        onReset={() => {
          reset();
          setUrl("");
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-10 text-center">
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Probance Lead Scoring
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ejecutar Lead Score.
          </h1>
          <p className="text-muted-foreground text-lg">
            Calificación estructurada de ecommerce en segundos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.ejemplo.com"
            required
            className="w-full bg-card border border-border rounded-lg px-5 py-4 text-base font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
          />
          <button
            type="submit"
            disabled={!url.trim()}
            className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg text-base hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            Analizar Sitio Web
          </button>
        </form>

        {state.status === "error" && (
          <p className="text-destructive text-sm font-mono">{state.message}</p>
        )}

        <p className="text-xs text-muted-foreground">Solo para uso interno.</p>
      </div>
    </div>
  );
};

export default Index;
