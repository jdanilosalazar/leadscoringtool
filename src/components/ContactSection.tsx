interface ContactSectionProps {
  contact_email_1: string | null;
  contact_email_2: string | null;
  contact_email_3: string | null;
  contact_phone_1: string | null;
  contact_phone_2: string | null;
  contact_linkedin: string | null;
  contact_instagram: string | null;
  contact_whatsapp: string | null;
}

function ContactRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-border last:border-0 gap-4">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium text-primary hover:underline text-right"
        >
          {value}
        </a>
      ) : (
        <span className="font-mono text-sm font-medium text-right">{value}</span>
      )}
    </div>
  );
}

export function ContactSection({
  contact_email_1,
  contact_email_2,
  contact_email_3,
  contact_phone_1,
  contact_phone_2,
  contact_linkedin,
  contact_instagram,
  contact_whatsapp,
}: ContactSectionProps) {
  const hasAny = contact_email_1 || contact_email_2 || contact_email_3 ||
    contact_phone_1 || contact_phone_2 || contact_linkedin ||
    contact_instagram || contact_whatsapp;

  if (!hasAny) return null;

  return (
    <section className="space-y-4 animate-fade-in" style={{ animationDelay: "450ms" }}>
      <h2 className="text-lg font-semibold">Contacto</h2>
      <div className="bg-card border border-border rounded-lg px-5">
        {contact_email_1 && (
          <ContactRow label="Email 1" value={contact_email_1} href={`mailto:${contact_email_1}`} />
        )}
        {contact_email_2 && (
          <ContactRow label="Email 2" value={contact_email_2} href={`mailto:${contact_email_2}`} />
        )}
        {contact_email_3 && (
          <ContactRow label="Email 3" value={contact_email_3} href={`mailto:${contact_email_3}`} />
        )}
        {contact_phone_1 && (
          <ContactRow label="Teléfono 1" value={contact_phone_1} href={`tel:${contact_phone_1}`} />
        )}
        {contact_phone_2 && (
          <ContactRow label="Teléfono 2" value={contact_phone_2} href={`tel:${contact_phone_2}`} />
        )}
        {contact_instagram && (
          <ContactRow label="Instagram" value={contact_instagram} href={contact_instagram.startsWith("http") ? contact_instagram : `https://instagram.com/${contact_instagram.replace(/^@/, "")}`} />
        )}
        {contact_whatsapp && (
          <ContactRow label="WhatsApp" value={contact_whatsapp} />
        )}
        {contact_linkedin && (
          <ContactRow label="LinkedIn" value={contact_linkedin} href={contact_linkedin.startsWith("http") ? contact_linkedin : `https://linkedin.com/company/${contact_linkedin}`} />
        )}
      </div>
    </section>
  );
}
