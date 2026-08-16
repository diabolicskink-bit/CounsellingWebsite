import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ContactInvitation from "../components/ContactInvitation";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-home.css";

/* React 18 does not recognise `fetchPriority`, so it is spread in lowercase to
   reach the DOM as a passthrough attribute without a development warning. */
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
  description: string;
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
  hub: HomeLink;
  topics: HomeInclusiveTopic[];
};

type HomePageContent = {
  hero: HomeHeroContent;
  portrait: HomePortrait;
  about: HomeAboutContent;
  inclusive: HomeInclusiveContent;
};

const homeMetadata = getRouteMetadata(publicRoutePaths.home);
const contactHref = publicRoutePaths.contact;

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
      href: publicRoutePaths.inclusion,
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
        href: publicRoutePaths.workingWithJoel,
        label: "Working with Joel",
      },
    ],
  },
  inclusive: {
    heading: {
      before: "",
      emphasis: "Inclusive",
      after: " practice",
    },
    copy: "I bring specialist knowledge of kink and BDSM, ethical non-monogamy and polyamory, alongside LGBTQIA+ affirming counselling. I also bring extensive lived experience within these communities. I know personally what it is like to encounter the subtle reactions and signs of discomfort that can appear when talking about these parts of life, even in therapy.",
    topicsAriaLabel: "Inclusive practice topics",
    hub: {
      label: "Read about inclusive practice",
      href: publicRoutePaths.inclusion,
    },
    topics: [
      {
        title: "Kink & BDSM-aware counselling",
        description:
          "I bring significant expertise in kink and BDSM, including an understanding of why it may matter in a person’s life and the different meanings it can carry. You can talk about power, consent, desire and relationships without awkwardness or automatic judgement, including when things have gone seriously wrong.",
        href: publicRoutePaths.kinkBdsm,
      },
      {
        title: "Ethical non-monogamy & polyamory counselling",
        description:
          "I bring specialist knowledge of ENM and polyamory, including the different ways people build relationships, commitments and families. You can talk about agreements, jealousy, changing relationships, different needs and difficult decisions without monogamy being treated as the inevitable answer.",
        href: publicRoutePaths.enmPolyamory,
      },
      {
        title: "LGBTQIA+ affirming counselling",
        description:
          "I offer LGBTQIA+ affirming counselling that takes sexuality, gender, identity and relationships seriously. You can talk about what is difficult, what is changing and what matters to you without your identity being treated as the problem or used to explain everything.",
        href: publicRoutePaths.lgbtqia,
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
        <header className="home-about__masthead">
          <h2 className="home-about__heading" id="home-about-title">
            {about.heading.before}
            <em className="site-emphasis">{about.heading.emphasis}</em>
            {about.heading.after}
          </h2>
        </header>

        <div className="home-about__narrative">
          {about.narrative.map((paragraph, index) => (
            <p
              className={index === 0 ? "site-reading site-reading--lead" : "site-reading"}
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
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
      </Container>
    </section>
  );
}

function InclusiveSection({ inclusive }: { inclusive: HomeInclusiveContent }) {
  return (
    <section className="home-inclusive" aria-labelledby="home-inclusive-title">
      <Container>
        <header className="home-inclusive__header">
          <h2 className="home-inclusive__heading" id="home-inclusive-title">
            {inclusive.heading.before}
            <em className="site-emphasis">{inclusive.heading.emphasis}</em>
            {inclusive.heading.after}
          </h2>
          <p className="home-inclusive__copy site-reading">{inclusive.copy}</p>
        </header>

        <nav className="home-inclusive__index" aria-label={inclusive.topicsAriaLabel}>
          <ul className="home-inclusive__topics">
            {inclusive.topics.map((topic) => (
              <li key={topic.title}>
                <Link className="home-inclusive__topic" to={topic.href}>
                  <div className="home-inclusive__topic-copy">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </div>
                  <ArrowRight aria-hidden="true" size={26} strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>

          <Link className="home-inclusive__hub-link" to={inclusive.hub.href}>
            <span>{inclusive.hub.label}</span>
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </nav>
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
