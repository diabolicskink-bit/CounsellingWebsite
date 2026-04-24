import type { LucideIcon } from "lucide-react";
import { Clock3, Mail } from "lucide-react";
import Container from "../components/Container";
import EnquiryForm from "../components/EnquiryForm";
import type { EnquiryFormContent } from "../components/EnquiryForm";
import { enquiryEmail, enquiryFormContent } from "../data/enquiry";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { getActiveAustralianPerthBusinessHoursNotes, getPerthBusinessHoursPrimaryLabel } from "../utils/timeZones";
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

function getServiceTierClassName(tier: ServiceTier) {
  return ["enquire-page__service-tier", tier.featured ? "enquire-page__service-tier--featured" : ""]
    .filter(Boolean)
    .join(" ");
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
  form: EnquiryFormContent;
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
  form: enquiryFormContent,
  contact: {
    eyebrow: "Contact",
    listAriaLabel: "Contact details",
  },
  contactDetails: [
    {
      icon: Mail,
      label: "Email",
      value: enquiryEmail,
      href: `mailto:${enquiryEmail}`,
    },
    {
      icon: Clock3,
      label: "Hours",
      value: getPerthBusinessHoursPrimaryLabel(),
      notes: getActiveAustralianPerthBusinessHoursNotes(),
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

  useDocumentMetadata(enquiryPageContent.title, enquiryPageContent.meta);

  return (
    <main className="site-page enquire-page">
      <section className="hero-section hero-bg--default">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div>
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
                  <article className={getServiceTierClassName(tier)} key={tier.label}>
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

      <section className="site-grid enquire-page__desk-section">
        <Container className="enquire-page__desk">
          <aside className="enquire-page__rail">
            <div className="enquire-page__rail-block">
              <span className="site-eyebrow">{contact.eyebrow}</span>
              <div className="enquire-page__contact-list" role="list" aria-label={contact.listAriaLabel}>
                {contactDetails.map(({ icon: Icon, label, value, href, notes }) => (
                  <div className="enquire-page__contact-item" role="listitem" key={label}>
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

          <EnquiryForm content={form} className="enquire-page__form" idPrefix="enquire" />
        </Container>
      </section>
    </main>
  );
}
