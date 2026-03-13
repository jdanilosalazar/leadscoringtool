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
      <div className="shrink-0 font-mono text-xs text-primary font-semibold w-12 pt-0.5">{pts}</div>
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
      <div className={`shrink-0 font-mono text-xs font-semibold w-20 pt-0.5 ${color}`}>{tier}</div>
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
              El score de Probance evalúa qué tan probable es que una tienda ecommerce sea un buen
              prospecto. Se calcula automáticamente a partir de señales públicas sobre la infraestructura,
              tráfico y comportamiento de la tienda. El score va de <span className="font-mono font-semibold text-foreground">0 a 13 puntos</span>.
            </p>
          </Section>

          {/* Tiers */}
          <Section title="Niveles de clasificación">
            <div className="bg-card border border-border rounded-lg px-5">
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-16 text-tier-hot">HOT</span>
                <div>
                  <p className="text-sm font-medium">≥ 7 puntos</p>
                  <p className="text-xs text-muted-foreground">Alta prioridad. Contactar de forma inmediata.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5 border-b border-border">
                <span className="shrink-0 font-mono text-xs font-semibold w-16 text-tier-warm">WARM</span>
                <div>
                  <p className="text-sm font-medium">4 – 6 puntos</p>
                  <p className="text-xs text-muted-foreground">Prioridad media. Hay señales positivas pero no suficientes para contacto inmediato.</p>
                </div>
              </div>
              <div className="flex gap-3 py-2.5">
                <span className="shrink-0 font-mono text-xs font-semibold w-16 text-tier-cold">COLD</span>
                <div>
                  <p className="text-sm font-medium">{"< 4 puntos"}</p>
                  <p className="text-xs text-muted-foreground">Baja prioridad. La tienda no cumple suficientes criterios en este momento.</p>
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
                categories="Moda, alimentos y bebidas, vino y licores, mascotas, suplementos deportivos, vape. Alta afinidad con Probance."
              />
              <ICPRow
                tier="ICP Secondary"
                color="text-blue-400"
                categories="Deporte, belleza y cosmética, joyería, bebés y juguetes, hogar, farmacia, motor, papelería. Afinidad media."
              />
              <ICPRow
                tier="ICP Weak"
                color="text-yellow-400"
                categories="Electrónica, lujo, cannabis. Baja afinidad con el modelo de Probance."
              />
            </div>
          </Section>

          {/* Señales */}
          <Section title="Señales de scoring">
            <div className="bg-card border border-border rounded-lg px-5">
              <SignalRow
                pts="+3 pts"
                label="Sin herramienta de email marketing"
                description="No se detectó ninguna herramienta. Máxima oportunidad de entrada para Probance."
              />
              <SignalRow
                pts="+2 pts"
                label="Herramienta de email simple"
                description="Shopify Email o Sendgrid detectados. Herramientas básicas con poco potencial de personalización."
              />
              <SignalRow
                pts="+2 pts"
                label="Herramienta de email básica"
                description="Mailerlite, Mailjet o similar. Funcionalidades limitadas, alta posibilidad de upgrade."
              />
              <SignalRow
                pts="+1 pt"
                label="Herramienta de email completa"
                description="Mailchimp, Brevo, Omnisend o similar. Competidor directo con posibilidad de migración."
              />
              <SignalRow
                pts="+1 pt"
                label="Herramienta de email avanzada"
                description="Klaviyo, Connectif o similar. Competidor fuerte — oportunidad existe si hay insatisfacción."
              />
              <SignalRow
                pts="+0 pts"
                label="CRM con email (HubSpot, Salesforce, Zoho)"
                description="Solución enterprise. Ciclo de venta muy largo, baja prioridad."
              />
              <SignalRow
                pts="+2 pts"
                label="Tráfico de email < 1%"
                description="El canal de email genera menos del 1% del tráfico. Indica que el email marketing está prácticamente sin explotar."
              />
              <SignalRow
                pts="+1 pt"
                label="Tráfico de email 1–3%"
                description="El canal de email tiene uso mínimo. Hay margen claro de mejora."
              />
              <SignalRow
                pts="+2 pts"
                label="Crecimiento de tráfico ≥30%"
                description="El tráfico creció más de 30% entre el mes 1 y mes 3. Tiendas en crecimiento tienen más presupuesto y motivación para invertir."
              />
              <SignalRow
                pts="+2 pts"
                label="Migración de plataforma reciente"
                description="Cambio de CMS en los últimos 18 meses. Las migraciones generan ventanas de cambio en toda la stack de herramientas."
              />
              <SignalRow
                pts="+1 pt"
                label="Rediseño de tienda reciente"
                description="Cambio de tema en los últimos 90 días. Indica inversión activa en la experiencia de compra."
              />
              <SignalRow
                pts="+1 pt"
                label="Tienda nueva"
                description="Creada hace menos de 18 meses. Las tiendas nuevas están construyendo su stack desde cero."
              />
              <SignalRow
                pts="+1 pt"
                label="Catálogo mediano (500–1,499 productos)"
                description="Catálogos de este tamaño se benefician significativamente de la personalización de Probance."
              />
              <SignalRow
                pts="+2 pts"
                label="Catálogo grande (≥1,500 productos)"
                description="Catálogos grandes tienen mayor complejidad y necesidad de personalización avanzada."
              />
            </div>
          </Section>

          {/* Gates */}
          <Section title="Requisitos mínimos">
            <div className="bg-card border border-border rounded-lg px-5">
              <div className="py-2.5 border-b border-border">
                <p className="text-sm font-medium">Plataforma Gold</p>
                <p className="text-xs text-muted-foreground mt-0.5">Solo se evalúan tiendas en Shopify, WooCommerce o PrestaShop.</p>
              </div>
              <div className="py-2.5">
                <p className="text-sm font-medium">Tráfico mínimo</p>
                <p className="text-xs text-muted-foreground mt-0.5">La tienda debe tener un promedio de al menos 5,000 visitas mensuales. Las tiendas que no cumplen aparecen como DESCARTADAS.</p>
              </div>
            </div>
          </Section>

        </div>
      )}
    </section>
  );
}
