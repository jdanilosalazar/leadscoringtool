export type Tier = "Caliente" | "Tibio" | "Frío" | "Congelado" | "DESCARTADO";
export type ICPFit = "ICP Core" | "ICP Secondary" | "ICP Weak" | "Desconocido";

export interface LeadScoreResult {
  domain: string;
  URL: string;
  merchant_name: string | null;
  sitio_title: string | null;
  pais_codigo: string | null;

  points: number;
  tier: Tier;
  icp_fit: ICPFit;

  category: string | null;
  categoria_api_raw: string | null;
  categoria_requiere_revision: boolean;

  visitas_ponderadas: number;
  promedio_visitas_mensuales: number;
  visitas_totales_mensuales: number | null;
  visits_m1: number | null;
  visits_m2: number | null;
  visits_m3: number | null;
  fecha_visits_m1: string | null;
  fecha_visits_m2: string | null;
  fecha_visits_m3: string | null;
  traffic_band: string;
  traffic_volatility: string | null;
  traffic_trend: string | null;
  m1_vs_m2_pct: number | null;
  m1_vs_m3_pct: number | null;

  tasa_rebote: number | null;
  paginas_por_sesion: number | null;
  duracion_visita_segundos: number | null;
  duracion_visita_minutos: number | null;

  trafico_direct: number;
  trafico_search: number;
  trafico_referrals: number;
  trafico_paid_referrals: number;
  trafico_social: number;
  trafico_mail: number;
  traffic_source: string | null;

  cms_name: string | null;
  cms_confianza: number | null;
  cms_source: string | null;
  email_mktg_tool: string | null;
  email_tool_grupo: number;
  fuente_herramienta_email: string | null;
  email_data_confidence: string;
  email_tools_all: string | null;
  email_tools_installed_at: string | null;

  numero_productos: number;
  rank_global: number | null;
  fecha_creacion_tienda: string | null;
  store_age_band: string | null;
  last_plan_shopify: string | null;
  last_plan_change_at: string | null;

  fortaleza_1: string | null;
  fortaleza_2: string | null;
  fortaleza_3: string | null;
  fortaleza_4: string | null;
  fortaleza_5: string | null;
  fortaleza_6: string | null;
  fortaleza_7: string | null;
  fortaleza_8: string | null;
  fortaleza_9: string | null;
  fortaleza_10: string | null;

  oportunidad_1: string | null;
  oportunidad_2: string | null;
  oportunidad_3: string | null;

  riesgo_1: string | null;
  riesgo_2: string | null;
  riesgo_3: string | null;
  riesgo_4: string | null;
  riesgo_5: string | null;

  contact_email_1: string | null;
  contact_email_2: string | null;
  contact_email_3: string | null;
  contact_phone_1: string | null;
  contact_phone_2: string | null;
  contact_linkedin: string | null;
  contact_instagram: string | null;
  contact_whatsapp: string | null;

  fecha_metricas_trafico: string | null;
  fecha_metricas_tienda: string | null;
  fecha_ultimo_mes: string | null;
  fecha_calculo: string;
  version_scoring: string;
  data_source: string | null;
  revision_manual: string | null;
}
