import { useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/Container";
import "../styles-working-with-joel.css";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type FocusGroup = {
  title: string;
  body: string;
  terms: string;
  layoutClass: string;
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
    items: FocusGroup[];
    closingTitle: string;
    closingBody: string;
    cta: {
      label: string;
      href: string;
    };
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
      "If you have worked with therapists before and found it stayed on the surface, or focused on coping tools without looking at what was driving the need for them, this tends to feel different.",
    ],
  },
  focus: {
    title: "What people often bring",
    intro:
      "People rarely arrive with a neat label for what is going on. Sometimes it is obvious. Often it is not. You may only know that something keeps hurting, repeating, escalating, or wearing you down. These are some of the ways it can show up.",
    items: [
      {
        title: "When you are hard on yourself",
        body:
          "Shame, self-criticism, and perfectionism can show up as relentless standards, constant second-guessing, or the sense that one mistake says too much about who you are. It can sit behind apology, withdrawal, over-explaining, or never quite feeling at ease with yourself.",
        terms: "Shame, self-criticism, perfectionism",
        layoutClass: "working-with-joel-page__focus-card--wide-left",
        toneClass: "working-with-joel-page__focus-card--soft",
      },
      {
        title: "When relationships keep getting stuck",
        body:
          "Closeness can become tangled with fear, conflict, pleasing, distance, mistrust, or the feeling that the same pattern keeps returning in different relationships. Sometimes the difficulty is obvious. Sometimes it only becomes visible afterwards.",
        terms: "Relationships, attachment",
        layoutClass: "working-with-joel-page__focus-card--narrow-right",
      },
      {
        title: "When your system stays on edge",
        body:
          "Anxiety and trauma do not always look dramatic. They can look like bracing, overthinking, shutdown, irritability, numbness, quick anger, or a body that never quite settles. The present can feel more charged than it ought to.",
        terms: "Anxiety, trauma",
        layoutClass: "working-with-joel-page__focus-card--half",
      },
      {
        title: "When being different has been exhausting",
        body:
          "Neurodivergence can sit beneath years of masking, burnout, self-doubt, and being misunderstood. The work is not about forcing you into someone else's shape. It is about understanding how you function, what has worn you down, and what might help life feel more workable.",
        terms: "Neurodivergence",
        layoutClass: "working-with-joel-page__focus-card--half",
        toneClass: "working-with-joel-page__focus-card--soft",
      },
      {
        title: "When desire or identity feel difficult to speak about safely",
        body:
          "Sexuality, kink, BDSM, fantasy, power, boundaries, shame, and pleasure can be hard to bring into therapy when you expect to be reduced, pathologised, or misunderstood. They should be able to be spoken about plainly, without becoming the whole explanation for who you are.",
        terms: "Sexuality, kink and BDSM",
        layoutClass: "working-with-joel-page__focus-card--narrow-left",
      },
      {
        title: "When relationships do not fit the usual script",
        body:
          "Polyamory and ENM can bring ordinary relationship pain in a less ordinary structure: agreements, jealousy, comparison, hierarchy, repair, disclosure, breakups, and the strain of having the structure treated as the problem.",
        terms: "Polyamory, ENM",
        layoutClass: "working-with-joel-page__focus-card--wide-right",
        toneClass: "working-with-joel-page__focus-card--soft",
      },
    ],
    closingTitle: "These things often overlap.",
    closingBody:
      "You do not need the right label before getting in touch. A first enquiry can be simple. Start with what is happening, what feels difficult, or what keeps repeating. We can work out the shape of it together.",
    cta: {
      label: "Get in touch",
      href: "/contact",
    },
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

      <section className="site-grid working-with-joel-page__focus" aria-labelledby="working-with-joel-focus-title">
        <Container className="working-with-joel-page__focus-wrap">
          <div className="working-with-joel-page__focus-intro">
            <div className="working-with-joel-page__focus-heading">
              <h2 id="working-with-joel-focus-title">{focus.title}</h2>
            </div>

            <div className="working-with-joel-page__focus-copy">
              <p className="section-heading__copy">{focus.intro}</p>
            </div>
          </div>

          <div className="working-with-joel-page__focus-grid" aria-label="Examples of what people bring to counselling">
            {focus.items.map((item) => (
              <article
                className={[
                  "working-with-joel-page__focus-card",
                  item.layoutClass,
                  item.toneClass,
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={item.title}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="working-with-joel-page__focus-terms">
                  <span>Can include</span> {item.terms}
                </p>
              </article>
            ))}
          </div>

          <div className="working-with-joel-page__focus-bridge">
            <div className="working-with-joel-page__focus-bridge-copy">
              <h3>{focus.closingTitle}</h3>
              <p>{focus.closingBody}</p>
            </div>

            <Button href={focus.cta.href} variant="primary" className="working-with-joel-page__focus-button">
              {focus.cta.label}
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
