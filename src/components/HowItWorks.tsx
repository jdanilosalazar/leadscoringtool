import { useState } from "react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

function SignalRow({ label, pts, description }: { label: string; pts: string; description: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-border last:border-0">
      <div className="shrink-0 font-mono text-xs text-primary font-semibold w-14 pt-0.5">{pts}</div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ICPRow({ tier, color, categories }: { tier: string; color: string; categories: string }) {
  return (
    <div className="flex gap-3 py-2 border-b border-border last:border-0">
      <div className={`shrink-0 font-mono text-xs font-semibold w-24 pt-0.5 ${color}`}>{tier}</div>
      <p className="text-xs text-muted-foreground leading-relaxed">{categories}</p>
    </div>
  );
}

export function HowItWorks() {
  const [open, setOpen] = useState(false);

  return (
    <section className="animate-fade-in" style={{ animationDelay: "600ms" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
          ¿Cómo funciona este score?
        </h2>
        <span className="font-mono text-muted-foreground text-sm transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          ↓
        </span>
      </button>

      {open && (
        <div className="space-y-8 pb-4">

          {/* Qué es */}
          <Section title="¿Qué es este score?">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El score evalúa qué tan probable es que una tienda ecommerce sea un buen prospecto para Probance.
              Se calcula automáticamente a partir de señales públicas sobre tráfico, stack de herramientas,
              tamaño del catálogo y comportamiento de la tienda. El umbral mínimo para ser evaluado es{" "}
              <span className="font-mono font-semibold text-foreground">5,000 visitas ponderadas</span> (m1×0.5 + m2×0.3 + m3×0.2).
            </p>
          </Section>

          {/* Tiers */}
          <Section title="Niveles de clasificación">
            <div className="bg-card border border-border rounded-lg px-5">
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-20 text-tier-hot">CALIENTE</span>
                <div>
                  <p className="text-sm font-medium">≥ 20 puntos</p>
                  <p className="text-xs text-muted-foreground">Alta prioridad. Contactar de forma inmediata.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-20 text-tier-warm">TIBIO</span>
                <div>
                  <p className="text-sm font-medium">≥ 16 puntos</p>
                  <p className="text-xs text-muted-foreground">Prioridad media. Hay señales positivas — vale la pena contactar.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-20 text-tier-cold">FRÍO</span>
                <div>
                  <p className="text-sm font-medium">≥ 10 puntos</p>
                  <p className="text-xs text-muted-foreground">Prioridad baja. Evaluar con cautela.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-20 text-muted-foreground">CONGELADO</span>
                <div>
                  <p className="text-sm font-medium">{"< 10 puntos"}</p>
                  <p className="text-xs text-muted-foreground">Muy baja calificación — despriorizar.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5">
                <span className="shrink-0 font-mono text-xs font-semibold w-20 text-muted-foreground">DESCARTADO</span>
                <div>
                  <p className="text-sm font-medium">Sin datos de tráfico o visitas ponderadas {"<"} 5,000</p>
                  <p className="text-xs text-muted-foreground">No se puntúa. La tienda no tiene tráfico suficiente para ser un prospecto viable.</p>
                </div>
              </div>
            </div>
          </Section>

          {/* ICP */}
          <Section title="Encaje con el perfil de cliente ideal (ICP)">
            <div className="bg-card border border-border rounded-lg px-5">
              <ICPRow
                tier="ICP Core"
                color="text-emerald-400"
                categories="Moda, alimentos y bebidas, belleza, mascotas, suplementos, vape. Alta afinidad con Probance."
              />
              <ICPRow
                tier="ICP Secondary"
                color="text-blue-400"
                categories="Deporte, joyería, bebés, hobbies, muebles, farmacia, motor, papelería. Afinidad media."
              />
              <ICPRow
                tier="ICP Weak"
                color="text-yellow-400"
                categories="Electrónica, lujo, cannabis/CBD. Baja afinidad con el modelo de Probance."
              />
            </div>
          </Section>

          {/* Señales */}
          <Section title="Señales de scoring">
            <div className="bg-card border border-border rounded-lg px-5">
              <SignalRow
                pts="+7 pts"
                label="Volumen de tráfico (7 niveles)"
                description="Basado en visitas ponderadas (m1×0.5 + m2×0.3 + m3×0.2). Más tráfico = mayor potencial de impacto con email."
              />
              <SignalRow
                pts="+4 pts"
                label="Stack de email marketing"
                description="Grupo 1–2 (Shopify Email, Sendgrid, Mailerlite, Mailjet…): +4 pts. Grupo 3 (Mailchimp, Brevo, Omnisend…): +3 pts. Grupo 4 (Klaviyo, Connectif…): +2 pts. Grupo 5 (HubSpot, Salesforce…): +1 pt. Sin herramienta detectada: 0 pts — se requiere revisión manual para confirmar si usan email."
              />
              <SignalRow
                pts="+5 pts"
                label="Tamaño del catálogo (7 niveles)"
                description="Catálogos más grandes se benefician más de la personalización de Probance. Penalización de -1 pt para catálogos de menos de 50 productos."
              />
              <SignalRow
                pts="+3 pts"
                label="Antigüedad de la tienda"
                description="Tiendas con más historia tienen más datos de clientes y mayor necesidad de automatización."
              />
              <SignalRow
                pts="+3 pts"
                label="Crecimiento de tráfico (trimestre)"
                description="Basado en m1_vs_m3: diferencia porcentual entre el mes más reciente y el de hace 3 meses. Crecimiento fuerte suma hasta +3 pts; caída pronunciada resta hasta -3 pts."
              />
              <SignalRow
                pts="+3 pts"
                label="Tráfico social alto"
                description="Alta proporción de tráfico social indica una audiencia activa que necesita estrategias de retención — exactamente donde ayuda el email."
              />
              <SignalRow
                pts="+2 pts"
                label="Tasa de rebote baja"
                description="Visitantes más comprometidos generan más datos de comportamiento, lo que potencia el tracker de Probance."
              />
              <SignalRow
                pts="+2 pts"
                label="Páginas por sesión altas"
                description="Más páginas visitadas = datos de navegación más ricos para personalización de emails."
              />
              <SignalRow
                pts="+2 pts"
                label="Migración de plataforma reciente (< 12 meses)"
                description="Un cambio de CMS reciente indica que la tienda está en modo inversión y más abierta a adoptar nuevas herramientas."
              />
              <SignalRow
                pts="+1 pt"
                label="CMS compatible (Shopify / WooCommerce / PrestaShop)"
                description="Integración nativa disponible — reducción de fricción técnica en la implementación."
              />
              <SignalRow
                pts="+1 pt"
                label="Tráfico de búsqueda alto"
                description="Buen SEO implica tráfico orgánico estable y predecible — una base sólida para complementar con email."
              />
              <SignalRow
                pts="+1 pt"
                label="Tráfico directo alto"
                description="Indica reconocimiento de marca. Clientes que vuelven directamente son los más valiosos para retención."
              />
              <SignalRow
                pts="+1 pt"
                label="Duración de visita alta"
                description="Visitas de más de 1 minuto indican intención real de compra."
              />
              <SignalRow
                pts="-2 pts"
                label="Tráfico pagado alto"
                description="Dependencia de paid traffic indica presión de márgenes, lo que dificulta la inversión en nuevas herramientas."
              />
            </div>
          </Section>

          {/* Gate */}
          <Section title="Requisito mínimo para ser evaluado">
            <div className="bg-card border border-border rounded-lg px-5">
              <div className="py-2.5">
                <p className="text-sm font-medium">Visitas ponderadas ≥ 5,000</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Se calcula como m1×0.5 + m2×0.3 + m3×0.2. Prioriza el tráfico reciente y es más estable que
                  la mediana en ejecuciones mensuales. Las tiendas que no alcanzan el umbral aparecen como DESCARTADAS.
                </p>
              </div>
            </div>
          </Section>

        </div>
      )}
    </section>
  );
}
