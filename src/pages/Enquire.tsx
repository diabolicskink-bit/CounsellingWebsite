import { useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { Clock3, Mail } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import "../styles-enquire.css";

type EnquiryHeroTitle = {
  before: string;
  emphasis: string;
  after: string;
};

type ServiceTier = {
  label: string;
  fee: string;
  detail: string;
  note?: string;
  featured?: boolean;
};

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  notes?: string[];
};

type FormTextField = {
  label: string;
  placeholder: string;
};

type FormSelectOption = {
  value: string;
  label: string;
};

function getTimeParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value.toLowerCase() ?? "";

  return `${hour}.${minute}${dayPeriod}`;
}

function getTimeZoneAbbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone,
    timeZoneName: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

function getPerthToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Perth",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  return {
    year: Number(parts.find((part) => part.type === "year")?.value ?? 0),
    month: Number(parts.find((part) => part.type === "month")?.value ?? 1),
    day: Number(parts.find((part) => part.type === "day")?.value ?? 1),
  };
}

function getHoursRange(timeZone: string) {
  const today = getPerthToday();
  const start = new Date(Date.UTC(today.year, today.month - 1, today.day, 1, 30));
  const end = new Date(Date.UTC(today.year, today.month - 1, today.day, 9, 0));

  return `${getTimeParts(start, timeZone)} to ${getTimeParts(end, timeZone)}`;
}

function getHoursLabel(timeZone: string) {
  const today = getPerthToday();
  const start = new Date(Date.UTC(today.year, today.month - 1, today.day, 1, 30));

  return `${getTimeZoneAbbreviation(start, timeZone)}: ${getHoursRange(timeZone)}`;
}

type EnquiryPageContent = {
  title: string;
  meta: string;
  hero: {
    title: EnquiryHeroTitle;
    support: string;
    detailsAriaLabel: string;
    details: string[];
    feeCardAriaLabel: string;
  };
  serviceTiers: ServiceTier[];
  form: {
    eyebrow: string;
    submitLabel: string;
    fields: {
      name: FormTextField;
      email: FormTextField;
      message: FormTextField & { rows: number };
      timing: {
        label: string;
        options: FormSelectOption[];
      };
    };
  };
  contact: {
    eyebrow: string;
    listAriaLabel: string;
  };
  contactDetails: ContactDetail[];
  practical: {
    eyebrow: string;
    notes: string[];
  };
};

const enquiryPageContent: EnquiryPageContent = {
  title: "Enquire | Vive Counselling",
  meta:
    "Fees, practical details, and direct contact for online counselling with Vive Counselling. Standard sessions are $120 for 50 minutes online, with a free optional phone consult.",
  hero: {
    title: {
      before: "Get",
      emphasis: "in touch",
      after: ".",
    },
    support:
      "Online counselling for adults across Australia. If you are considering a first session, you can enquire here about availability, fees, or arranging a time to begin.",
    detailsAriaLabel: "Enquiry page details",
    details: [
      "Available across Australia",
      "No referral required",
    ],
    feeCardAriaLabel: "Session fees",
  },
  serviceTiers: [
    {
      label: "Standard session",
      fee: "$120",
      detail: "50 minutes / Online",
      note: "Free 15-minute initial consult available",
      featured: true,
    },
  ],
  form: {
    eyebrow: "Enquiry",
    submitLabel: "Send enquiry",
    fields: {
      name: {
        label: "Name",
        placeholder: "Your name",
      },
      email: {
        label: "Email",
        placeholder: "you@example.com",
      },
      message: {
        label: "Your message",
        placeholder: "What would you like to ask or let Joel know?",
        rows: 7,
      },
      timing: {
        label: "Preferred timing (optional)",
        options: [
          { value: "", label: "No preference or not booking yet" },
          { value: "weekday-morning", label: "Weekday mornings" },
          { value: "weekday-afternoon", label: "Weekday afternoons" },
          { value: "weekday-evening", label: "Weekday evenings" },
          { value: "flexible", label: "Flexible" },
        ],
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    listAriaLabel: "Contact details",
  },
  contactDetails: [
    {
      icon: Mail,
      label: "Email",
      value: "hello@vivecounselling.com.au",
      href: "mailto:hello@vivecounselling.com.au",
    },
    {
      icon: Clock3,
      label: "Hours",
      value: "Mon to Fri, 9.30am to 5.00pm WST",
      notes: [
        getHoursLabel("Australia/Adelaide"),
        getHoursLabel("Australia/Sydney"),
      ],
    },
  ],
  practical: {
    eyebrow: "Practical details",
    notes: [
      "Payment details are confirmed before the first appointment.",
      "If you cancel or change an appointment with less than 48 hours' notice, the full fee is payable, except in cases of illness.",
      "Vive Counselling is not a crisis service. If you are in immediate danger, call 000 or contact a crisis support service.",
    ],
  },
};

export default function Enquire() {
  const { hero, serviceTiers, form, contact, contactDetails, practical } = enquiryPageContent;

  useEffect(() => {
    document.title = enquiryPageContent.title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = enquiryPageContent.meta;
    }
  }, []);

  return (
    <main className="site-page enquire-page">
      <section className="hero-section hero-bg--default">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div className="enquire-page__hero-copy">
              <h1 className="hero-display">
                {hero.title.before}
                <br />
                <em>{hero.title.emphasis}</em>
                {hero.title.after}
              </h1>
              <div className="hero-copy-panel">
                <p>{hero.support}</p>
                <ul className="hero-support-tagline" aria-label={hero.detailsAriaLabel}>
                  {hero.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="site-fee-card" aria-label={hero.feeCardAriaLabel}>
              <div className="enquire-page__service-tier-list">
                {serviceTiers.map((tier) => (
                  <article
                    className={`enquire-page__service-tier ${
                      tier.featured ? "enquire-page__service-tier--featured" : ""
                    }`.trim()}
                    key={tier.label}
                  >
                    <span className="enquire-page__service-tier-label">{tier.label}</span>
                    <strong className="enquire-page__service-tier-fee">{tier.fee}</strong>
                    <span className="enquire-page__service-tier-detail">{tier.detail}</span>
                    {tier.note ? <small className="enquire-page__service-tier-note">{tier.note}</small> : null}
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-highlight enquire-page__desk-section">
        <Container className="enquire-page__desk">
          <aside className="enquire-page__rail">
            <div className="enquire-page__rail-block">
              <span className="site-eyebrow">{contact.eyebrow}</span>
              <div className="enquire-page__contact-list" aria-label={contact.listAriaLabel}>
                {contactDetails.map(({ icon: Icon, label, value, href, notes }) => (
                  <div className="enquire-page__contact-item" key={label}>
                    <span className="icon-box">
                      <Icon size={20} />
                    </span>
                    <div className="enquire-page__contact-copy">
                      <strong>{label}</strong>
                      {href ? (
                        <a className="enquire-page__contact-link" href={href}>
                          {value}
                        </a>
                      ) : (
                        <span>{value}</span>
                      )}
                      {notes ? (
                        <div className="enquire-page__contact-notes">
                          {notes.map((note) => (
                            <small key={note}>{note}</small>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="enquire-page__rail-block">
              <span className="site-eyebrow">{practical.eyebrow}</span>
              <div className="site-detail-stack enquire-page__notes-list">
                {practical.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </aside>

          <form className="site-form enquire-page__form" action="#" method="post">
            <div className="enquire-page__form-header">
              <span className="site-eyebrow">{form.eyebrow}</span>
            </div>

            <div className="enquire-page__form-grid">
              <div className="form-row">
                <label htmlFor="enquire-name">{form.fields.name.label}</label>
                <input
                  id="enquire-name"
                  name="name"
                  autoComplete="name"
                  type="text"
                  placeholder={form.fields.name.placeholder}
                />
              </div>

              <div className="form-row">
                <label htmlFor="enquire-email">{form.fields.email.label}</label>
                <input
                  id="enquire-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  placeholder={form.fields.email.placeholder}
                />
              </div>

              <div className="form-row enquire-page__form-row--full">
                <label htmlFor="enquire-message">{form.fields.message.label}</label>
                <textarea
                  id="enquire-message"
                  name="message"
                  placeholder={form.fields.message.placeholder}
                  rows={form.fields.message.rows}
                />
              </div>

              <div className="form-row enquire-page__form-row--full">
                <label htmlFor="enquire-timing">{form.fields.timing.label}</label>
                <select id="enquire-timing" name="timing" defaultValue="">
                  {form.fields.timing.options.map((option) => (
                    <option key={option.value || "default"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button type="submit">{form.submitLabel}</Button>
          </form>
        </Container>
      </section>
    </main>
  );
}
