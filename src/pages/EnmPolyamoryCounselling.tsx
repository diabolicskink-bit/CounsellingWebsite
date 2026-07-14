import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-enm-polyamory.css";

type LinkItem = { label: string; href: string };
type PositionItem = { label: string; prose: string };
type GapItem = { title: string; copy: string };
type TopicItem = { title: string; copy: string };
type PrincipleItem = { title: string; text: string };
type FaqItem = { question: string; answer: string };

const pageMetadata = getRouteMetadata("/inclusion/enm-polyamory");

const pageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,

  hero: {
    badge: "ENM & polyamory counselling",
    intro:
      "Polyamory, open relationships and other forms of ethical non-monogamy are understood here. Jealousy, uncertainty and conflict are not taken as proof that non-monogamy is the problem. Your relationships don't have to look a certain way to be taken seriously.",
    hubAside: {
      label: "Wider context",
      copy: "If ENM is only one part of why this page felt relevant, the inclusion hub keeps the wider context in view: kink, LGBTQIA+ lives, shame, family, community overlap, and the parts that do not sit neatly under one label.",
      link: { label: "Back to inclusion hub", href: "/inclusion" } satisfies LinkItem,
    },
  },

  positionsSection: {
    heading: "When non-monogamy gets hard.",
    items: [
      {
        label: "When the ground shifts.",
        prose:
          "The possibility of opening a relationship can change what had felt settled. You may not know what you want yet, especially when your answer could affect someone you love.",
      },
      {
        label: "Jealousy and insecurity.",
        prose:
          "You can believe in non-monogamy and still feel jealous, left out or less secure than you expected. Those feelings do not have to become a test of whether you are “good at” ENM.",
      },
      {
        label: "Being the hinge.",
        prose:
          "As the hinge, you can end up feeling responsible for everyone’s wellbeing. A difficult conversation in one relationship follows you into the next, with very little space left for your own reaction.",
      },
      {
        label: "When you want different things.",
        prose:
          "Agreeing to non-monogamy does not mean you and a partner will want the same things from it. Sometimes an agreement looks mutual on paper while one person feels they have little room to say no.",
      },
      {
        label: "When an agreement is broken.",
        prose:
          "Something happened outside the agreement you thought you had. Non-monogamy does not make the hurt less real.",
      },
    ] satisfies PositionItem[],
  },

  gapSection: {
    eyebrow: "The gap",
    heading: "What usually happens when therapy hasn't been designed with you in mind.",
    intro:
      "Not a complaint about bad therapists. A description of the extra work that lands on the client when basic contextual knowledge isn't already there.",
    items: [
      {
        title: "You become the educator",
        copy: "Having to explain how non-monogamy works, what your agreements mean, or why the structure makes sense — before the session can reach the actual issue.",
      },
      {
        title: "The structure gets diagnosed",
        copy: "Jealousy, grief, or conflict get attributed to the relationship model rather than heard on their own terms.",
      },
      {
        title: "Monogamy is the unspoken repair",
        copy: "The shape of the conversation quietly assumes that closing or restructuring the relationship is the sensible direction, before that has been established.",
      },
      {
        title: "The real concern gets crowded out",
        copy: "Whatever brought you in gets less room than managing the therapist's relationship to your relationship.",
      },
    ] satisfies GapItem[],
  },

  topicsSection: {
    eyebrow: "What you can bring",
    heading: "Any of the things that bring people to therapy.",
    intro:
      "ENM context is included where it matters and set aside where it doesn't. You do not need a polyamory-specific crisis to come here.",
    items: [
      {
        title: "Anxiety and nervous system",
        copy: "When overthinking, hypervigilance, or low-grade dread are the texture of daily life, with or without an obvious trigger.",
      },
      {
        title: "Jealousy and insecurity",
        copy: "When a feeling needs to be heard and understood — not pre-judged, minimised, or resolved on someone else's timeline.",
      },
      {
        title: "Relationships and conflict",
        copy: "When resentment, repair, trust, distance, or rupture are becoming harder to move through.",
      },
      {
        title: "Emotional overload",
        copy: "When too many people to care for, too many things to track, or too little capacity are leaving you depleted or reactive.",
      },
      {
        title: "Shame and self-worth",
        copy: "When the issue lives inside you — in how you feel about yourself — rather than in the relationship structure.",
      },
      {
        title: "Uncertainty and fit",
        copy: "When you want to think honestly about whether this way of relating fits who you are and what you want.",
      },
    ] satisfies TopicItem[],
    note: "If non-monogamy is at the heart of what you're bringing, it can be the centre of the work. If it's background context, it can stay there.",
  },

  approachSection: {
    eyebrow: "The approach",
    quote: "The aim isn't to steer you anywhere. It's to understand what's actually happening.",
    paragraphs: [
      "This isn't a pro-ENM practice in the sense that every agreement gets validated and every difficulty located somewhere else. It is a practice that does not import a structural preference into the work.",
      "When the relationship is relevant — consent, pressure, capacity, disclosure, resentment, repair — we can look at it directly. When it isn't the main thing, the room doesn't keep dragging it back.",
    ],
    principles: [
      {
        title: "No structural preference",
        text: "Neither monogamy nor ENM is assumed healthier, more mature, or the right destination. What is actually happening for you takes priority.",
      },
      {
        title: "Complexity can stay complex",
        text: "Multiple attachments, divided loyalties, or layered pressures don't need to be simplified before they can be worked with.",
      },
      {
        title: "Feelings before verdicts",
        text: "Jealousy, grief, shame, or anger are heard before they are explained. A feeling is not treated as evidence of the structure failing.",
      },
    ] satisfies PrincipleItem[],
  },

  individualSection: {
    eyebrow: "Coming alone",
    heading: "Individual therapy can still hold a complicated picture.",
    paragraphs: [
      "You might be coming about a hinge role that is becoming too much. A partner dynamic that has shifted. Disclosure you are not sure how to make. Jealousy you are carrying quietly. A relationship ending in a context where endings are complicated.",
      "Individual counselling can work with all of it. The work doesn't require everyone to be in the room to be useful to any one person.",
    ],
    resourcesLead: "You can also",
    resources: [
      { label: "read more about working with Joel", href: "/working-with-joel" },
      { label: "check fees and session details", href: "/contact" },
      { label: "make an enquiry", href: "/contact" },
    ] satisfies LinkItem[],
    signals: [
      "Hinge pressure",
      "Jealousy",
      "Disclosure",
      "Mono/poly tension",
      "Grief and endings",
      "Capacity and burnout",
      "Shame",
      "Uncertainty about fit",
    ],
    note: "A first contact doesn't need to be complete. Something approximate is enough.",
  },

  faqSection: {
    intro: "Some of the things people often want to know before making first contact.",
    items: [
      {
        question: "Do I need to be coming for a poly or ENM issue?",
        answer:
          "No. You might be coming for anxiety, grief, shame, self-worth, burnout, conflict, attachment, or something harder to name. The point is that you should not have to distort your relationship life in order to get proper help.",
      },
      {
        question: "Do you assume monogamy is healthier or the goal?",
        answer:
          "No. I don't start from the assumption that monogamy is healthier, more mature, or the obvious answer. The work is about understanding what is actually happening for you.",
      },
      {
        question: "What if I am not sure non-monogamy fits me?",
        answer:
          "That is a valid reason to come. Therapy can help you think through desire, pressure, fear, values, attachment, and capacity without pushing you toward or away from ENM before you have made sense of it.",
      },
      {
        question: "Can I come alone if more than one relationship is involved?",
        answer:
          "Yes. Individual counselling can still be useful when a concern involves several partners, a wider network, or strain across more than one bond.",
      },
    ] satisfies FaqItem[],
  },

  ctaSection: {
    heading: "You don't need to have it worked out before reaching out.",
    copy: "A first enquiry can be brief. Name what is bringing you to counselling and anything important for first contact.",
    buttonLabel: "Make an enquiry",
    buttonHref: "/contact",
  },
};

export default function EnmPolyamoryCounselling() {
  useDocumentMetadata(pageContent.title, pageContent.meta);
  const {
    hero,
    positionsSection,
    gapSection,
    topicsSection,
    approachSection,
    individualSection,
    faqSection,
    ctaSection,
  } = pageContent;

  return (
    <main className="site-page enm-page">
      <FaqSchema faqs={faqSection.items} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero-section hero-bg--default enm-page__hero">
        <Container className="enm-page__hero-inner">
          <div className="hero-top enm-page__hero-top">
            <div className="enm-page__hero-heading">
              <h1 className="hero-badge">{hero.badge}</h1>
              <p className="hero-display">
                <span className="enm-page__hero-line">Your <em>relationships</em>.</span>
                <span className="enm-page__hero-line">Your <em>people</em>.</span>
                <span className="enm-page__hero-line">Taken <em>seriously</em>.</span>
              </p>
              <div className="hero-copy-panel enm-page__hero-copy">
                <p>{hero.intro}</p>
              </div>
            </div>

            <aside className="enm-page__hub-aside" aria-label="Inclusion hub">
              <span className="site-eyebrow">{hero.hubAside.label}</span>
              <p>{hero.hubAside.copy}</p>
              <Link className="site-text-link enm-page__hub-link" to={hero.hubAside.link.href}>
                {hero.hubAside.link.label}
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid enm-page__positions">
        <Container className="enm-page__positions-inner">
          <h2 className="enm-page__positions-heading">{positionsSection.heading}</h2>
          <div className="enm-page__position-list" aria-label="Common positions in ENM relationships">
            {positionsSection.items.map((item) => (
              <article className="enm-page__position-block" key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.prose}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── The gap ──────────────────────────────────────────────────────── */}
      <section className="site-highlight enm-page__gap">
        <Container className="enm-page__gap-inner">
          <div className="enm-page__gap-header">
            <span className="site-eyebrow">{gapSection.eyebrow}</span>
            <h2>{gapSection.heading}</h2>
            <p className="section-heading__copy">{gapSection.intro}</p>
          </div>
          <div className="enm-page__gap-grid" aria-label="Common gaps in therapy not designed for ENM">
            {gapSection.items.map((item, i) => (
              <article className="enm-page__gap-card" key={item.title}>
                <span className="enm-page__gap-card-num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Topics ───────────────────────────────────────────────────────── */}
      <section className="site-grid enm-page__topics">
        <Container className="enm-page__topics-inner">
          <div className="enm-page__topics-header">
            <span className="site-eyebrow">{topicsSection.eyebrow}</span>
            <h2>{topicsSection.heading}</h2>
            <p className="section-heading__copy">{topicsSection.intro}</p>
          </div>

          <div className="enm-page__topics-list" aria-label="Reasons people come for therapy">
            {topicsSection.items.map((item) => (
              <article className="enm-page__topic-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <p className="enm-page__topics-note">{topicsSection.note}</p>
        </Container>
      </section>

      {/* ── The approach ─────────────────────────────────────────────────── */}
      <section className="site-highlight enm-page__approach">
        <Container className="enm-page__approach-inner">
          <div className="enm-page__approach-lead">
            <span className="site-eyebrow">{approachSection.eyebrow}</span>
            <blockquote className="enm-page__approach-quote">
              {approachSection.quote}
            </blockquote>
            <div className="enm-page__approach-prose">
              {approachSection.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="enm-page__approach-strip" aria-label="How ENM-aware counselling is held">
            {approachSection.principles.map((item) => (
              <div className="enm-page__approach-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Individual ───────────────────────────────────────────────────── */}
      <section className="site-grid enm-page__individual">
        <Container className="site-split enm-page__individual-split">
          <div className="enm-page__individual-copy">
            <div className="section-heading">
              <span className="site-eyebrow">{individualSection.eyebrow}</span>
              <h2>{individualSection.heading}</h2>
            </div>
            <div className="rich-text">
              {individualSection.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                {individualSection.resourcesLead}{" "}
                {individualSection.resources.map((item, index) => (
                  <span key={item.label}>
                    {index === 0
                      ? ""
                      : index === individualSection.resources.length - 1
                        ? ", or "
                        : ", "}
                    <Link to={item.href}>{item.label}</Link>
                  </span>
                ))}
                .
              </p>
            </div>
            <p className="site-ruled-paragraph enm-page__individual-note">
              {individualSection.note}
            </p>
          </div>

          <aside
            className="enm-page__individual-aside"
            aria-label="Examples of what individuals bring"
          >
            <p className="enm-page__signals-label">Things people bring on their own</p>
            <div className="enm-page__signals" role="list">
              {individualSection.signals.map((s) => (
                <span className="enm-page__signal" role="listitem" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSection
        className="site-grid"
        intro={faqSection.intro}
        items={faqSection.items}
      />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
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
