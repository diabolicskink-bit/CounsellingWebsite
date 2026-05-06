import BroadTabPanel from "../components/BroadTabPanel";
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

type WorkingHeroPortrait = {
  imageSrc: string;
  ariaLabel: string;
  name: string;
  descriptor: string;
};

type WorkingHeroContent = {
  badge: string;
  title: EmphasisCopy;
  supportLead: string;
  supportBody: string;
  credentialsAriaLabel: string;
  credentials: string[];
  portrait: WorkingHeroPortrait;
};

type IntroductionContent = {
  title: string;
  paragraphs: string[];
};

type ApproachItem = {
  title: string;
  details: string[];
};

type ApproachContent = {
  title: string;
  overview: string[];
  items: ApproachItem[];
};

type FocusItem = {
  title: string;
  body: string;
};

type FocusContent = {
  eyebrow: string;
  title: string;
  itemsAriaLabel: string;
  items: FocusItem[];
  closingItem: FocusItem;
};

type WorkingWithJoelPageContent = {
  title: string;
  meta: string;
  hero: WorkingHeroContent;
  introduction: IntroductionContent;
  approach: ApproachContent;
  focus: FocusContent;
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
    credentialsAriaLabel: "Joel Griffiths credentials and practice details",
    credentials: [
      "GradDip. Counselling and Psychotherapy",
      "ACA Registered",
      "Kink & ENM informed",
      "LGBTQIA+ affirming",
    ],
    portrait: {
      imageSrc: portraitSrc,
      ariaLabel: "About Joel Griffiths",
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
    title: "How I work",
    overview: [
      "My work is psychodynamic and attachment-informed, held within an integrative frame. In practice, that means paying attention to the pattern beneath the immediate problem: how it formed, how it protects you, and how it shows up in relationships, work, shame, desire, anger, and the room itself.",
      "Sessions can include practical reflection, but the centre of the work is formulation: making sense of what is happening now in relation to older templates, current pressures, and the parts of experience that have had to stay less conscious.",
    ],
    items: [
      {
        title: "Psychodynamic",
        details: [
          "Psychodynamic work pays attention to the parts of experience that are active but not always obvious: old conflicts, defences, shame, desire, anger, avoidance, and the ways a familiar pattern can repeat even when you are trying to do something different.",
          "The work is not about forcing a neat explanation onto your life. It is a shared formulation of what might be happening underneath the visible problem, including how that pattern may appear between us in the room.",
        ],
      },
      {
        title: "Attachment",
        details: [
          "Attachment work looks at how closeness, distance, dependence, trust, and self-protection were learned. Those early relational templates can keep shaping adult relationships, often through strategies that once made sense but now create strain.",
          "This can include how you manage conflict, jealousy, rupture, repair, need, withdrawal, people-pleasing, or the fear of being too much. The point is to understand the strategy before trying to change the strategy.",
        ],
      },
      {
        title: "Integrative",
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
    itemsAriaLabel: "Examples of what people bring to counselling",
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

function WorkingHeroSection({ hero }: { hero: WorkingHeroContent }) {
  return (
    <section className="hero-section hero-bg--default working-with-joel-page__hero">
      <Container>
        <div className="hero-top working-with-joel-page__hero-top">
          <div className="working-with-joel-page__hero-heading">
            <h1 className="hero-badge">{hero.badge}</h1>
            <h2 className="hero-display">
              {hero.title.before}
              <br />
              <em>{hero.title.emphasis}</em>
              <br />
              {hero.title.after}
            </h2>
          </div>

          <div className="hero-deck working-with-joel-page__hero-support">
            <p className="hero-deck__lead working-with-joel-page__hero-support-lead">
              {hero.supportLead}
            </p>
            <p className="hero-deck__body site-body-copy">{hero.supportBody}</p>
          </div>
        </div>

        <CredentialsList items={hero.credentials} ariaLabel={hero.credentialsAriaLabel} />
      </Container>
    </section>
  );
}

function CredentialsList({ items, ariaLabel }: { items: string[]; ariaLabel: string }) {
  return (
    <ul className="hero-support-tagline working-with-joel-page__hero-credentials" aria-label={ariaLabel}>
      {items.map((credential) => (
        <li key={credential}>{credential}</li>
      ))}
    </ul>
  );
}

function IntroductionSection({
  introduction,
  portrait,
}: {
  introduction: IntroductionContent;
  portrait: WorkingHeroPortrait;
}) {
  return (
    <section className="site-grid working-with-joel-page__intro" aria-labelledby="working-with-joel-intro-title">
      <Container className="site-split">
        <div className="section-heading working-with-joel-page__intro-heading">
          <h2 className="working-with-joel-page__section-title" id="working-with-joel-intro-title">
            {introduction.title}
          </h2>
          <PortraitNote portrait={portrait} />
        </div>

        <article className="site-copy-panel rich-text">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </Container>
    </section>
  );
}

function PortraitNote({ portrait }: { portrait: WorkingHeroPortrait }) {
  return (
    <aside className="hero-media-note working-with-joel-page__intro-note" aria-label={portrait.ariaLabel}>
      <div className="hero-media-note__image">
        <img src={portrait.imageSrc} alt="" />
      </div>
      <div className="hero-media-note__caption">
        <strong>{portrait.name}</strong>
        <span>{portrait.descriptor}</span>
      </div>
    </aside>
  );
}

function ApproachSection({ approach }: { approach: ApproachContent }) {
  const tabItems = approach.items.map((item) => ({
    title: item.title,
    content: item.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>),
  }));

  return (
    <section className="site-highlight working-with-joel-page__approach" aria-labelledby="working-approach-title">
      <Container className="working-approach">
        <div className="section-heading working-approach__intro">
          <h2 className="working-with-joel-page__section-title" id="working-approach-title">
            {approach.title}
          </h2>
          <div className="working-approach__overview">
            {approach.overview.map((paragraph) => (
              <p className="section-heading__copy" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <BroadTabPanel ariaLabel="Counselling approach" items={tabItems} />
      </Container>
    </section>
  );
}

function FocusSection({ focus }: { focus: FocusContent }) {
  const focusItems = [...focus.items, focus.closingItem];

  return (
    <section className="site-grid working-topics" aria-labelledby="working-with-joel-focus-title">
      <Container>
        <div className="site-grid__heading working-topics__header">
          <span className="site-eyebrow">{focus.eyebrow}</span>
          <h2 className="working-with-joel-page__section-title" id="working-with-joel-focus-title">
            {focus.title}
          </h2>
        </div>

        <div className="working-topics__panel">
          <ul className="working-topics__list" aria-label={focus.itemsAriaLabel}>
            {focusItems.map((item, index) => {
              const isClosingItem = index === focusItems.length - 1;

              return <FocusTopicItem item={item} isClosingItem={isClosingItem} key={item.title} />;
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function FocusTopicItem({
  item,
  isClosingItem,
}: {
  item: FocusItem;
  isClosingItem: boolean;
}) {
  const itemClassName = isClosingItem
    ? "working-topics__item working-topics__item--closing"
    : "working-topics__item";

  return (
    <li className={itemClassName}>
      <h3 className="working-topics__item-title">{item.title}</h3>
      <p className="working-topics__item-body">{item.body}</p>
    </li>
  );
}

export default function WorkingWithJoel() {
  const { hero, introduction, approach, focus } = pageContent;

  useDocumentMetadata(pageContent.title, pageContent.meta);

  return (
    <main className="site-page working-with-joel-page">
      <WorkingHeroSection hero={hero} />
      <IntroductionSection introduction={introduction} portrait={hero.portrait} />
      <ApproachSection approach={approach} />
      <FocusSection focus={focus} />
    </main>
  );
}
