import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-home.css";

const portraitSrc = "/joel-griffiths-homepage-portrait.jpg";
const highPriorityImageAttributes = { fetchpriority: "high" } as const;

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type HomeInclusiveDetail = {
  title: string;
  href: string;
};

type HomePortrait = {
  imageSrc: string;
  alt: string;
  label: string;
};

type HomeHeroContent = {
  eyebrow: string;
  title: EmphasisCopy;
  contactHref: string;
  contactCta: string;
  inclusionHref: string;
  inclusionCta: string;
};

type HomeWelcomeContent = {
  heading: EmphasisCopy;
  opening: string;
  practice: string;
  href: string;
  cta: string;
};

type HomeInclusiveContent = {
  heading: EmphasisCopy;
  copy: string;
  href: string;
  cta: string;
  detailsAriaLabel: string;
  details: HomeInclusiveDetail[];
};

type HomeWorkroomContent = {
  joelName: string;
  joelCopy: string[];
  consultHref: string;
  consultCta: string;
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
  portrait: HomePortrait;
  welcome: HomeWelcomeContent;
  inclusive: HomeInclusiveContent;
  workroom: HomeWorkroomContent;
  closingCta: HomeClosingCtaContent;
};

const homeMetadata = getRouteMetadata("/");

const homePageContent: HomePageContent = {
  title: homeMetadata.title,
  meta: homeMetadata.description,
  hero: {
    eyebrow: "Online Counselling and Therapy Across Australia",
    title: {
      before: "Counselling for when life feels ",
      emphasis: "hard to untangle",
      after: ".",
    },
    contactHref: routeHref(publicRoutePaths.contact),
    contactCta: "Get in touch",
    inclusionHref: routeHref(publicRoutePaths.inclusion),
    inclusionCta: "Explore inclusive counselling",
  },
  portrait: {
    imageSrc: portraitSrc,
    alt: "Joel Griffiths",
    label: "Joel Griffiths",
  },
  welcome: {
    heading: {
      before: "Whatever’s going on, ",
      emphasis: "you can bring it here",
      after: ".",
    },
    opening:
      "Anxiety, depression, trauma and relationship difficulties are some of the reasons people come to counselling. You may be struggling to cope, or know that something doesn’t feel right but not be sure why.",
    practice:
      "Sessions happen online by video, so you can talk from the comfort of home or wherever works for you, without the travel or waiting room.",
    href: `${routeHref(publicRoutePaths.workingWithJoel)}#issues-i-work-with`,
    cta: "See the issues I work with",
  },
  inclusive: {
    heading: {
      before: "Bring ",
      emphasis: "all",
      after: " of yourself.",
    },
    copy: "If your relationships, sexuality or identity sit outside what people usually assume, you may be used to watching how you talk about them. You explain things that shouldn’t need explaining, or leave something out because you don’t know whether it’ll be misunderstood, judged or treated as the problem. Here, you can talk about what’s actually going on without first defending who you are or how you live.",
    href: routeHref(publicRoutePaths.inclusion),
    cta: "Explore inclusive counselling",
    detailsAriaLabel: "Inclusive practice topics",
    details: [
      {
        title: "Kink & BDSM counselling",
        href: routeHref(publicRoutePaths.kinkBdsm),
      },
      {
        title: "Polyamory & ENM counselling",
        href: routeHref(publicRoutePaths.enmPolyamory),
      },
      {
        title: "LGBTQIA+ affirming counselling",
        href: routeHref(publicRoutePaths.lgbtqia),
      },
    ],
  },
  workroom: {
    joelName: "Joel Griffiths",
    joelCopy: [
      "Vive is my counselling practice. I work with a broad range of people and concerns, using a psychodynamic, attachment-informed and integrative approach.",
      "I’m particularly committed to working with people who have been judged or misunderstood because of their sexuality, gender, relationships, identity, diagnosis or work. You don’t need to edit yourself into a simpler person before we talk, and I won’t decide in advance how much any of that has to do with why you came.",
      "If you’d like to get a sense of what I’m like to talk to before deciding whether to book, you can start with a free 15-minute consultation.",
    ],
    consultHref: routeHref(publicRoutePaths.contact),
    consultCta: "Request a 15-minute consult",
    profileHref: routeHref(publicRoutePaths.workingWithJoel),
    profileCta: "More about how I work",
  },
  closingCta: {
    heading: {
      before: "Want to talk ",
      emphasis: "before you decide",
      after: "?",
    },
    href: routeHref(publicRoutePaths.contact),
    cta: "Request a 15-minute consult",
  },
};

function HomeHeroSection({ hero }: { hero: HomeHeroContent }) {
  return (
    <section className="hero-section hero-bg--default home-page__hero">
      <Container>
        <div className="home-page__hero-intro">
          <div className="home-page__hero-copy">
            <h1 className="hero-badge">{hero.eyebrow}</h1>
            <p className="hero-display">
              {hero.title.before}
              <em>{hero.title.emphasis}</em>
              {hero.title.after}
            </p>
          </div>
          <nav className="home-page__hero-actions" aria-label="Page actions">
            <div className="home-page__hero-action-list">
              <Button href={hero.contactHref} className="home-page__hero-action">
                {hero.contactCta} <ArrowRight aria-hidden="true" size={16} />
              </Button>
              <Button href={hero.inclusionHref} className="home-page__hero-action" variant="secondary">
                {hero.inclusionCta} <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </section>
  );
}

function HeroPortrait({ portrait, className = "" }: { portrait: HomePortrait; className?: string }) {
  return (
    <div className={`hero-media-note hero-media-note--portrait ${className}`.trim()}>
      <div className="hero-media-note__image">
        <img src={portrait.imageSrc} alt={portrait.alt} decoding="async" {...highPriorityImageAttributes} />
      </div>
      <span className="hero-media-note__tag" aria-hidden="true">
        {portrait.label}
      </span>
    </div>
  );
}

function WelcomeSection({ welcome }: { welcome: HomeWelcomeContent }) {
  return (
    <section className="site-grid home-welcome" aria-labelledby="home-welcome-title">
      <Container>
        <div className="home-welcome__layout">
          <div className="home-welcome__main">
            <h2 className="home-welcome__heading" id="home-welcome-title">
              <span>{welcome.heading.before}</span>
              <em className="site-emphasis">{`${welcome.heading.emphasis}${welcome.heading.after}`}</em>
            </h2>
            <div className="home-welcome__opening-group">
              <p className="home-welcome__opening">{welcome.opening}</p>
              <Link className="home-welcome__link" to={welcome.href}>
                <span>{welcome.cta}</span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>

          <aside className="home-welcome__online">
            <p>{welcome.practice}</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function WorkroomSection({ workroom, portrait }: { workroom: HomeWorkroomContent; portrait: HomePortrait }) {
  return (
    <section className="site-highlight">
      <Container>
        <div className="home-workroom__frame">
          <JoelCard workroom={workroom} />
          <HeroPortrait className="home-workroom__portrait" portrait={portrait} />
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
      <div className="home-workroom__actions">
        <Button href={workroom.profileHref} variant="tertiary">
          {workroom.profileCta} <ArrowRight aria-hidden="true" size={16} />
        </Button>
        <Link className="home-welcome__link" to={workroom.consultHref}>
          <span>{workroom.consultCta}</span>
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
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
            <Link className="home-welcome__link" to={inclusive.href}>
              <span>{inclusive.cta}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <nav className="home-page__inclusive-details" aria-label={inclusive.detailsAriaLabel}>
            <ul className="home-page__inclusive-topics">
              {inclusive.details.map((detail) => (
                <li key={detail.title}>
                  <Link className="home-page__inclusive-topic-link" to={detail.href}>
                    <h3>{detail.title}</h3>
                    <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
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
  const { hero, portrait, welcome, inclusive, workroom, closingCta } = homePageContent;

  return (
    <main className="site-page home-page">
      <HomeHeroSection hero={hero} />
      <WelcomeSection welcome={welcome} />
      <WorkroomSection portrait={portrait} workroom={workroom} />
      <InclusiveSection inclusive={inclusive} />
      <ClosingCtaSection closingCta={closingCta} />
    </main>
  );
}
