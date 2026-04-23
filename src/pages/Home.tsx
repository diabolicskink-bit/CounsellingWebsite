import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import "../styles-home.css";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type HomeTopicTile = {
  title: string;
  copy: string;
  layoutClass: string;
  toneClass?: string;
};

type HomeInclusiveDetail = {
  title: string;
  copy: string;
  href: string;
};

type HomePageContent = {
  title: string;
  meta: string;
  hero: {
    title: EmphasisCopy;
    support: string;
    trustAriaLabel: string;
    trustItems: string[];
    portrait: {
      imageSrc: string;
      ariaLabel: string;
      name: string;
      descriptor: string;
    };
  };
  topics: {
    heading: string;
    ariaLabel: string;
    items: HomeTopicTile[];
  };
  inclusive: {
    heading: EmphasisCopy;
    copy: string;
    href: string;
    cta: string;
    detailCtaLabel: string;
    detailsAriaLabel: string;
    details: HomeInclusiveDetail[];
  };
  workroom: {
    heading: string;
    intro: string;
    letterLabel: string;
    letterCopy: string;
    profileHref: string;
    profileCta: string;
    closingLead: string;
    closingAccent: string;
    ctaHref: string;
    cta: string;
  };
};

const homePageContent: HomePageContent = {
  title: "Vive Counselling | Online counselling across Australia",
  meta: "Online counselling for adults across Australia with Joel Griffiths. Grounded, thoughtful, inclusive, and non-shaming support.",
  hero: {
    title: {
      before: "Counselling for when life feels ",
      emphasis: "hard to untangle",
      after: ".",
    },
    support:
      "I offer online counselling for adults across Australia, based in Perth. I work with anxiety, relationship strain, self-criticism, trauma, sexuality, and experiences that feel exposing, confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.",
    trustAriaLabel: "Practice details",
    trustItems: [
      "Perth-based, online across Australia",
      "Individual counselling",
      "Serious, thoughtful, and human",
      "Kink-, ENM-, and LGBTQIA+-aware",
    ],
    portrait: {
      imageSrc: portraitSrc,
      ariaLabel: "About Joel Griffiths",
      name: "Joel Griffiths",
      descriptor: "Counselling and psychodynamic psychotherapy",
    },
  },
  topics: {
    heading: "What counselling is for.",
    ariaLabel: "Common themes",
    items: [
      {
        title: "Low mood and depression",
        copy: "Heaviness, numbness, hopelessness, or a flatness that does not lift and is hard to explain. Feeling distant from yourself, from other people, or from things that used to matter.",
        layoutClass: "home-topics__tile--middle",
        toneClass: "site-topic-card--soft",
      },
      {
        title: "Anxiety and overthinking",
        copy: "A mind that will not settle. Going over the same things, bracing for things that have not happened yet, or carrying a background worry that is hard to name or put down.",
        layoutClass: "home-topics__tile--wide",
      },
      {
        title: "Relationships and attachment",
        copy: "Feeling disconnected, stuck in the same arguments, or unable to get as close as you want to be. Ongoing conflict, or patterns in how you attach, trust, or pull away that keep repeating regardless of who you are with.",
        layoutClass: "home-topics__tile--lift",
        toneClass: "site-topic-card--narrow",
      },
      {
        title: "Shame and self-worth",
        copy: "Harsh self-judgement, a persistent sense of not being enough, or something about yourself that feels too difficult or too exposing to say.",
        layoutClass: "home-topics__tile--soft",
        toneClass: "site-topic-card--muted",
      },
      {
        title: "Trauma, abuse, and neglect",
        copy: "Experiences of harm, control, or neglect that left a mark on how safe the world feels, how much you trust people, how close you let yourself get, or how you move through ordinary life.",
        layoutClass: "home-topics__tile--deep",
        toneClass: "site-topic-card--soft",
      },
      {
        title: "Intense emotions",
        copy: 
"Emotions that hit hard and are slow to come down, often with a sense of being too much. Closeness that can shift to distance without much warning." ,       layoutClass: "home-topics__tile--quiet",
        toneClass: "site-topic-card--muted",
      },
    ],
  },
  inclusive: {
    heading: {
      before: "Bring ",
      emphasis: "all",
      after: " of yourself.",
    },
    copy: "If your relationships, sexuality, or identity sit outside what people usually assume, you may be used to doing extra work before you can talk about what is actually difficult. Explaining the basics. Adding caveats. Holding things back. Watching for judgement. Wondering whether something important about your life will be misunderstood, judged, or treated as though it is the problem. Here, you do not need to do that. You can speak plainly, without defending yourself first.",
    href: "/inclusion",
    cta: "Explore inclusive counselling",
    detailCtaLabel: "Learn more",
    detailsAriaLabel: "Inclusive practice topics",
    details: [
      {
        title: "Kink & BDSM counselling",
        copy: "Nothing needs to be left out, softened, or carefully introduced.",
        href: "/inclusion/kink-bdsm",
      },
      {
        title: "Polyamory & ENM counselling",
        copy: "You can speak about what is actually hard without justifying how you live first.",
        href: "/inclusion/enm-polyamory",
      },
      {
        title: "LGBTQIA+ inclusive",
        copy: "Gender, sexuality, and identity can be part of the conversation, or simply part of who you are.",
        href: "/inclusion/lgbtqia",
      },
    ],
  },
  workroom: {
    heading: "Wherever you are is the place to begin.",
    intro:
      "You do not need to have it sorted before you arrive. You do not need a clear explanation of what is wrong, the right words, or a sense that things are bad enough to justify coming. If something has been sitting with you, even vaguely, even without a name, that is enough to start. It begins with a conversation, and the conversation can start anywhere.",
    letterLabel: "Working with Joel",
    letterCopy:
      "Sessions are direct and real. We can speak plainly, look beneath the immediate problem, and take what you bring seriously without making therapy feel stiff or clinical. I do not think people are meant to be tidy. The strange bits, the contradictions, the parts that do not quite fit anywhere, all of that belongs here.",
    profileHref: "/working-with-joel",
    profileCta: "Working with Joel",
    closingLead: "For when",
    closingAccent: '"I just need to talk to someone."',
    ctaHref: "/contact",
    cta: "Get in touch",
  },
};

function useSeo() {
  useEffect(() => {
    document.title = homePageContent.title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = homePageContent.meta;
    }
  }, []);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const sync = () => setMatches(mediaQuery.matches);

    sync();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, [query]);

  return matches;
}

export default function Home() {
  useSeo();
  const isCompactTopics = useMediaQuery("(max-width: 1080px)");
  const isMobileTopics = useMediaQuery("(max-width: 700px)");
  const { hero, topics, inclusive, workroom } = homePageContent;

  return (
    <main className="site-page home-page">
      <section className="hero-section hero-bg--default home-page__hero">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div className="home-page__hero-copy">
              <h1 className="hero-display home-page__hero-title">
                {hero.title.before}
                <em>{hero.title.emphasis}</em>
                {hero.title.after}
              </h1>
              <div className="hero-copy-panel home-page__hero-support">
                <p>{hero.support}</p>
                <ul className="hero-support-tagline" aria-label={hero.trustAriaLabel}>
                  {hero.trustItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="hero-media-note" aria-label={hero.portrait.ariaLabel}>
              <div className="hero-media-note__image">
                <img src={hero.portrait.imageSrc} alt="" />
              </div>
              <div className="hero-media-note__caption">
                <strong>{hero.portrait.name}</strong>
                <span>{hero.portrait.descriptor}</span>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid home-page__topics">
        <Container className="home-topics__grid">
          <div className="home-topics__intro site-grid__heading">
            <h2>{topics.heading}</h2>
          </div>

          <div className="home-topics__tiles" aria-label={topics.ariaLabel}>
            {topics.items.map((topic) => (
              <details
                className={`home-topics__tile site-topic-card ${isCompactTopics ? "site-card" : ""} ${topic.layoutClass} ${topic.toneClass ?? ""}`.trim()}
                key={topic.title}
                open={!isMobileTopics}
              >
                <summary className="home-topics__summary">
                  <h3>{topic.title}</h3>
                  <span className="home-topics__toggle" aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </summary>
                <div className="home-topics__body">
                  <p>{topic.copy}</p>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight home-page__inclusive">
        <Container>
          <div className="home-page__inclusive-frame">
            <div className="home-page__inclusive-main">
              <h2>
                {inclusive.heading.before}
                <em className="site-emphasis">{inclusive.heading.emphasis}</em>
                {inclusive.heading.after}
              </h2>
              <p className="home-page__inclusive-copy site-ruled-paragraph">{inclusive.copy}</p>
              <Button href={inclusive.href} variant="secondary">
                {inclusive.cta} <ArrowRight size={16} />
              </Button>
            </div>

            <div className="home-page__inclusive-support">
              <div className="home-page__inclusive-items site-detail-stack" aria-label={inclusive.detailsAriaLabel}>
                {inclusive.details.map((detail) => (
                  <div className="home-page__inclusive-item" key={detail.title}>
                    <Link className="home-page__inclusive-link" to={detail.href}>
                      <span className="home-page__inclusive-heading">
                        <strong>{detail.title}</strong>
                        <span className="home-page__inclusive-action">
                          {inclusive.detailCtaLabel}
                          <ArrowRight className="home-page__inclusive-icon" size={16} aria-hidden="true" />
                        </span>
                      </span>
                    </Link>
                    <p className="home-page__inclusive-item-copy">{detail.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-grid home-page__workroom">
        <Container className="home-workroom">
          <div className="site-split home-workroom__split">
            <div className="section-heading home-workroom__intro">
              <h2>{workroom.heading}</h2>
              <p className="section-heading__copy site-ruled-paragraph">{workroom.intro}</p>
            </div>

            <article className="site-copy-panel home-workroom__letter">
              <span className="site-highlight__eyebrow">{workroom.letterLabel}</span>
              <p>{workroom.letterCopy}</p>
              <div className="home-workroom__letter-actions">
                <Button href={workroom.profileHref} variant="tertiary">
                  {workroom.profileCta}
                </Button>
              </div>
            </article>
          </div>

          <div className="home-workroom__next">
            <p>
              {workroom.closingLead} <span>{workroom.closingAccent}</span>
            </p>
            <div>
              <Button href={workroom.ctaHref}>
                {workroom.cta} <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
