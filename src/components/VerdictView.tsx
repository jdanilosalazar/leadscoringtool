import { LeadScoreResult } from "@/types/lead-score";
import { Download } from "lucide-react";
import { ScoreHero } from "@/components/ScoreHero";
import { StoreOverview } from "@/components/StoreOverview";
import { SignalsBreakdown } from "@/components/SignalsBreakdown";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { TrafficComposition } from "@/components/TrafficComposition";
import { ContactSection } from "@/components/ContactSection";
import { TierDefinitions } from "@/components/TierDefinitions";
import { HowItWorks } from "@/components/HowItWorks";

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
          <div className="flex items-center gap-4 print-hidden">
            <button
              onClick={() => window.print()}
              className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              Descargar PDF
            </button>
            <button
              onClick={onReset}
              className="text-sm text-primary hover:underline font-medium transition-colors"
            >
              Nuevo Análisis
            </button>
          </div>
        </header>

        <ScoreHero
          points={data.points}
          tier={data.tier}
          icp_fit={data.icp_fit}
          url={data.URL}
          merchant_name={data.merchant_name}
          sitio_title={data.sitio_title}
          fecha_calculo={data.fecha_calculo}
          pais_codigo={data.pais_codigo}
          revision_manual={data.revision_manual}
        />

        <StoreOverview
          visitas_ponderadas={data.visitas_ponderadas}
          promedio_visitas_mensuales={data.promedio_visitas_mensuales}
          visitas_totales_mensuales={data.visitas_totales_mensuales}
          visits_m1={data.visits_m1}
          visits_m2={data.visits_m2}
          visits_m3={data.visits_m3}
          fecha_visits_m1={data.fecha_visits_m1}
          fecha_visits_m2={data.fecha_visits_m2}
          fecha_visits_m3={data.fecha_visits_m3}
          traffic_band={data.traffic_band}
          traffic_volatility={data.traffic_volatility}
          traffic_trend={data.traffic_trend}
          m1_vs_m2_pct={data.m1_vs_m2_pct}
          m1_vs_m3_pct={data.m1_vs_m3_pct}
          numero_productos={data.numero_productos}
          category={data.category}
          categoria_api_raw={data.categoria_api_raw}
          rank_global={data.rank_global}
          tasa_rebote={data.tasa_rebote}
          paginas_por_sesion={data.paginas_por_sesion}
          duracion_visita_minutos={data.duracion_visita_minutos}
          last_plan_shopify={data.last_plan_shopify}
          fecha_creacion_tienda={data.fecha_creacion_tienda}
          store_age_band={data.store_age_band}
        />

        <SignalsBreakdown
          fortalezas={[
            data.fortaleza_1, data.fortaleza_2, data.fortaleza_3, data.fortaleza_4,
            data.fortaleza_5, data.fortaleza_6, data.fortaleza_7, data.fortaleza_8,
            data.fortaleza_9, data.fortaleza_10,
          ]}
          oportunidades={[data.oportunidad_1, data.oportunidad_2, data.oportunidad_3]}
          riesgos={[
            data.riesgo_1, data.riesgo_2, data.riesgo_3, data.riesgo_4, data.riesgo_5,
          ]}
          points={data.points}
        />

        <InfrastructureSection
          cms_name={data.cms_name}
          cms_confianza={data.cms_confianza}
          cms_source={data.cms_source}
          email_mktg_tool={data.email_mktg_tool}
          email_tool_grupo={data.email_tool_grupo}
          fuente_herramienta_email={data.fuente_herramienta_email}
          email_data_confidence={data.email_data_confidence}
          email_tools_all={data.email_tools_all}
          email_tools_installed_at={data.email_tools_installed_at}
          version_scoring={data.version_scoring}
          fecha_metricas_trafico={data.fecha_metricas_trafico}
          fecha_metricas_tienda={data.fecha_metricas_tienda}
          data_source={data.data_source}
        />

        <TrafficComposition
          trafico_direct={data.trafico_direct}
          trafico_search={data.trafico_search}
          trafico_referrals={data.trafico_referrals}
          trafico_paid_referrals={data.trafico_paid_referrals}
          trafico_social={data.trafico_social}
          trafico_mail={data.trafico_mail}
          traffic_volatility={data.traffic_volatility}
          m1_vs_m3_pct={data.m1_vs_m3_pct}
        />

        <ContactSection
          contact_email_1={data.contact_email_1}
          contact_email_2={data.contact_email_2}
          contact_email_3={data.contact_email_3}
          contact_phone_1={data.contact_phone_1}
          contact_phone_2={data.contact_phone_2}
          contact_linkedin={data.contact_linkedin}
          contact_instagram={data.contact_instagram}
          contact_whatsapp={data.contact_whatsapp}
        />

        <TierDefinitions />

        <HowItWorks />

        <footer className="pt-8 pb-16 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Probance Lead Scoring v{data.version_scoring} — Solo para uso interno
          </p>
        </footer>
      </div>
    </div>
  );
}
