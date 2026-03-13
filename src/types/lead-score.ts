export type Tier = "Hot" | "Warm" | "Cold" | "DISCARDED";
export type ICPFit = "ICP Core" | "ICP Secondary" | "ICP Weak" | "unknown";

export interface LeadScoreResult {
  domain: string;
  url: string;
  merchant_name: string | null;
  sitio_descripcion: string | null;
  pais_codigo: string | null;

  points: number;
  tier: Tier;
  icp_fit: ICPFit;
  signals_llm_readable: string;
  signals: string;

  promedio_visitas_mensuales: number;
  visitas_totales_mensuales: number | null;
  visitas_ultimo_mes: number | null;
  traffic_band: string;
  m1_to_m3_growth_pct: number | null;

  tasa_rebote: number | null;
  paginas_por_sesion: number | null;
  duracion_visita_minutos: number | null;

  trafico_direct: number;
  trafico_search: number;
  trafico_referrals: number;
  trafico_paid_referrals: number;
  trafico_social: number;
  trafico_mail: number;

  cms_name: string | null;
  cms_confianza: number | null;
  cms_source: string | null;
  email_mktg_tool: string | null;
  email_tool_grupo: number;
  email_tool_confianza: number;
  email_tools_all: string | null;
  installed_apps_names: string | null;

  categoria: string | null;
  categoria_original: string | null;
  numero_productos: number;
  numero_empleados: number | null;
  rank_global: number | null;

  fecha_metricas: string | null;
  fecha_ultimo_mes: string | null;
  fecha_calculo: string;
  version_scoring: string;
  data_source: string | null;
  revision_manual: string | null;
}
