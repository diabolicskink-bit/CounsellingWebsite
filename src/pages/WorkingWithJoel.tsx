import BroadTabPanel from "../components/BroadTabPanel";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-working-with-joel.css";

const portraitSrc = "/joel-griffiths-working-with-joel-portrait.jpg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type WorkingHeroPortrait = {
  imageSrc: string;
  alt: string;
  ariaLabel: string;
  name: string;
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
    badge: "Working with Joel",
    title: {
      before: "Working with ",
      emphasis: "the bigger",

                  after: " picture.",
    },
    supportLead: "Life is complicated.",


    supportBody:
      "Here, the complexity isn't something to get past. It's what we actually work with.",

    credentialsAriaLabel: "Joel Griffiths credentials and practice details",
               credentials: [
      "GradDip. Counselling and Psychotherapy",
      "ACA Registered",
      "Kink & ENM informed",
              "LGBTQIA+ affirming",
    ],
    portrait: {
      imageSrc: portraitSrc,
      alt: "Joel Griffiths",
      ariaLabel: "About Joel Griffiths",
      name: "Joel Griffiths",
    },
  },
  introduction: {
    title: "Introducing Joel",
    paragraphs: [
      "I'm Joel Griffiths, an ACA-registered counsellor based in Perth. I work with adults across Australia.",
      "As a counsellor, I'm interested in the whole person. Not only what you are struggling with, but what has shaped it. The anxiety, relationship strain, self-criticism, shame, trauma, sexuality, or intimacy concerns people bring to therapy usually have a history. They often sit alongside ways of coping that once helped, but now feel harder to live with.",
      "I work in a direct, thoughtful, and non-shaming way. I am comfortable with complexity, including the parts of life that do not fit neatly into a simple explanation.",
    ],
  },
  approach: {
    title: "How I work",
    overview: ["My work is psychodynamic and attachment-informed, held within an integrative frame. In practice, that means looking beneath the immediate problem to what shaped it, what purpose it has served, and how it now shows up in relationships, work, shame, desire, anger, and the session itself.",
"The work balances what feels immediate and pressing with developing a clearer, more honest understanding of yourself. Some sessions may be about untangling something happening right now. Others may slow down around the way you respond, withdraw, overthink, accommodate, protect yourself, or lose contact with what you want."    ],
    items: [
      {
        title: "Psychodynamic",
        details: [
"Psychodynamic work pays attention to the parts of experience that are active but not always obvious. These can include old conflicts, defences, shame, desire, anger, avoidance, and familiar forms of coping that keep recurring even when they no longer fit.",       

"The work is not about forcing a tidy explanation onto your life. It is about understanding what sits beneath the visible problem, including the feelings, protections, and expectations that can operate unconsciously and shape how you relate to yourself, to other people, and to the work between us."        ],
      },
      {
        title: "Attachment",
        details: [
"Attachment work looks at how you learned to manage closeness, distance, dependence, trust, and self-protection. These early lessons can keep shaping adult relationships, often through strategies that once helped you stay safe or connected, but now create strain.",
"This can include how you manage conflict, jealousy, rupture, repair, need, withdrawal, people-pleasing, or the fear of being too much. The point is to understand the strategy before trying to change the strategy."        ],
      },
      {
        title: "Integrative",
        details: [
"Integrative counselling recognises that people are complicated and no single theory explains everything. A problem may involve old relational learning, current stress, shame, grief, desire, avoidance, nervous system responses, identity, or the reality of the situation you are living inside.",
"Working integratively means we can move between these levels without losing the thread. I may draw on psychodynamic, attachment, trauma-informed, relational, practical, or skills-based ideas, but the focus stays on what is useful for understanding you and supporting meaningful change."        ],
      },
    ],
  },
  focus: {
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
        <div className="working-with-joel-page__hero-layout">
          <div className="working-with-joel-page__hero-heading">
            <h1 className="hero-badge">{hero.badge}</h1>
            <p className="hero-display">
              {hero.title.before}
              <br />
              <em>{hero.title.emphasis}</em>
              <br />
              {hero.title.after}
            </p>
          </div>

          <div className="working-with-joel-page__hero-note">
            <p className="working-with-joel-page__hero-note-lead">
              {hero.supportLead}





            </p>
            <p className="working-with-joel-page__hero-note-body site-body-copy">{hero.supportBody}</p>
          </div>

          <CredentialsList items={hero.credentials} ariaLabel={hero.credentialsAriaLabel} />
        </div>
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
        <div className="working-with-joel-page__intro-copy">
          <article className="site-copy-panel rich-text working-with-joel-page__intro-panel">
            <h2 id="working-with-joel-intro-title">{introduction.title}</h2>
            {introduction.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </div>

        <div className="working-with-joel-page__intro-media">
          <PortraitNote portrait={portrait} />
        </div>
      </Container>
    </section>
  );
}

function PortraitNote({ portrait }: { portrait: WorkingHeroPortrait }) {
  return (
    <aside
      className="hero-media-note hero-media-note--portrait working-with-joel-page__intro-note"
      aria-label={portrait.ariaLabel}
    >
      <div className="hero-media-note__image">
        <img src={portrait.imageSrc} alt={portrait.alt} loading="lazy" decoding="async" />
      </div>
      <span className="hero-media-note__tag" aria-hidden="true">
        {portrait.name}
      </span>
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
