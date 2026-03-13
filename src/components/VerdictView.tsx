import { LeadScoreResult } from "@/types/lead-score";
import { Download } from "lucide-react";
import { ScoreHero } from "@/components/ScoreHero";
import { StoreOverview } from "@/components/StoreOverview";
import { SignalsBreakdown } from "@/components/SignalsBreakdown";
import { InfrastructureSection } from "@/components/InfrastructureSection";
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

        <ScoreHero
          points={data.points}
          tier={data.tier}
          icp_fit={data.icp_fit}
          url={data.url}
          merchant_name={data.merchant_name}
          sitio_descripcion={data.sitio_descripcion}
          fecha_calculo={data.fecha_calculo}
          pais_codigo={data.pais_codigo}
        />

        <StoreOverview
          promedio_visitas_mensuales={data.promedio_visitas_mensuales}
          visitas_totales_mensuales={data.visitas_totales_mensuales}
          visitas_ultimo_mes={data.visitas_ultimo_mes}
          traffic_band={data.traffic_band}
          m1_to_m3_growth_pct={data.m1_to_m3_growth_pct}
          numero_productos={data.numero_productos}
          categoria={data.categoria}
          categoria_original={data.categoria_original}
          rank_global={data.rank_global}
          tasa_rebote={data.tasa_rebote}
          paginas_por_sesion={data.paginas_por_sesion}
          duracion_visita_minutos={data.duracion_visita_minutos}
        />

        <SignalsBreakdown
          signals_llm_readable={data.signals_llm_readable}
          points={data.points}
        />

        <InfrastructureSection
          cms_name={data.cms_name}
          cms_confianza={data.cms_confianza}
          cms_source={data.cms_source}
          email_mktg_tool={data.email_mktg_tool}
          email_tool_grupo={data.email_tool_grupo}
          email_tool_confianza={data.email_tool_confianza}
          email_tools_all={data.email_tools_all}
          installed_apps_names={data.installed_apps_names}
          version_scoring={data.version_scoring}
          fecha_metricas={data.fecha_metricas}
          data_source={data.data_source}
        />

        <TrafficComposition
          trafico_direct={data.trafico_direct}
          trafico_search={data.trafico_search}
          trafico_referrals={data.trafico_referrals}
          trafico_paid_referrals={data.trafico_paid_referrals}
          trafico_social={data.trafico_social}
          trafico_mail={data.trafico_mail}
        />

        <TierDefinitions />

        <footer className="pt-8 pb-16 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Probance Lead Scoring v{data.version_scoring} — Internal Use Only
          </p>
        </footer>
      </div>
    </div>
  );
}
