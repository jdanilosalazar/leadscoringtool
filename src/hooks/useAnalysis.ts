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
      const response = await fetch(
        `https://n8n.jdanilosalazar.lat/webhook/0eeb2579-6cc3-4c27-80d1-1f5a2b23eb75?${params}`
      );
      if (!response.ok) throw new Error(`El análisis falló (estado ${response.status})`);

      const text = await response.text();
      if (!text.trim()) throw new Error("El webhook devolvió una respuesta vacía.");

      let raw: any;
      try { raw = JSON.parse(text); }
      catch { throw new Error("El webhook no devolvió un JSON válido."); }

      const unwrapped = Array.isArray(raw) ? raw[0] : raw;
      const s = unwrapped?.data ?? unwrapped;

      const data: LeadScoreResult = {
        domain:             s.domain ?? "",
        url:                s.URL ?? s.url ?? url,
        merchant_name:      s.merchant_name ?? null,
        sitio_descripcion:  s.sitio_descripcion ?? null,
        pais_codigo:        s.pais_codigo ?? null,

        points:                  s.points ?? 0,
        tier:                    s.tier ?? "Cold",
        icp_fit:                 s.icp_fit ?? "unknown",
        signals_llm_readable:    s.signals_llm_readable ?? "",
        signals:                 s.signals ?? "",

        promedio_visitas_mensuales: s.promedio_visitas_mensuales ?? 0,
        visitas_totales_mensuales:  s.visitas_totales_mensuales ?? null,
        visitas_ultimo_mes:         s.visitas_ultimo_mes ?? null,
        traffic_band:               s.traffic_band ?? "—",
        m1_to_m3_growth_pct:        s.m1_to_m3_growth_pct ?? null,

        tasa_rebote:             s.tasa_rebote ?? null,
        paginas_por_sesion:      s.paginas_por_sesion ?? null,
        duracion_visita_minutos: s.duracion_visita_minutos ?? null,

        trafico_direct:        s.trafico_direct ?? 0,
        trafico_search:        s.trafico_search ?? 0,
        trafico_referrals:     s.trafico_referrals ?? 0,
        trafico_paid_referrals: s.trafico_paid_referrals ?? 0,
        trafico_social:        s.trafico_social ?? 0,
        trafico_mail:          s.trafico_mail ?? 0,

        cms_name:             s.cms_name ?? null,
        cms_confianza:        s.cms_confianza ?? null,
        cms_source:           s.cms_source ?? null,
        email_mktg_tool:      s.email_mktg_tool ?? null,
        email_tool_grupo:     s.email_tool_grupo ?? 0,
        email_tool_confianza: s.email_tool_confianza ?? 0,
        email_tools_all:      s.email_tools_all ?? null,
        installed_apps_names: s.installed_apps_names ?? null,

        categoria:          s.categoria ?? null,
        categoria_original: s.categoria_original ?? null,
        numero_productos:   s.numero_productos ?? 0,
        numero_empleados:   s.numero_empleados ?? null,
        rank_global:        s.rank_global ?? null,

        fecha_metricas:   s.fecha_metricas ?? null,
        fecha_ultimo_mes: s.fecha_ultimo_mes ?? null,
        fecha_calculo:    s.fecha_calculo ?? new Date().toISOString(),
        version_scoring:  s.version_scoring ?? "—",
        data_source:      s.data_source ?? null,
        revision_manual:  s.revision_manual ?? null,
      };

      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Analysis failed. Please try again.",
      });
    }
  }, []);

  const reset = useCallback(() => setState({ status: "idle" }), []);
  return { state, analyze, reset };
}
