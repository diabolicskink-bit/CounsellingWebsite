import { useId, useState } from "react";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-working-with-joel.css";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type TopicItem = {
  title: string;
  body: string;
};

type ApproachItem = {
  title: string;
  summary: string;
  details: string[];
};

type WorkingWithJoelPageContent = {
  title: string;
  meta: string;
  hero: {
    badge: string;
    title: EmphasisCopy;
    supportLead: string;
    supportBody: string;
    credentials: string[];
    portrait: {
      name: string;
      descriptor: string;
    };
  };
  introduction: {
    title: string;
    paragraphs: string[];
  };
  approach: {
    eyebrow: string;
    title: string;
    overview: string[];
    items: ApproachItem[];
  };
  focus: {
    eyebrow: string;
    title: string;
    items: TopicItem[];
    closingItem: TopicItem;
  };
};

const pageMetadata = getRouteMetadata("/working-with-joel");

const pageContent: WorkingWithJoelPageContent = {
  title: pageMetadata.title,
  meta: pageMetadata.description,
  hero: {
    badge: "Working with Joel Griffiths",
    title: {
      before: "Working with ",
      emphasis: "the bigger",
      after: " picture.",
    },
    supportLead: "Life is complicated.",
    supportBody:
      "Relationships, work, how you feel about yourself, the thing that's been sitting with you. It's all connected.",
    credentials: [
      "Graduate Diploma - Counselling and Psychotherapy",
      "ACA Registered Counsellor",
      "Kink and ENM informed; LGBTQIA+ affirming",
    ],
    portrait: {
      name: "Joel Griffiths",
      descriptor: "Counselling and psychodynamic psychotherapy",
    },
  },
  introduction: {
    title: "Introducing Joel",
    paragraphs: [
      "I'm Joel Griffiths, an ACA registered counsellor offering online counselling for adults across Australia from Perth.",
      "People often come here with anxiety, relationship strain, self-criticism, shame, sexuality, intimacy, trauma, or a sense that something keeps repeating even when they understand it on paper.",
      "My work is direct, thoughtful, and non-shaming. You do not need a polished story before making contact; a rough sense that something is not sitting right is enough to begin a conversation.",
    ],
  },
  approach: {
    eyebrow: "My approach",
    title: "How I work",
    overview: [
      "My work is psychodynamic and attachment-informed, held within an integrative frame. In practice, that means paying attention to the pattern beneath the immediate problem: how it formed, how it protects you, and how it shows up in relationships, work, shame, desire, anger, and the room itself.",
      "Sessions can include practical reflection, but the centre of the work is formulation: making sense of what is happening now in relation to older templates, current pressures, and the parts of experience that have had to stay less conscious.",
    ],
    items: [
      {
        title: "Psychodynamic",
        summary: "Looking below the surface at unconscious patterns, defences, conflict, and repetition.",
        details: [
          "Psychodynamic work pays attention to the parts of experience that are active but not always obvious: old conflicts, defences, shame, desire, anger, avoidance, and the ways a familiar pattern can repeat even when you are trying to do something different.",
          "The work is not about forcing a neat explanation onto your life. It is a shared formulation of what might be happening underneath the visible problem, including how that pattern may appear between us in the room.",
        ],
      },
      {
        title: "Attachment",
        summary: "Thinking about closeness, distance, safety, repair, and early relational templates.",
        details: [
          "Attachment work looks at how closeness, distance, dependence, trust, and self-protection were learned. Those early relational templates can keep shaping adult relationships, often through strategies that once made sense but now create strain.",
          "This can include how you manage conflict, jealousy, rupture, repair, need, withdrawal, people-pleasing, or the fear of being too much. The point is to understand the strategy before trying to change the strategy.",
        ],
      },
      {
        title: "Integrative",
        summary: "Using other frameworks where useful without losing the depth frame.",
        details: [
          "Integrative does not mean a loose mix of techniques. It means other frameworks can be brought in when they help make sense of what is happening, support the work, or give language to something that would otherwise stay vague.",
          "Practical tools, nervous-system ideas, parts language, values work, or communication frameworks may have a place. They sit inside the broader psychodynamic and attachment frame rather than replacing it.",
        ],
      },
    ],
  },
  focus: {
    eyebrow: "What I work with",
    title: "Some of the issues I work with",
    items: [
      {
        title: "Anxiety, panic & overwhelm",
        body:
          "Worry, dread, overthinking, shutdown, physical tension, irritability, or feeling unable to switch off.",
      },
      {
        title: "Depression & low mood",
        body:
          "Flatness, numbness, hopelessness, exhaustion, loss of interest, or not feeling much like yourself.",
      },
      {
        title: "Trauma & feeling unsafe",
        body:
          "Past experiences, abuse, dissociation, hypervigilance, numbness, or memories that still feel active.",
      },
      {
        title: "Shame & self-criticism",
        body:
          "Feeling wrong, too much, not enough, exposed, constantly at fault, or unable to be at ease with yourself.",
      },
      {
        title: "Perfectionism & control",
        body:
          "High standards, fear of mistakes, procrastination, over-responsibility, or never being able to rest.",
      },
      {
        title: "Relationships & attachment",
        body:
          "Conflict, distance, jealousy, trust, people-pleasing, fear of closeness, or repeating the same painful pattern.",
      },
      {
        title: "Sex, intimacy & desire",
        body:
          "Desire, avoidance, shame, boundaries, sexual confidence, intimacy, or things that feel hard to say out loud.",
      },
      {
        title: "Kink & BDSM",
        body:
          "Power exchange, dynamics, consent, shame, conflict, secrecy, or kink as one part of ordinary life.",
      },
      {
        title: "Polyamory & ENM",
        body:
          "Agreements, jealousy, comparison, disclosure, boundaries, repair, breakups, or relationship strain.",
      },
    ],
    closingItem: {
      title: "Something else?",
      body:
        "Sometimes what's going on doesn't quite match any of these. It may be more specific, a bit of a mix, or just difficult to explain.",
    },
  },
};

function getWorkingTopicClassName(isTabletOrphan: boolean) {
  return ["working-topics__item", isTabletOrphan ? "working-topics__item--tablet-full" : ""]
    .filter(Boolean)
    .join(" ");
}

export default function WorkingWithJoel() {
  const { hero, introduction, approach, focus } = pageContent;
  const hasTabletOrphan = focus.items.length % 2 === 1;
  const approachBaseId = useId();
  const [openApproachIndex, setOpenApproachIndex] = useState<number | null>(null);

  useDocumentMetadata(pageContent.title, pageContent.meta);

  return (
    <main className="site-page working-with-joel-page">
      <section className="hero-section hero-bg--default">
        <Container>
          <div className="hero-top working-with-joel-page__hero-top">
            <div className="working-with-joel-page__hero-heading">
              <span className="hero-badge">{hero.badge}</span>
              <h1 className="hero-display">
                {hero.title.before}
                <br />
                <em>{hero.title.emphasis}</em>
                <br />
                {hero.title.after}
              </h1>
            </div>

            <div className="hero-deck working-with-joel-page__hero-support">
              <p className="working-with-joel-page__hero-support-lead">{hero.supportLead}</p>
              <p className="working-with-joel-page__hero-support-body">{hero.supportBody}</p>
            </div>
          </div>

          <ul className="hero-support-tagline working-with-joel-page__hero-credentials">
            {hero.credentials.map((credential) => (
              <li key={credential}>{credential}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="site-grid working-with-joel-page__intro">
        <Container className="site-split">
          <div className="section-heading working-with-joel-page__intro-heading">
            <h2 className="working-with-joel-page__intro-title">{introduction.title}</h2>
            <aside
              className="hero-media-note working-with-joel-page__intro-note"
              aria-label="About Joel Griffiths"
            >
              <div className="hero-media-note__image">
                <img src={portraitSrc} alt="" />
              </div>
              <div className="hero-media-note__caption">
                <strong>{hero.portrait.name}</strong>
                <span>{hero.portrait.descriptor}</span>
              </div>
            </aside>
          </div>

          <article className="site-copy-panel rich-text">
            {introduction.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Container>
      </section>

      <section className="site-highlight working-with-joel-page__approach">
        <Container className="working-approach">
          <div className="working-approach__header">
            <div className="section-heading working-with-joel-page__approach-heading">
              <span className="site-eyebrow">{approach.eyebrow}</span>
              <h2 className="working-with-joel-page__approach-title">{approach.title}</h2>
            </div>
            <div className="working-approach__overview rich-text">
              {approach.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="working-approach__accordion" aria-label="How Joel works in counselling">
            {approach.items.map((item, index) => {
              const isOpen = openApproachIndex === index;
              const triggerId = `${approachBaseId}-approach-trigger-${index}`;
              const panelId = `${approachBaseId}-approach-panel-${index}`;

              return (
                <article className="working-approach__item" data-open={isOpen ? "true" : "false"} key={item.title}>
                  <h3 className="working-approach__item-heading">
                    <button
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      className="working-approach__trigger"
                      id={triggerId}
                      onClick={() => setOpenApproachIndex((currentIndex) => (currentIndex === index ? null : index))}
                      type="button"
                    >
                      <span className="working-approach__trigger-copy">
                        <span className="working-approach__item-title">{item.title}</span>
                        <span className="working-approach__summary">{item.summary}</span>
                      </span>
                      <span className="working-approach__icon" aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    aria-hidden={!isOpen}
                    aria-labelledby={triggerId}
                    className="working-approach__panel"
                    data-open={isOpen ? "true" : "false"}
                    id={panelId}
                    ref={(node) => {
                      if (node) {
                        node.inert = !isOpen;
                      }
                    }}
                    role="region"
                  >
                    <div className="working-approach__panel-inner">
                      {item.details.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        className="site-grid working-topics"
        aria-labelledby="working-with-joel-focus-title"
      >
        <Container>
          <div className="site-grid__heading working-topics__header">
            <span className="site-eyebrow">{focus.eyebrow}</span>
            <h2 id="working-with-joel-focus-title">{focus.title}</h2>
          </div>

          <div className="working-topics__panel">
            <div className="working-topics__grid" aria-label="Examples of what people bring to counselling">
              {focus.items.map((item, index) => (
                <article
                  key={item.title}
                  className={getWorkingTopicClassName(hasTabletOrphan && index === focus.items.length - 1)}
                >
                  <h3 className="working-topics__item-title">{item.title}</h3>
                  <p className="working-topics__item-body">{item.body}</p>
                </article>
              ))}
            </div>

            <article className="working-topics__item working-topics__item--closing">
              <h3 className="working-topics__item-title">{focus.closingItem.title}</h3>
              <p className="working-topics__item-body">{focus.closingItem.body}</p>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}
