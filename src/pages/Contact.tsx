import type { LucideIcon } from "lucide-react";
import { Clock3, Mail } from "lucide-react";
import Container from "../components/Container";
import EnquiryForm from "../components/EnquiryForm";
import type { EnquiryFormContent } from "../components/EnquiryForm";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { enquiryEmail, enquiryFormContent } from "../data/enquiry";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { getActiveAustralianPerthBusinessHoursNotes, getPerthBusinessHoursPrimaryLabel } from "../utils/timeZones";
import "../styles-contact.css";

type ContactHeroTitle = {
  before: string;
  emphasis: string;
  after: string;
};

type FeeSummary = {
  ariaLabel: string;
  label: string;
  amount: string;
  detail: string;
  note: string;
};

type ContactDetail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  notes?: string[];
};

type ContactHeroContent = {
  eyebrow: string;
  title: ContactHeroTitle;
  support: string;
  detailsAriaLabel: string;
  details: string[];
};

type ContactDetailsContent = {
  eyebrow: string;
  listAriaLabel: string;
  items: ContactDetail[];
};

type PracticalDetailsContent = {
  eyebrow: string;
  notes: string[];
};

type ContactFaqItem = {
  question: string;
  answer: string;
};

type ContactFaqContent = {
  items: ContactFaqItem[];
};

type ContactPageContent = {
  title: string;
  meta: string;
  hero: ContactHeroContent;
  fee: FeeSummary;
  form: EnquiryFormContent;
  contact: ContactDetailsContent;
  practical: PracticalDetailsContent;
  faq: ContactFaqContent;
};

const contactMetadata = getRouteMetadata("/contact");

const contactPageContent: ContactPageContent = {
  title: contactMetadata.title,
  meta: contactMetadata.description,
  hero: {
    eyebrow: "Contact and fees",
    title: {
      before: "Get",
      emphasis: "in touch",
      after: ".",
    },
    support:
      "Online counselling for adults across Australia. If you are considering a first session, you can enquire here about availability, fees, or arranging a time to begin.",
    detailsAriaLabel: "Contact page details",
    details: [
      "Available across Australia",
      "No referral required",
    ],
  },
  fee: {
    ariaLabel: "Session fees",
    label: "Standard session",
    amount: "$120",
    detail: "50 minutes / Online",
    note: "Free 15-minute initial consult available",
  },
  form: enquiryFormContent,
  contact: {
    eyebrow: "Contact",
    listAriaLabel: "Contact details",
    items: [
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
  },
  practical: {
    eyebrow: "Practical details",
    notes: [
      "Payment details are confirmed before the first appointment.",
      "If you cancel or change an appointment with less than 48 hours' notice, the full fee is payable, except in cases of illness.",
      "Vive Counselling is not a crisis service. If you are in immediate danger, call 000 or contact a crisis support service.",
    ],
  },
  faq: {
    items: [
      {
        question: "Do I need a referral?",
        answer:
          "No. You can make an enquiry directly. You do not need a GP referral, prepared paperwork, or a fully formed explanation before getting in touch.",
      },
      {
        question: "What should I put in the first message?",
        answer:
          "A short message is enough. You can include what is bringing you to counselling, whether online sessions suit you, and any days or times that are usually easier.",
      },
      {
        question: "Are sessions online?",
        answer:
          "Yes. Sessions are online for adults across Australia. Standard sessions are 50 minutes.",
      },
      {
        question: "How much does a session cost?",
        answer:
          "The standard fee is $120 for a 50-minute online session. A free 15-minute initial consult is available if you would like to ask a few questions before booking a full session.",
      },
      {
        question: "Can I use this form in a crisis?",
        answer:
          "No. Vive Counselling is not a crisis service and the enquiry form is not monitored for urgent support. If you are in immediate danger, call 000 or contact a crisis support service.",
      },
    ],
  },
};

function ContactHeroSection({ hero, fee }: { hero: ContactHeroContent; fee: FeeSummary }) {
  return (
    <section className="hero-section hero-bg--default">
      <Container>
        <div className="hero-top hero-top--supporting-media">
          <div className="contact-page__hero-content">
            <h1 className="hero-badge">{hero.eyebrow}</h1>
            <div className="contact-page__hero-body">
              <h2 className="hero-display">
                {hero.title.before}{" "}
                <em>{hero.title.emphasis}</em>
                {hero.title.after}
              </h2>
              <div className="hero-copy-panel">
                <p>{hero.support}</p>
                <ul className="hero-support-tagline" aria-label={hero.detailsAriaLabel}>
                  {hero.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <FeeCard fee={fee} />
        </div>
      </Container>
    </section>
  );
}

function FeeCard({ fee }: { fee: FeeSummary }) {
  return (
    <aside className="site-fee-card contact-page__fee-card" aria-label={fee.ariaLabel}>
      <span className="contact-page__fee-label">{fee.label}</span>
      <strong>{fee.amount}</strong>
      <span>{fee.detail}</span>
      <small>{fee.note}</small>
    </aside>
  );
}

function ContactRail({
  contact,
  practical,
}: {
  contact: ContactDetailsContent;
  practical: PracticalDetailsContent;
}) {
  return (
    <aside className="contact-page__rail" aria-label="Contact and practical details">
      <section className="contact-page__rail-block" aria-labelledby="contact-details-title">
        <h2 className="site-eyebrow contact-page__rail-heading" id="contact-details-title">
          {contact.eyebrow}
        </h2>
        <ul className="contact-page__contact-list" aria-label={contact.listAriaLabel}>
          {contact.items.map((detail) => (
            <ContactDetailItem detail={detail} key={detail.label} />
          ))}
        </ul>
      </section>

      <section className="contact-page__rail-block" aria-labelledby="contact-practical-title">
        <h2 className="site-eyebrow contact-page__rail-heading" id="contact-practical-title">
          {practical.eyebrow}
        </h2>
        <ul className="site-detail-stack contact-page__notes-list">
          {practical.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

function ContactDetailItem({ detail }: { detail: ContactDetail }) {
  const { icon: Icon, label, value, href, notes } = detail;

  return (
    <li className="contact-page__contact-item">
      <span className="icon-box" aria-hidden="true">
        <Icon size={20} />
      </span>
      <div className="contact-page__contact-copy">
        <strong>{label}</strong>
        {href ? (
          <a className="contact-page__contact-link" href={href}>
            {value}
          </a>
        ) : (
          <span className="contact-page__contact-value">{value}</span>
        )}
        {notes && notes.length > 0 ? (
          <div className="contact-page__contact-notes">
            {notes.map((note) => (
              <small key={note}>{note}</small>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default function Contact() {
  const { hero, fee, form, contact, practical, faq } = contactPageContent;

  useDocumentMetadata(contactPageContent.title, contactPageContent.meta);

  return (
    <main className="site-page contact-page">
      <FaqSchema faqs={faq.items} />
      <ContactHeroSection hero={hero} fee={fee} />

      <section className="site-grid contact-page__desk-section">
        <Container className="contact-page__desk">
          <ContactRail contact={contact} practical={practical} />
          <EnquiryForm content={form} idPrefix="contact" />
        </Container>
      </section>

      <FaqSection className="site-highlight" items={faq.items} />
    </main>
  );
}
