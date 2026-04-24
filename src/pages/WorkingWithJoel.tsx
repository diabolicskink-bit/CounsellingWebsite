import Container from "../components/Container";
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

type WorkingWithJoelPageContent = {
  title: string;
  meta: string;
  hero: {
    title: EmphasisCopy;
    support: string;
    trustItems: string[];
    portrait: {
      name: string;
      descriptor: string;
    };
  };
  approach: {
    title: string;
    paragraphs: string[];
  };
  focus: {
    eyebrow: string;
    title: string;
    items: TopicItem[];
    closingItem: TopicItem;
  };
};

const pageContent: WorkingWithJoelPageContent = {
  title: "Working with Joel | Vive Counselling",
  meta:
    "Working with Joel Griffiths at Vive Counselling. Direct, thoughtful, non-shaming online counselling for adults across Australia, with particular understanding of shame, relationships, sexuality, kink, and ethical non-monogamy.",
  hero: {
    title: {
      before: "Working with ",
      emphasis: "the bigger",
      after: " picture.",
    },
    support:
      "I work in a direct and unhurried way with people who are dealing with something difficult, stuck, or hard to make sense of. The aim is not to find a neat explanation but to understand what is actually going on well enough that something can begin to change.",
    trustItems: [
      "Graduate Diploma in Counselling and Psychotherapy",
      "ACA registered counsellor",
      "Kink and ENM informed, LGBTQIA+ affirming",
    ],
    portrait: {
      name: "Joel Griffiths",
      descriptor: "Counselling and psychodynamic psychotherapy",
    },
  },
  approach: {
    title: "Introducing Joel",
    paragraphs: [
      "My approach is grounded in psychodynamic and attachment-based thinking. That means I am interested not just in what is happening now but in what is shaping it, where it came from, what keeps it going, and what might be maintaining it beneath the surface.",
      "Attachment is central to how I work. The ways people learn closeness, distance, trust, and self-protection early in life tend to continue organising how they relate as adults, often without being fully visible. That is often where the most useful work happens.",
      "The approach is integrative, which means I am not tied to one method. Other frameworks and tools come in where they are useful. But depth work, understanding what is actually going on rather than managing the symptoms of it, is the core of what I do.",
      "If you have worked with therapists before and found it stayed on the surface, or focused on coping tools without looking at what was driving the need for them, this tends to feel different.",
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
  const { hero, approach, focus } = pageContent;
  const hasTabletOrphan = focus.items.length % 2 === 1;

  useDocumentMetadata(pageContent.title, pageContent.meta);

  return (
    <main className="site-page working-with-joel-page">
      <section className="hero-section hero-bg--default">
        <Container>
          <div className="hero-top working-with-joel-page__hero-top">
            <h1 className="hero-display">
              {hero.title.before}
              <br />
              <em>{hero.title.emphasis}</em>
              <br />
              {hero.title.after}
            </h1>

            <div className="hero-copy-panel working-with-joel-page__hero-support">
              <p>{hero.support}</p>
              <ul className="hero-support-tagline" aria-label="Practice details">
                {hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-grid working-with-joel-page__approach">
        <Container className="site-split">
          <div className="section-heading working-with-joel-page__approach-heading">
            <h2 className="working-with-joel-page__approach-title">{approach.title}</h2>
            <aside
              className="hero-media-note working-with-joel-page__approach-note"
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
            {approach.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Container>
      </section>

      <section
        className="site-highlight working-topics"
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
