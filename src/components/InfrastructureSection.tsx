const EMAIL_GROUP_LABEL: Record<number, string> = {
  0: "No detectado",
  1: "Envío simple (Shopify Email / Sendgrid)",
  2: "Herramienta básica (Mailerlite / Mailjet)",
  3: "Herramienta completa (Mailchimp / Brevo / Omnisend)",
  4: "Herramienta avanzada (Klaviyo / Connectif)",
  5: "CRM con email (HubSpot / Salesforce)",
};

interface InfrastructureSectionProps {
  cms_name: string | null;
  cms_confianza: number | null;
  cms_source: string | null;
  email_mktg_tool: string | null;
  email_tool_grupo: number;
  fuente_herramienta_email: string | null;
  email_data_confidence: string;
  email_tools_all: string | null;
  email_tools_installed_at: string | null;
  version_scoring: string;
  fecha_metricas_trafico: string | null;
  fecha_metricas_tienda: string | null;
  data_source: string | null;
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-border last:border-0 gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="font-mono text-sm font-medium text-right">{value}</span>
    </div>
  );
}

export function InfrastructureSection({
  cms_name,
  cms_confianza,
  cms_source,
  email_mktg_tool,
  email_tool_grupo,
  fuente_herramienta_email,
  email_data_confidence,
  email_tools_all,
  email_tools_installed_at,
  version_scoring,
  fecha_metricas_trafico,
  fecha_metricas_tienda,
  data_source,
}: InfrastructureSectionProps) {
  const emailDisplay = email_mktg_tool
    ? `${email_mktg_tool} — ${email_data_confidence}`
    : "No detectado";

  const groupLabel = EMAIL_GROUP_LABEL[email_tool_grupo] ?? "Desconocido";

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <h2 className="text-lg font-semibold">Infraestructura y Stack</h2>
      <div className="bg-card border border-border rounded-lg px-5">
        <DataRow
          label="CMS"
          value={`${cms_name ? cms_name.charAt(0).toUpperCase() + cms_name.slice(1) : "—"} — ${cms_confianza ?? "?"}%`}
        />
        <DataRow label="Fuente CMS" value={cms_source ?? "—"} />
        <DataRow label="Herramienta Email" value={emailDisplay} />
        <DataRow label="Grupo Email" value={`Grupo ${email_tool_grupo} — ${groupLabel}`} />
        {fuente_herramienta_email && <DataRow label="Fuente Email" value={fuente_herramienta_email} />}
        <DataRow label="Confianza Detección Email" value={email_data_confidence} />
        {email_tools_all && <DataRow label="Todas las Herramientas Email" value={email_tools_all} />}
        {fecha_metricas_trafico && <DataRow label="Fecha Métricas Tráfico" value={fecha_metricas_trafico.slice(0, 10)} />}
        {fecha_metricas_tienda && <DataRow label="Fecha Métricas Tienda" value={fecha_metricas_tienda.slice(0, 10)} />}
        <DataRow label="Fuente de Datos" value={data_source ?? "—"} />
        <DataRow label="Versión Scoring" value={`v${version_scoring}`} />
      </div>

      {email_tools_installed_at && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fechas Instalación Email Tools</p>
          <p className="text-sm leading-relaxed text-muted-foreground font-mono">{email_tools_installed_at}</p>
        </div>
      )}
    </section>
  );
}
