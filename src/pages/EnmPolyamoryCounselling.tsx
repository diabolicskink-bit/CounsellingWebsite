import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-enm-polyamory.css";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type LinkItem = {
  label: string;
  href: string;
};

type MisreadItem = {
  title: string;
  copy: string;
};

type FocusItem = {
  title: string;
  copy: string;
};

type PrincipleItem = {
  title: string;
  text: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const pageMetadata = getRouteMetadata("/inclusion/enm-polyamory");

const pageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,
  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Inclusive practice", href: "/inclusion" },
      { label: "ENM & polyamory" },
    ] satisfies BreadcrumbItem[],
    badge: "ENM and polyamory counselling",
    title: "Polyamory and ENM counselling",
    intro:
      "For people in consensual non-monogamy who want real therapy without first defending how their relationships work. Anxiety, jealousy, shame, grief, attachment, burnout, conflict, or uncertainty can be understood in context, without monogamy being treated as the default repair.",
    primaryAction: {
      label: "Make an enquiry",
      href: "/contact",
    },
    secondaryAction: {
      label: "Inclusive counselling hub",
      href: "/inclusion",
    } satisfies LinkItem,
    trustItems: ["For adults", "Online across Australia", "Non-shaming and direct", "No default push toward monogamy"],
    noteHeading: "More than one truth can be in the room.",
    noteCopy: "The structure can matter. It does not have to become the whole story.",
    noteItems: [
      "No default push toward monogamy.",
      "No need to teach basic consensual non-monogamy literacy.",
      "Context is included without taking over the work.",
    ],
  },
  misreadSection: {
    eyebrow: "What often goes wrong",
    heading: "A lot of ENM clients arrive expecting to manage the therapist first.",
    intro:
      "That extra work is tiring. It can also pull attention away from the actual problem.",
    items: [
      {
        title: "Monogamy is framed as recovery",
        copy:
          "The conversation quietly points toward closing the relationship before anyone has understood your values, limits, history, or fit.",
      },
      {
        title: "The structure gets blamed for every feeling",
        copy:
          "Jealousy, grief, shame, trauma, conflict, or exhaustion stop being listened to on their own terms.",
      },
      {
        title: "You have to teach basic CNM literacy",
        copy:
          "Hinge dynamics, agreements, hierarchy, disclosure, pressure, and consent take over the session before your experience gets any room.",
      },
      {
        title: "Complexity gets flattened into a moral story",
        copy:
          "Several bonds, needs, fears, and limits become one simplified problem to fix.",
      },
    ] satisfies MisreadItem[],
  },
  focusSection: {
    eyebrow: "What you can come for",
    heading: "The work can be ordinary, complicated, or both.",
    intro:
      "You do not need an ENM-specific crisis. You might be coming for the same reasons anyone comes to therapy, with relationship context that deserves to be understood rather than edited out.",
    items: [
      {
        title: "Anxiety and overthinking",
        copy: "When vigilance, uncertainty, or constant mental checking are wearing you down.",
      },
      {
        title: "Jealousy, insecurity, and comparison",
        copy: "When difficult feelings need attention without shame or a pre-decided verdict.",
      },
      {
        title: "Attachment strain and conflict",
        copy: "When reassurance, resentment, trust, distance, repair, or rupture have become harder to hold.",
      },
      {
        title: "Burnout and emotional overload",
        copy: "When too many moving parts, too much caretaking, or too little capacity are leaving you flat or reactive.",
      },
      {
        title: "Shame, grief, or self-worth",
        copy: "When the deeper issue is how you feel inside yourself, not only what structure you are in.",
      },
      {
        title: "Uncertainty about fit",
        copy: "When you want to think honestly about whether polyamory, openness, or ENM fits your life and values.",
      },
    ] satisfies FocusItem[],
    note:
      "If non-monogamy matters to the work, it can be included directly. If it is background context, it can stay background.",
  },
  stance: {
    eyebrow: "How I work",
    heading: "The frame is neither pro-monogamy nor pro-ENM. It is pro-accuracy.",
    paragraphs: [
      "The aim is not to validate every agreement, steer you back to monogamy, or sell you on non-monogamy. The work is to understand what is happening in you, in the relationship field, and in the choices available now.",
      "If the structure matters, we can talk about it directly: power, consent, pressure, repair, capacity, boundaries, disclosure, values. If it is not the main issue, the room does not need to keep dragging everything back to it.",
    ],
    principles: [
      {
        title: "Structure is context, not diagnosis",
        text: "Polyamory, openness, or ENM are not treated as proof that something is unstable or immature.",
      },
      {
        title: "Ambivalence is allowed",
        text: "You can question fit, limits, desire, agreements, and pressure without being pushed toward a tidy answer.",
      },
      {
        title: "The actual feeling gets listened to",
        text: "Jealousy, grief, conflict, anxiety, shame, or self-worth can stay central when that is what needs attention.",
      },
    ] satisfies PrincipleItem[],
  },
  individual: {
    eyebrow: "Individual counselling",
    heading: "You can come on your own, even when the story has several people in it.",
    paragraphs: [
      "Individual counselling can still help when the issue involves a hinge role, several attachments, divided loyalties, disclosure, jealousy, uncertainty, conflict, a mono/poly relationship, or the wider pressure of relational complexity.",
      "Sometimes the work is about your own limits, needs, fears, capacity, or sense of fit. Sometimes it is about thinking clearly when several relationships, several pressures, and several truths are present at once.",
    ],
    signals: ["Hinge pressure", "Mono/poly tension", "Disclosure", "Capacity", "Jealousy and compersion", "A relationship ending"],
    resourcesLead: "You can also",
    resources: [
      { label: "read more about working with Joel", href: "/working-with-joel" },
      { label: "check online counselling fees and session details", href: "/contact" },
      { label: "make an enquiry about counselling", href: "/contact" },
    ] satisfies LinkItem[],
    note:
      "You do not need a polished map before reaching out. A rough starting point is enough.",
  },
  faqSection: {
    heading: "Common questions before starting",
    intro: "These are some of the things people often want to know before making first contact.",
    items: [
      {
        question: "Do I need to be coming for a poly or ENM issue?",
        answer:
          "No. You might be coming for anxiety, grief, shame, self-worth, burnout, conflict, attachment, or something harder to name. The point is that you should not have to hide or distort your relationship life in order to get proper help.",
      },
      {
        question: "Do you assume monogamy is healthier or the goal?",
        answer:
          "No. I do not start from the assumption that monogamy is healthier, more mature, or the obvious answer. The work is about understanding what is happening for you rather than pushing you toward a predetermined structure.",
      },
      {
        question: "What if I am not sure non-monogamy fits me?",
        answer:
          "That is a valid reason to come. Therapy can help you think about desire, pressure, fear, values, attachment, and capacity without pushing you toward or away from ENM before you have made sense of it.",
      },
      {
        question: "Can I come alone if more than one relationship is involved?",
        answer:
          "Yes. Individual counselling can still be useful when a concern involves several partners, a wider relationship network, or strain across more than one bond.",
      },
    ] satisfies FaqItem[],
  },
  ctaSection: {
    heading: "You do not need to explain everything perfectly.",
    copy:
      "A first enquiry can be brief. Name what is bringing you to counselling, whether online sessions suit you, and anything important for first contact.",
    buttonLabel: "Make an enquiry about counselling",
    buttonHref: "/contact",
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const { hero, misreadSection, focusSection, stance, individual, faqSection, ctaSection } = pageContent;

  return (
    <main className="site-page enm-page">
      <FaqSchema faqs={faqSection.items} />

      <section className="hero-section hero-bg--default enm-page__hero">
        <Container className="enm-page__hero-inner">
          <nav className="breadcrumb enm-page__breadcrumb" aria-label="Breadcrumb">
            {hero.breadcrumb.map((item) =>
              item.href ? (
                <Link key={item.label} to={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </nav>

          <div className="hero-top enm-page__hero-top">
            <div className="enm-page__hero-heading">
              <span className="hero-badge">{hero.badge}</span>
              <h1 className="hero-display">{hero.title}</h1>

              <ul className="site-trust-list site-trust-list--highlight-last" aria-label="Practice details">
                {hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="hero-copy-panel enm-page__hero-panel">
              <p>{hero.intro}</p>
              <div className="site-actions">
                <Button href={hero.primaryAction.href}>
                  {hero.primaryAction.label} <ArrowRight size={16} />
                </Button>
                <Link className="site-text-link" to={hero.secondaryAction.href}>
                  {hero.secondaryAction.label}
                </Link>
              </div>
            </div>
          </div>

          <aside className="enm-page__hero-note" aria-label="How ENM-aware counselling is held">
            <div className="enm-page__hero-note-copy">
              <h2>{hero.noteHeading}</h2>
              <p>{hero.noteCopy}</p>
            </div>
            <ul className="enm-page__hero-note-list">
              {hero.noteItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section className="site-highlight enm-page__misread">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{misreadSection.eyebrow}</span>
            <h2>{misreadSection.heading}</h2>
            <p className="section-heading__copy">{misreadSection.intro}</p>
          </div>

          <div className="site-principles enm-page__misread-list">
            {misreadSection.items.map((item) => (
              <article className="site-principle" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid enm-page__focus">
        <Container className="enm-page__focus-inner">
          <div className="section-heading enm-page__focus-heading">
            <span className="site-eyebrow">{focusSection.eyebrow}</span>
            <h2>{focusSection.heading}</h2>
            <p className="section-heading__copy">{focusSection.intro}</p>
          </div>

          <div className="site-topic-grid enm-page__focus-grid" aria-label="Common therapy reasons">
            {focusSection.items.map((item, index) => (
              <article className={`site-topic-card ${index % 3 === 1 ? "site-topic-card--soft" : index % 3 === 2 ? "site-topic-card--muted" : ""}`.trim()} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <p className="site-ruled-paragraph site-ruled-paragraph--wide enm-page__note">{focusSection.note}</p>
        </Container>
      </section>

      <section className="site-grid enm-page__stance">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{stance.eyebrow}</span>
            <h2>{stance.heading}</h2>
          </div>

          <div className="site-content-stack">
            <div className="rich-text">
              {stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="site-principles" aria-label="ENM-aware counselling principles">
              {stance.principles.map((item) => (
                <article className="site-principle" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="site-highlight enm-page__individual">
        <Container className="site-split">
          <div className="section-heading">
            <span className="site-eyebrow">{individual.eyebrow}</span>
            <h2>{individual.heading}</h2>
          </div>

          <div className="site-content-stack">
            <article className="rich-text">
              {individual.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {individual.resourcesLead}{" "}
                {individual.resources.map((item, index) => (
                  <span key={item.label}>
                    {index === 0 ? "" : index === individual.resources.length - 1 ? ", or " : ", "}
                    <Link to={item.href}>{item.label}</Link>
                  </span>
                ))}
                .
              </p>
            </article>

            <aside className="site-detail-stack enm-page__signal-stack" aria-label="Examples of relational context">
              {individual.signals.map((signal) => (
                <p key={signal}>{signal}</p>
              ))}
            </aside>

            <p className="site-ruled-paragraph site-ruled-paragraph--wide enm-page__note">{individual.note}</p>
          </div>
        </Container>
      </section>

      <FaqSection intro={faqSection.intro} items={faqSection.items} title={faqSection.heading} />

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div className="site-cta-block__copy">
            <h2>{ctaSection.heading}</h2>
            <p>{ctaSection.copy}</p>
          </div>
          <Button href={ctaSection.buttonHref} variant="secondary">
            {ctaSection.buttonLabel} <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
