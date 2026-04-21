import { useEffect } from "react";
import Container from "../components/Container";
import "../styles-working-with-joel.css";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type FocusCard = {
  title: string;
  layoutClass?: string;
  toneClass?: string;
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
    title: string;
    intro: string;
    items: FocusCard[];
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
    title: "An integrative, psychodynamically informed approach",
    paragraphs: [
      "My approach is grounded in psychodynamic and attachment-based thinking. That means I am interested not just in what is happening now but in what is shaping it, where it came from, what keeps it going, and what might be maintaining it beneath the surface.",
      "Attachment is central to how I work. The ways people learn closeness, distance, trust, and self-protection early in life tend to continue organising how they relate as adults, often without being fully visible. That is often where the most useful work happens.",
      "The approach is integrative, which means I am not tied to one method. Other frameworks and tools come in where they are useful. But depth work, understanding what is actually going on rather than managing the symptoms of it, is the core of what I do.",
      "If you have worked with therapists before and found it stayed on the surface, or focused on coping tools without looking at what was driving the need for them, this tends to feel different."
    ],
  },
  focus: {
    title: "What we can work with",
    intro: "People arrive with many different things. Some have a name for what they are carrying, some do not. Some fit neatly into a category, some sit across several, and some are harder to place. The list is a starting point, not a limit.",
    items: [
      {
        title: "Shame",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--soft",
      },
      {
        title: "Self-criticism",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--paper",
      },
      {
        title: "Relationships and attachment",
        layoutClass: "working-with-joel-page__focus-pill--span-2",
        toneClass: "working-with-joel-page__focus-pill--muted",
      },
      {
        title: "Anxiety",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--paper",
      },
      {
        title: "Trauma",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--soft",
      },
      {
        title: "Neurodivergence",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--muted",
      },
      {
        title: "Perfectionism",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--soft",
      },
      {
        title: "Sexuality",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--paper",
      },
      {
        title: "Kink and BDSM",
        layoutClass: "working-with-joel-page__focus-pill--span-1",
        toneClass: "working-with-joel-page__focus-pill--muted",
      },
      {
        title: "Polyamory and ENM",
        layoutClass: "working-with-joel-page__focus-pill--span-2",
        toneClass: "working-with-joel-page__focus-pill--soft",
      },
    ],
  },
};

export default function WorkingWithJoel() {
  const { hero, approach, focus } = pageContent;

  useEffect(() => {
    document.title = pageContent.title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = pageContent.meta;
    }
  }, []);

  return (
    <main className="site-page working-with-joel-page">
      <section className="hero-section hero-bg--diagonal">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div className="working-with-joel-page__hero-copy">
              <h1 className="hero-display working-with-joel-page__hero-title">
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

            <aside className="hero-media-note working-with-joel-page__hero-note" aria-label="About Joel Griffiths">
              <div className="hero-media-note__image">
                <img src={portraitSrc} alt="" />
              </div>
              <div className="hero-media-note__caption">
                <strong>{hero.portrait.name}</strong>
                <span>{hero.portrait.descriptor}</span>
              </div>
            </aside>
          </div>

        </Container>
      </section>

      <section className="site-grid working-with-joel-page__approach">
        <Container className="site-split">
          <div className="section-heading">
            <h2>{approach.title}</h2>
          </div>

          <article className="site-copy-panel rich-text working-with-joel-page__framework-panel">
            {approach.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Container>
      </section>

      <section className="site-grid working-with-joel-page__focus">
        <Container className="site-split working-with-joel-page__focus-split">
          <div className="site-grid__heading">
            <h2>{focus.title}</h2>
            <p className="section-heading__copy site-ruled-paragraph">{focus.intro}</p>
          </div>

          <div className="working-with-joel-page__focus-cluster" aria-label="Areas of particular understanding">
            {focus.items.map((item) => (
              <span
                className={[
                  "working-with-joel-page__focus-pill",
                  item.layoutClass,
                  item.toneClass,
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={item.title}
              >
                {item.title}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
