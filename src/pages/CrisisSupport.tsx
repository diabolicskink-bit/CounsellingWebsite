import { ArrowUpRight, MessageSquareText, Phone } from "lucide-react";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-crisis-support.css";

type ContactAction = {
  href: string;
  label: "Call" | "Text";
  number: string;
};

type NationalService = {
  actions: ContactAction[];
  description: string;
  name: string;
  url: string;
};

type StateService = {
  description: string;
  id: string;
  name: string;
  region: string;
  url: string;
  actions?: ContactAction[];
  note?: string;
};

const crisisSupportMetadata = getRouteMetadata("/crisis-support");

const nationalServices: NationalService[] = [
  {
    name: "Lifeline",
    url: "https://www.lifeline.org.au/get-help/national-services/lifeline-crisis-support",
    description:
      "Crisis support and suicide prevention for anyone in Australia experiencing emotional distress.",
    actions: [
      { href: "tel:131114", label: "Call", number: "13 11 14" },
      { href: "sms:0477131114", label: "Text", number: "0477 13 11 14" },
    ],
  },
  {
    name: "Suicide Call Back Service",
    url: "https://www.suicidecallbackservice.org.au/",
    description:
      "Professional counselling for people with suicidal thoughts, people worried about someone at risk, and people affected by suicide.",
    actions: [{ href: "tel:1300659467", label: "Call", number: "1300 659 467" }],
  },
  {
    name: "13YARN",
    url: "https://www.13yarn.org.au/",
    description:
      "Culturally safe crisis support with an Aboriginal or Torres Strait Islander Crisis Supporter.",
    actions: [{ href: "tel:139276", label: "Call", number: "13 92 76" }],
  },
];

const stateServices: StateService[] = [
  {
    id: "act",
    region: "Australian Capital Territory",
    name: "Access Mental Health",
    url: "https://www.canberrahealthservices.act.gov.au/services-and-clinics/services/access-mental-health",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:1800629354", label: "Call", number: "1800 629 354" }],
  },
  {
    id: "nsw",
    region: "New South Wales",
    name: "NSW Mental Health Line",
    url: "https://www.health.nsw.gov.au/mentalhealth/Pages/mental-health-line.aspx",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:1800011511", label: "Call", number: "1800 011 511" }],
  },
  {
    id: "nt",
    region: "Northern Territory",
    name: "NT Mental Health Line",
    url: "https://nt.gov.au/wellbeing/mental-health/about-mental-health",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:1800682288", label: "Call", number: "1800 682 288" }],
  },
  {
    id: "qld",
    region: "Queensland",
    name: "1300 MH CALL",
    url: "https://www.qld.gov.au/health/mental-health-and-wellbeing/how-to-get-help/1300-mh-call",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:1300642255", label: "Call", number: "1300 642 255" }],
  },
  {
    id: "sa",
    region: "South Australia",
    name: "Mental Health Triage Service",
    url: "https://www.sahealth.sa.gov.au/wps/wcm/connect/public+content/sa+health+internet/services/mental+health+and+drug+and+alcohol+services/mental+health+services/find+mental+health+help+now",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:131465", label: "Call", number: "13 14 65" }],
  },
  {
    id: "tas",
    region: "Tasmania",
    name: "Access Mental Health",
    url: "https://www.health.tas.gov.au/health-topics/mental-health/tasmanias-mental-health-system/access-mental-health-helpline",
    description: "Urgent mental health advice and support.",
    actions: [{ href: "tel:1800332388", label: "Call", number: "1800 332 388" }],
  },
  {
    id: "vic",
    region: "Victoria",
    name: "Local mental health triage service",
    url: "https://vahi.vic.gov.au/mental-health-services",
    description:
      "Victoria has area-based public mental health triage services rather than one statewide number.",
    note: "Use the Victorian directory to find the phone number for your local area.",
  },
  {
    id: "wa",
    region: "Western Australia",
    name: "Mental Health Emergency Response Line and RuralLink",
    url: "https://healthywa.health.wa.gov.au/Articles/J_M/Mental-health-emergency",
    description:
      "Mental health emergency assessment, support and referral. MHERL serves Perth metropolitan and Peel callers; RuralLink serves regional and remote WA after hours.",
    actions: [
      { href: "tel:1300555788", label: "Call", number: "Metro 1300 555 788" },
      { href: "tel:1800676822", label: "Call", number: "Peel 1800 676 822" },
      { href: "tel:1800552002", label: "Call", number: "Regional 1800 552 002" },
    ],
  },
];

function ExternalServiceLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="crisis-support-page__service-link" href={href}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
    </a>
  );
}

function ContactActionLink({ action }: { action: ContactAction }) {
  const Icon = action.label === "Text" ? MessageSquareText : Phone;

  return (
    <a className="crisis-support-page__contact-action" href={action.href}>
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
      <span className="crisis-support-page__contact-label">{action.label}</span>
      <span className="crisis-support-page__contact-number">{action.number}</span>
    </a>
  );
}

export default function CrisisSupport() {
  useDocumentMetadata(crisisSupportMetadata.title, crisisSupportMetadata.description);

  return (
    <main className="site-page crisis-support-page">
      <section
        aria-labelledby="crisis-support-title"
        className="hero-section site-hero-background crisis-support-page__hero"
      >
        <Container className="crisis-support-page__hero-layout">
          <h1 className="hero-badge" id="crisis-support-title">
            Crisis support services
          </h1>
          <p className="hero-display">Find urgent mental health support.</p>
        </Container>
      </section>

      <section
        aria-labelledby="crisis-emergency-title"
        className="crisis-support-page__emergency"
      >
        <Container className="crisis-support-page__emergency-layout">
          <div className="crisis-support-page__emergency-copy">
            <h2 id="crisis-emergency-title">Immediate danger</h2>
            <p className="site-reading">
              Call Triple Zero (000) or go to the nearest hospital emergency department if you or
              someone else is in immediate danger or cannot safely wait for telephone support.
            </p>
          </div>
          <a className="crisis-support-page__emergency-call" href="tel:000">
            <Phone aria-hidden="true" size={21} strokeWidth={1.9} />
            <span>Call 000</span>
          </a>
        </Container>
      </section>

      <section
        aria-labelledby="national-crisis-support-title"
        className="crisis-support-page__national site-section-warm"
      >
        <Container>
          <header className="crisis-support-page__section-heading">
            <h2 id="national-crisis-support-title">National urgent support services</h2>
            <p className="site-reading">
              These free services are available 24 hours a day, 7 days a week. You can call for
              yourself or because you are worried about someone else.
            </p>
          </header>

          <ul className="crisis-support-page__national-list">
            {nationalServices.map((service) => (
              <li className="crisis-support-page__national-service" key={service.name}>
                <div className="crisis-support-page__service-copy">
                  <h3>
                    <ExternalServiceLink href={service.url}>{service.name}</ExternalServiceLink>
                  </h3>
                  <p>{service.description}</p>
                </div>
                <div className="crisis-support-page__service-actions">
                  {service.actions.map((action) => (
                    <ContactActionLink action={action} key={`${action.label}-${action.number}`} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="state-crisis-support-title"
        className="crisis-support-page__states"
      >
        <Container>
          <header className="crisis-support-page__section-heading crisis-support-page__section-heading--states">
            <h2 id="state-crisis-support-title">State and territory urgent support services</h2>
            <p className="site-reading">
              These services provide mental health assessment, triage, advice or referral. They are
              public mental health access lines, not general counselling services.
            </p>
          </header>

          <nav className="crisis-support-page__location-index" aria-label="Choose a state or territory">
            <span>Jump to</span>
            <ul>
              {stateServices.map((service) => (
                <li key={service.id}>
                  <a
                    aria-label={`${service.id.toUpperCase()}: ${service.region}`}
                    href={`#crisis-${service.id}`}
                  >
                    {service.id.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="crisis-support-page__state-list">
            {stateServices.map((service) => (
              <article
                aria-labelledby={`crisis-${service.id}-title`}
                className="crisis-support-page__state-service"
                id={`crisis-${service.id}`}
                key={service.id}
              >
                <p className="crisis-support-page__region">{service.region}</p>
                <div className="crisis-support-page__state-service-main">
                  <h3 id={`crisis-${service.id}-title`}>
                    <ExternalServiceLink href={service.url}>{service.name}</ExternalServiceLink>
                  </h3>
                  <p>{service.description}</p>
                  {service.note ? <p className="crisis-support-page__state-note">{service.note}</p> : null}
                </div>
                <div className="crisis-support-page__service-actions crisis-support-page__service-actions--state">
                  {service.actions?.map((action) => (
                    <ContactActionLink action={action} key={action.number} />
                  )) ?? (
                    <a className="crisis-support-page__directory-link" href={service.url}>
                      <span>Find your local service</span>
                      <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="crisis-support-page__information-note">
            <p>
              Information current as of <time dateTime="2026-08-13">13/08/2026</time>.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
