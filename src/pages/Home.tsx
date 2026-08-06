import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ContactInvitation from "../components/ContactInvitation";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-home.css";

const highPriorityImageAttributes = { fetchpriority: "high" } as const;

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type HomeLink = {
  href: string;
  label: string;
};

type HomeInclusiveTopic = {
  title: string;
  href: string;
};

type HomePortrait = {
  imageSrc: string;
  alt: string;
};

type HomeHeroContent = {
  eyebrow: string;
  title: EmphasisCopy;
  contactLink: HomeLink;
  inclusionLink: HomeLink;
};

type HomeAboutContent = {
  heading: EmphasisCopy;
  narrative: string[];
  links: HomeLink[];
};

type HomeInclusiveContent = {
  heading: EmphasisCopy;
  copy: string;
  topicsAriaLabel: string;
  hub: HomeInclusiveTopic;
  topics: HomeInclusiveTopic[];
};

type HomePageContent = {
  hero: HomeHeroContent;
  portrait: HomePortrait;
  about: HomeAboutContent;
  inclusive: HomeInclusiveContent;
};

const homeMetadata = getRouteMetadata("/");
const contactHref = routeHref(publicRoutePaths.contact);

const homePageContent: HomePageContent = {
  hero: {
    eyebrow: "Online Counselling and Therapy Across Australia",
    title: {
      before: "Counselling for when life feels ",
      emphasis: "hard to untangle",
      after: ".",
    },
    contactLink: {
      href: contactHref,
      label: "Get in touch",
    },
    inclusionLink: {
      href: routeHref(publicRoutePaths.inclusion),
      label: "Explore inclusive counselling",
    },
  },
  portrait: {
    imageSrc: "/joel-griffiths-homepage-portrait.jpg",
    alt: "Joel Griffiths",
  },
  about: {
    heading: {
      before: "About ",
      emphasis: "Vive",
      after: "",
    },
    narrative: [
      "I’m Joel Griffiths, and Vive is my online counselling practice for individuals and couples across Australia.",
      "Anxiety, depression, perfectionism and people-pleasing can make day-to-day life difficult. You may find it hard to switch off or hard to care, while much of your energy goes into getting things right and keeping other people happy. Counselling can help you understand these difficulties more clearly and look at what might need to change.",
      "Trauma can continue to shape daily life and relationships long after the danger itself has passed. I work with CPTSD, sexual trauma, and the effects of single or repeated traumatic experiences. Knowing that something is over does not always stop your mind or body responding as though it is still close.",
      "Relationships can become painful without love or care disappearing. You may be caught in the same argument, living with distance, dealing with damaged trust, or struggling with sex and intimacy. Counselling can help you understand what has become stuck and decide what needs to happen next.",
      "Alongside this broader work, I bring specialist knowledge of kink and BDSM, ENM and polyamory, and I offer LGBTQIA+ affirming counselling. I’m especially committed to working with people who may have struggled to find suitable therapy because their sexuality, gender, identity, relationships, sex work or diagnosis were misunderstood or treated as the problem.",
    ],
    links: [
      {
        href: routeHref(publicRoutePaths.workingWithJoel),
        label: "Working with Joel",
      },
    ],
  },
  inclusive: {
    heading: {
      before: "Bring ",
      emphasis: "all",
      after: " of yourself.",
    },
    copy: "If your relationships, sexuality or identity sit outside what people usually assume, you may be used to watching how you talk about them. You explain things that shouldn’t need explaining, or leave something out because you don’t know whether it’ll be misunderstood, judged or treated as the problem. Here, you can talk about what’s actually going on without first defending who you are or how you live.",
    topicsAriaLabel: "Inclusive practice topics",
    hub: {
      title: "Inclusive counselling hub",
      href: routeHref(publicRoutePaths.inclusion),
    },
    topics: [
      {
        title: "Kink & BDSM-aware counselling",
        href: routeHref(publicRoutePaths.kinkBdsm),
      },
      {
        title: "Polyamory & ENM-aware counselling",
        href: routeHref(publicRoutePaths.enmPolyamory),
      },
      {
        title: "LGBTQIA+ affirming counselling",
        href: routeHref(publicRoutePaths.lgbtqia),
      },
    ],
  },
};

function HomeHeroSection({ hero }: { hero: HomeHeroContent }) {
  return (
    <section className="hero-section site-hero-background home-page__hero">
      <Container className="home-page__hero-shell">
        <div className="home-page__hero-copy">
          <h1 className="hero-badge">{hero.eyebrow}</h1>
          <p className="hero-display">
            {hero.title.before}
            <em>{hero.title.emphasis}</em>
            {hero.title.after}
          </p>

          <nav className="home-page__hero-actions" aria-label="Page actions">
            <Button href={hero.contactLink.href} className="home-page__hero-action">
              <span>{hero.contactLink.label}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
            <Button
              href={hero.inclusionLink.href}
              className="home-page__hero-action"
              variant="secondary"
            >
              <span>{hero.inclusionLink.label}</span>
              <ArrowRight aria-hidden="true" size={18} />
            </Button>
          </nav>
        </div>
      </Container>
    </section>
  );
}

function AboutViveSection({
  about,
  portrait,
}: {
  about: HomeAboutContent;
  portrait: HomePortrait;
}) {
  return (
    <section className="home-about site-section-warm" aria-labelledby="home-about-title">
      <Container>
        <div className="home-about__profile">
          <header className="home-about__masthead">
            <h2 className="home-about__heading" id="home-about-title">
              {about.heading.before}
              <em className="site-emphasis">{about.heading.emphasis}</em>
              {about.heading.after}
            </h2>
          </header>

          <div className="home-about__narrative">
            <div className="home-about__story">
              {about.narrative.map((paragraph, index) => (
                <p
                  className={index === 0 ? "site-reading site-reading--lead" : "site-reading"}
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <figure className="home-about__portrait">
            <div className="home-about__portrait-frame">
              <img
                src={portrait.imageSrc}
                alt={portrait.alt}
                width="744"
                height="1122"
                decoding="async"
                {...highPriorityImageAttributes}
              />
            </div>
            {about.links.map((link) => (
              <Link className="home-about__portrait-link" to={link.href} key={link.href}>
                <span>{link.label}</span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            ))}
          </figure>
        </div>
      </Container>
    </section>
  );
}

function InclusiveSection({ inclusive }: { inclusive: HomeInclusiveContent }) {
  return (
    <section className="home-inclusive" aria-labelledby="home-inclusive-title">
      <Container>
        <div className="home-page__inclusive-frame">
          <div className="home-page__inclusive-main">
            <h2 id="home-inclusive-title">
              {inclusive.heading.before}
              <em className="site-emphasis">{inclusive.heading.emphasis}</em>
              {inclusive.heading.after}
            </h2>
            <p className="home-page__inclusive-copy site-reading">{inclusive.copy}</p>
          </div>

          <nav className="home-page__inclusive-topics-nav" aria-label={inclusive.topicsAriaLabel}>
            <ul className="home-page__inclusive-topics">
              <li>
                <Link
                  className="home-page__inclusive-topic-link home-page__inclusive-topic-link--parent"
                  to={inclusive.hub.href}
                >
                  <h3>{inclusive.hub.title}</h3>
                  <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} />
                </Link>

                <ul className="home-page__inclusive-topic-children">
                  {inclusive.topics.map((topic) => (
                    <li key={topic.title}>
                      <Link
                        className="home-page__inclusive-topic-link home-page__inclusive-topic-link--child"
                        to={topic.href}
                      >
                        <h3>{topic.title}</h3>
                        <ArrowRight aria-hidden="true" size={24} strokeWidth={1.5} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  useDocumentMetadata(homeMetadata.title, homeMetadata.description);
  const { hero, portrait, about, inclusive } = homePageContent;

  return (
    <main className="site-page home-page">
      <HomeHeroSection hero={hero} />
      <AboutViveSection about={about} portrait={portrait} />
      <InclusiveSection inclusive={inclusive} />
      <ContactInvitation />
    </main>
  );
}
