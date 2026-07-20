import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";

const pageMetadata = getRouteMetadata("/lgbtqia-affirming-counselling");

type HeroAction = {
  label: string;
  href: string;
};

type RecognitionItem = {
  variant: "question" | "context" | "background";
  title: string;
  body: string;
};

type LgbtqiaPageContent = {
  title: string;
  meta: string;
  hero: {
    badge: string;
    statement: {
      before: string;
      emphasis: string;
      after: string;
    };
    support: string;
    primaryAction: HeroAction;
    secondaryAction: HeroAction;
  };
  recognition: {
    heading: string;
    items: RecognitionItem[];
  };
  fluency: {
    heading: string;
    introduction: string;
    examplesIntroduction: string;
    examples: string[];
  };
  disclosure: {
    heading: string;
    position: string;
    summary: string;
    detail: string;
    body: string[];
    contextsAriaLabel: string;
    contexts: string[];
  };
};

const lgbtqiaPageContent: LgbtqiaPageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,
  hero: {
    badge: "LGBTQIA+ affirming counselling and therapy",
    statement: {
      before: "Respect lets the conversation ",
      emphasis: "go further",
      after: ".",
    },
    support:
      "Whether you want to talk about a relationship, a difficult decision or something from your past, the focus can stay on what matters to you. You can bring your whole self into counselling without every part of your life having to become the subject.",
    primaryAction: {
      label: "Make an enquiry",
      href: routeHref(publicRoutePaths.contact),
    },
    secondaryAction: {
      label: "Back to Inclusion",
      href: routeHref(publicRoutePaths.inclusion),
    },
  },
  recognition: {
    heading: "Where does sexuality or gender fit?",
    items: [
      {
        variant: "question",
        title: "It may be the question.",
        body:
          "You may be finding words for your sexuality or gender, thinking about coming out, or looking again at something you thought you had settled years ago. You can also be clear about who you are and still be unsure what to do next.",
      },
      {
        variant: "context",
        title: "It may be the context.",
        body:
          "An important relationship has changed, or family, faith or community has become harder to remain part of. Counselling can focus on the conflict, loss or choices involved without treating sexuality or gender as the problem.",
      },
      {
        variant: "background",
        title: "It may barely matter.",
        body:
          "You may want help with anxiety, grief, burnout or trouble in a relationship. Sexuality or gender does not need to become the subject of counselling simply because it is part of your life.",
      },
    ],
  },
  fluency: {
    heading: "Therapy is not for debating your identity.",
    introduction:
      "Mistaken assumptions about sexuality, gender or sex characteristics can change what a counsellor sees as the problem. For me, LGBTQIA+ affirming therapy means working with you as an individual. Who you are is not up for debate.",
    examplesIntroduction: "For example, you should not have to manage your therapist by:",
    examples: [
      "Arguing against assumptions about your sexuality based on your current partner.",
      "Explaining why asexuality is not a symptom or a problem to solve.",
      "Keeping the conversation going when sexuality or gender makes them uncomfortable.",
    ],
  },
  disclosure: {
    heading: "Who to tell, and when",
    position: "More disclosure is not automatically the goal.",
    summary: "Being open may make sense in one part of your life and carry real risk in another.",
    detail: "Who knows, what they know, and what it is safe or useful to say can differ across each part of your life.",
    body: [
      "Counselling can be a place to think about whether, when and how to tell someone, and what each choice might change. If you are questioning or trying out language, you do not have to reach a conclusion on a timetable.",
      "I will not assume what should happen with family, faith, culture or community. We can look at the relationships, risks and values involved without treating separation or reconciliation as the measure of progress.",
    ],
    contextsAriaLabel: "Contexts in which disclosure may differ",
    contexts: ["Relationships", "Family", "Work", "Faith", "Community"],
  },
};

export default function LgbtqiaCounselling() {
  const { hero, recognition, fluency, disclosure } = lgbtqiaPageContent;

  useDocumentMetadata(lgbtqiaPageContent.title, lgbtqiaPageContent.meta);

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <section className="hero-section hero-bg--default lgbtqia-page__hero">
        <Container>
          <div className="lgbtqia-page__hero-main">
            <div className="lgbtqia-page__hero-copy">
              <h1 className="hero-badge">{hero.badge}</h1>
              <p className="hero-display">
                {hero.statement.before}
                <em>{hero.statement.emphasis}</em>
                {hero.statement.after}
              </p>

              <div className="hero-copy-panel lgbtqia-page__hero-support">
                <p>{hero.support}</p>
              </div>
            </div>
            <nav className="lgbtqia-page__hero-actions" aria-label="Page actions">
              <div className="lgbtqia-page__hero-action-list">
                <Button href={hero.primaryAction.href} variant="primary">
                  {hero.primaryAction.label} <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button href={hero.secondaryAction.href} variant="secondary">
                  <ArrowLeft size={16} aria-hidden="true" /> {hero.secondaryAction.label}
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      <section className="site-grid lgbtqia-page__recognition" aria-labelledby="lgbtqia-recognition-title">
        <Container className="lgbtqia-page__recognition-layout">
          <header className="lgbtqia-page__section-heading">
            <h2 id="lgbtqia-recognition-title">{recognition.heading}</h2>
          </header>

          <ol className="lgbtqia-page__recognition-flow">
            {recognition.items.map((item) => (
              <li
                className={`lgbtqia-page__recognition-item lgbtqia-page__recognition-item--${item.variant}`}
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="site-highlight lgbtqia-page__fluency" aria-labelledby="lgbtqia-fluency-title">
        <Container className="lgbtqia-page__fluency-layout">
          <header className="section-heading lgbtqia-page__fluency-introduction">
            <h2 id="lgbtqia-fluency-title">{fluency.heading}</h2>
            <p className="section-heading__copy site-ruled-paragraph">{fluency.introduction}</p>
          </header>

          <div className="site-card site-copy-flow lgbtqia-page__fluency-field">
            <p className="lgbtqia-page__fluency-examples-intro">{fluency.examplesIntroduction}</p>
            <ul className="lgbtqia-page__fluency-examples">
              {fluency.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="site-grid lgbtqia-page__disclosure" aria-labelledby="lgbtqia-disclosure-title">
        <Container className="lgbtqia-page__disclosure-layout">
          <header className="lgbtqia-page__disclosure-heading">
            <h2 id="lgbtqia-disclosure-title">{disclosure.heading}</h2>
            <h3 className="site-ruled-paragraph lgbtqia-page__disclosure-position">
              {disclosure.position}
            </h3>
          </header>

          <div className="lgbtqia-page__disclosure-details">
            <div className="lgbtqia-page__disclosure-detail">
              <p className="lgbtqia-page__disclosure-summary">{disclosure.summary}</p>
              <p className="lgbtqia-page__disclosure-body">{disclosure.detail}</p>
            </div>

            {disclosure.body.map((paragraph) => (
              <p className="lgbtqia-page__disclosure-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul
            className="lgbtqia-page__context-line lgbtqia-page__context-line--after"
            aria-label={disclosure.contextsAriaLabel}
          >
            {disclosure.contexts.map((context) => (
              <li key={context}>{context}</li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
