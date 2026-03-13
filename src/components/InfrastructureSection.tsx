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
  email_tool_confianza: number;
  email_tools_all: string | null;
  installed_apps_names: string | null;
  version_scoring: string;
  fecha_metricas: string | null;
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
  email_tool_confianza,
  email_tools_all,
  installed_apps_names,
  version_scoring,
  fecha_metricas,
  data_source,
}: InfrastructureSectionProps) {
  const emailDisplay = email_mktg_tool
    ? `${email_mktg_tool} — ${email_tool_confianza}%`
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
        {email_tools_all && <DataRow label="Todas las Herramientas Email" value={email_tools_all} />}
        <DataRow label="Fecha Métricas" value={fecha_metricas?.slice(0, 10) ?? "—"} />
        <DataRow label="Fuente de Datos" value={data_source ?? "—"} />
        <DataRow label="Versión Scoring" value={`v${version_scoring}`} />
      </div>

      {installed_apps_names && (
        <div className="bg-card border border-border rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Installed Apps</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{installed_apps_names}</p>
        </div>
      )}
    </section>
  );
}
