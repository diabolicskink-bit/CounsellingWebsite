import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-home.css";

const portraitSrc = "/joel-griffiths-homepage-portrait.jpg";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type HomeTopic = {
  title: string;
  copy: string;
};

type HomeInclusiveDetail = {
  title: string;
  copy: string;
  href: string;
};

type HomePortrait = {
  imageSrc: string;
  label: string;
};

type HomeHeroContent = {
  eyebrow: string;
  title: EmphasisCopy;
  support: string;
  trustAriaLabel: string;
  trustItems: string[];
  portrait: HomePortrait;
};

type HomeTopicsContent = {
  heading: string;
  ariaLabel: string;
  items: HomeTopic[];
};

type HomeInclusiveContent = {
  heading: EmphasisCopy;
  copy: string;
  href: string;
  cta: string;
  detailCtaLabel: string;
  detailsAriaLabel: string;
  details: HomeInclusiveDetail[];
};

type HomeWorkroomContent = {
  heading: string;
  intro: string;
  joelName: string;
  joelCopy: string[];
  profileHref: string;
  profileCta: string;
};

type HomeClosingCtaContent = {
  heading: EmphasisCopy;
  href: string;
  cta: string;
};

type HomePageContent = {
  title: string;
  meta: string;
  hero: HomeHeroContent;
  topics: HomeTopicsContent;
  inclusive: HomeInclusiveContent;
  workroom: HomeWorkroomContent;
  closingCta: HomeClosingCtaContent;
};

const homeMetadata = getRouteMetadata("/");

const homePageContent: HomePageContent = {
  title: homeMetadata.title,
  meta: homeMetadata.description,
  hero: {
    eyebrow: "Online counselling across Australia",
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
      label: "Joel Griffiths",
    },
  },
  topics: {
    heading: "What people bring.",
    ariaLabel: "Common themes",
    items: [
      {
        title: "Low mood and depression",
        copy: "Heaviness, numbness, hopelessness, or a flatness that does not lift and is hard to explain. Feeling distant from yourself, from other people, or from things that used to matter.",
      },
      {
        title: "Anxiety",
        copy: "A mind that will not settle. Going over the same things, bracing for things that have not happened yet, or carrying a background worry that is hard to name or put down.",
      },
      {
        title: "Relationships and attachment",
        copy: "Feeling disconnected, stuck in the same arguments, or unable to get as close as you want to be. Ongoing conflict, or patterns in how you attach, trust, or pull away that keep repeating regardless of who you are with.",
      },
      {
        title: "Shame and self-worth",
        copy: "Harsh self-judgement, a persistent sense of not being enough, or something about yourself that feels too difficult or too exposing to say.",
      },
      {
        title: "Trauma, abuse, and neglect",
        copy: "Experiences of harm, control, or neglect that left a mark on how safe the world feels, how much you trust people, how close you let yourself get, or how you move through ordinary life.",
      },
      {
        title: "Intense emotions",
        copy:
          "Emotions that hit hard and are slow to come down, often with a sense of being too much. Closeness that can shift to distance without much warning.",
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
    href: routeHref(publicRoutePaths.inclusion),
    cta: "Explore inclusive counselling",
    detailCtaLabel: "Learn more",
    detailsAriaLabel: "Inclusive practice topics",
    details: [
      {
        title: "Kink & BDSM counselling",
        copy: "Nothing needs to be left out, softened, or carefully introduced.",
        href: routeHref(publicRoutePaths.kinkBdsm),
      },
      {
        title: "Polyamory & ENM counselling",
        copy: "You can speak about what is actually hard without justifying how you live first.",
        href: routeHref(publicRoutePaths.enmPolyamory),
      },
      {
        title: "LGBTQIA+ inclusive",
        copy: "Gender, sexuality, and identity can be part of the conversation, or simply part of who you are.",
        href: routeHref(publicRoutePaths.lgbtqia),
      },
    ],
  },
  workroom: {
    heading: "Wherever you are is the place to begin.",
    intro:
      "You do not need to have it sorted before you arrive. You do not need a clear explanation of what is wrong, the right words, or a sense that things are bad enough to justify coming. If something has been sitting with you, even vaguely, even without a name, that is enough to start. It begins with a conversation, and the conversation can start anywhere.",
    joelName: "Joel Griffiths",
    joelCopy: [
      "I do not think people are meant to be tidy. The strange bits, the contradictions, the parts of yourself that do not quite fit anywhere. Those belong here too.",
      "Sessions are a straightforward conversation. We can speak plainly, look beneath the immediate problem, and take what you bring seriously without making therapy feel stiff or clinical.",
    ],
    profileHref: routeHref(publicRoutePaths.workingWithJoel),
    profileCta: "More about how I work",
  },
  closingCta: {
    heading: {
      before: "For when ",
      emphasis: '"I just need to talk to someone."',
      after: "",
    },
    href: routeHref(publicRoutePaths.contact),
    cta: "Get in touch",
  },
};

function HomeHeroSection({ hero }: { hero: HomeHeroContent }) {
  return (
    <section className="hero-section hero-bg--default">
      <Container>
        <div className="hero-top hero-top--supporting-media">
          <div>
            <h1 className="hero-badge">{hero.eyebrow}</h1>
            <h2 className="hero-display">
              {hero.title.before}
              <em>{hero.title.emphasis}</em>
              {hero.title.after}
            </h2>
            <div className="hero-copy-panel home-page__hero-support">
              <p>{hero.support}</p>
              <ul className="hero-support-tagline" aria-label={hero.trustAriaLabel}>
                {hero.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <HeroPortrait portrait={hero.portrait} />
        </div>
      </Container>
    </section>
  );
}

function HeroPortrait({ portrait }: { portrait: HomePortrait }) {
  return (
    <div className="hero-media-note hero-media-note--portrait">
      <div className="hero-media-note__image">
        <img src={portrait.imageSrc} alt="" decoding="async" fetchPriority="high" />
      </div>
      <span className="hero-media-note__tag">{portrait.label}</span>
    </div>
  );
}

function TopicsSection({ topics }: { topics: HomeTopicsContent }) {
  return (
    <section className="site-grid">
      <Container>
        <h2 className="home-topics__heading">{topics.heading}</h2>

        <ul className="home-topics__grid" aria-label={topics.ariaLabel}>
          {topics.items.map((topic) => (
            <li className="home-topics__cell" key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.copy}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function WorkroomSection({ workroom }: { workroom: HomeWorkroomContent }) {
  return (
    <section className="site-highlight">
      <Container>
        <div className="site-split home-workroom__split">
          <div className="section-heading home-workroom__intro">
            <h2>{workroom.heading}</h2>
            <p className="section-heading__copy site-ruled-paragraph">{workroom.intro}</p>
          </div>

          <JoelCard workroom={workroom} />
        </div>
      </Container>
    </section>
  );
}

function JoelCard({ workroom }: { workroom: HomeWorkroomContent }) {
  return (
    <article className="site-card home-workroom__joel">
      <h3 className="home-workroom__joel-name">{workroom.joelName}</h3>
      <div className="home-workroom__joel-body">
        {workroom.joelCopy.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Button href={workroom.profileHref} variant="tertiary">
        {workroom.profileCta} <ArrowRight size={16} />
      </Button>
    </article>
  );
}

function InclusiveSection({ inclusive }: { inclusive: HomeInclusiveContent }) {
  return (
    <section className="site-grid">
      <Container>
        <div className="home-page__inclusive-frame">
          <div className="home-page__inclusive-main">
            <h2>
              {inclusive.heading.before}
              <em className="site-emphasis">{inclusive.heading.emphasis}</em>
              {inclusive.heading.after}
            </h2>
            <p className="site-ruled-paragraph site-ruled-paragraph--wide">{inclusive.copy}</p>
            <Button href={inclusive.href} variant="tertiary">
              {inclusive.cta} <ArrowRight size={16} />
            </Button>
          </div>

          <nav className="home-page__inclusive-details" aria-label={inclusive.detailsAriaLabel}>
            <ul className="site-detail-stack site-detail-stack--linked home-page__inclusive-list">
              {inclusive.details.map((detail) => (
                <InclusiveDetailItem
                  detail={detail}
                  ctaLabel={inclusive.detailCtaLabel}
                  key={detail.title}
                />
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}

function InclusiveDetailItem({ detail, ctaLabel }: { detail: HomeInclusiveDetail; ctaLabel: string }) {
  return (
    <li className="site-detail-stack__item">
      <Link className="site-detail-stack__link" to={detail.href}>
        <span className="site-detail-stack__heading">
          <strong className="site-detail-stack__title">{detail.title}</strong>
          <span className="site-detail-stack__action">
            {ctaLabel}
            <ArrowRight className="site-detail-stack__icon" size={16} aria-hidden="true" />
          </span>
        </span>
      </Link>
      <p className="site-detail-stack__copy">{detail.copy}</p>
    </li>
  );
}

function ClosingCtaSection({ closingCta }: { closingCta: HomeClosingCtaContent }) {
  return (
    <section className="site-highlight site-cta-block">
      <Container className="site-cta-block__inner">
        <div className="site-cta-block__copy">
          <h2>
            {closingCta.heading.before}
            <span className="site-emphasis">{closingCta.heading.emphasis}</span>
            {closingCta.heading.after}
          </h2>
        </div>
        <Button href={closingCta.href}>
          {closingCta.cta} <ArrowRight size={16} />
        </Button>
      </Container>
    </section>
  );
}

export default function Home() {
  useDocumentMetadata(homePageContent.title, homePageContent.meta);
  const { hero, topics, inclusive, workroom, closingCta } = homePageContent;

  return (
    <main className="site-page home-page">
      <HomeHeroSection hero={hero} />
      <TopicsSection topics={topics} />
      <WorkroomSection workroom={workroom} />
      <InclusiveSection inclusive={inclusive} />
      <ClosingCtaSection closingCta={closingCta} />
    </main>
  );
}
