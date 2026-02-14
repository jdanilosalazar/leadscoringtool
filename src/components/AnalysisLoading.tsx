import { useState, useEffect } from "react";

const MESSAGES = [
  "Collecting traffic metrics…",
  "Detecting ecommerce infrastructure…",
  "Evaluating scoring rules…",
  "Finalizing classification…",
];

export function AnalysisLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">{MESSAGES[index]}</p>
          <div className="flex justify-center gap-1.5 pt-4">
            {MESSAGES.map((_, i) => (
              <div
                key={i}
                className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                  i <= index ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
