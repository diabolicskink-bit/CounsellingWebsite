import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarClock, CircleAlert, Clock3, Mail } from "lucide-react";
import Container from "../components/Container";
import EnquiryForm from "../components/EnquiryForm";
import type { EnquiryFormContent } from "../components/EnquiryForm";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { enquiryEmail, enquiryFormContent } from "../data/enquiry";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import { getActiveAustralianPerthBusinessHoursNotes } from "../utils/timeZones";
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
  showTimeZoneNotes?: boolean;
};

type ContactProps = {
  initialRenderAt: string;
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
  items: ContactDetail[];
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
      "Counselling and Psychotherapy for adults across Australia. If you are considering a first session, you can enquire here about availability, fees, or arranging a time to begin.",
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
    detail: "50 minutes",
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
        value: "Mon to Fri, 9.30am to 5.00pm AWST",
        showTimeZoneNotes: true,
      },
    ],
  },
  practical: {
    eyebrow: "Practical details",
    items: [
      {
        icon: CalendarClock,
        label: "Cancellations",
        value:
          "If you cancel or change an appointment with less than 48 hours' notice, the full fee is payable, except in cases of illness.",
      },
      {
        icon: CircleAlert,
        label: "Crisis support",
        value:
          "Vive Counselling is not a crisis service. If you are in immediate danger, call 000 or contact a crisis support service.",
      },
    ],
  },
  faq: {
    items: [
      {
        question: "Do I need a referral?",
        answer:
          "You do not need a referral. You can make an enquiry directly, without a GP referral or any paperwork.",
      },
      {
        question: "Can I use this form in a crisis?",
        answer:
          "Vive Counselling is not an emergency service, and enquiries may not be seen straight away. If you are in immediate danger, call 000 now. If you need crisis support, contact Lifeline on 13 11 14 or Suicide Call Back Service on 1300 659 467.",
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
  initialRenderAt,
  practical,
}: {
  contact: ContactDetailsContent;
  initialRenderAt: string;
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
            <ContactDetailItem detail={detail} initialRenderAt={initialRenderAt} key={detail.label} />
          ))}
        </ul>
      </section>

      <section className="contact-page__rail-block" aria-labelledby="contact-practical-title">
        <h2 className="site-eyebrow contact-page__rail-heading" id="contact-practical-title">
          {practical.eyebrow}
        </h2>
        <ul className="contact-page__contact-list contact-page__practical-list" aria-label={practical.eyebrow}>
          {practical.items.map((detail) => (
            <ContactDetailItem detail={detail} key={detail.label} />
          ))}
        </ul>
      </section>
    </aside>
  );
}

function ContactTimeZoneNotes({ initialRenderAt }: { initialRenderAt: string }) {
  const [comparison, setComparison] = useState(() => ({
    notes: getActiveAustralianPerthBusinessHoursNotes(new Date(initialRenderAt)),
    source: "prerendered" as "current" | "prerendered",
  }));

  useEffect(() => {
    const currentNotes = getActiveAustralianPerthBusinessHoursNotes();

    setComparison((existingComparison) => {
      const notesAreCurrent =
        existingComparison.notes.length === currentNotes.length &&
        existingComparison.notes.every((note, index) => note === currentNotes[index]);

      return notesAreCurrent ? existingComparison : { notes: currentNotes, source: "current" };
    });
  }, [initialRenderAt]);

  return (
    <div className="contact-page__contact-notes" data-timezone-notes-source={comparison.source}>
      {comparison.notes.map((note) => (
        <small key={note}>{note}</small>
      ))}
    </div>
  );
}

function ContactDetailItem({ detail, initialRenderAt }: { detail: ContactDetail; initialRenderAt?: string }) {
  const { icon: Icon, label, value, href, showTimeZoneNotes } = detail;

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
        {showTimeZoneNotes && initialRenderAt ? <ContactTimeZoneNotes initialRenderAt={initialRenderAt} /> : null}
      </div>
    </li>
  );
}

export default function Contact({ initialRenderAt }: ContactProps) {
  const { hero, fee, form, contact, practical, faq } = contactPageContent;

  useDocumentMetadata(contactPageContent.title, contactPageContent.meta);

  return (
    <main className="site-page contact-page">
      <FaqSchema faqs={faq.items} />
      <ContactHeroSection hero={hero} fee={fee} />

      <section className="site-grid contact-page__desk-section">
        <Container className="contact-page__desk">
          <ContactRail contact={contact} initialRenderAt={initialRenderAt} practical={practical} />
          <EnquiryForm content={form} idPrefix="contact" />
        </Container>
      </section>

      <FaqSection className="site-highlight" items={faq.items} />
    </main>
  );
}
