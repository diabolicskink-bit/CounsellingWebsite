import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import "../styles-home.css";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

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

const homePageContent: {
  title: string;
  meta: string;
  hero: {
    title: string;
    support: string;
    trustItems: string[];
    portrait: {
      name: string;
      descriptor: string;
    };
  };
  topics: {
    heading: string;
    items: HomeTopicTile[];
  };
  inclusive: {
    heading: {
      before: string;
      emphasis: string;
      after: string;
    };
    copy: string;
    href: string;
    cta: string;
    details: HomeInclusiveDetail[];
  };
  workroom: {
    eyebrow: string;
    heading: string;
    intro: string;
    letterLabel: string;
    letterCopy: string;
    note: string;
    noteHref: string;
    noteCta: string;
    closing: string;
    closingAccent: string;
    ctaHref: string;
    cta: string;
  };
} = {
  title: "Vive Counselling | Online counselling across Australia",
  meta: "Online counselling for adults across Australia with Joel Griffiths. Grounded, thoughtful, inclusive, and non-shaming support.",
  hero: {
    title: "Counselling for when life feels hard to untangle.",
    support:
      "I offer online counselling for adults across Australia, based in Perth. I work with anxiety, relationship strain, self-criticism, trauma, sexuality, and experiences that feel exposing, confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.",
    trustItems: [
      "Perth-based, online across Australia",
      "Individual counselling",
      "Serious, thoughtful, and human",
      "Kink-, ENM-, and LGBTQIA+-aware",
    ],
    portrait: {
      name: "Joel Griffiths",
      descriptor: "Counselling and psychodynamic psychotherapy",
    },
  },
  topics: {
    heading: "What counselling can help with",
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
        title: "Emotional swings ",
        copy: "Emotions that swing fast and feel hard to manage. Closeness that can turn to distance quickly, or moments of feeling everything followed by feeling nothing at all.",
        layoutClass: "home-topics__tile--quiet",
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
    eyebrow: "Working with Joel",
    heading: "Start where you are. We can make sense of it from there.",
    intro:
      "You might arrive with a clear problem, a half-formed worry, a relationship pattern, a private shame, or the sense that something keeps happening and you do not quite know why. The work is to give that enough attention that it can become less tangled, less automatic, and more possible to respond to.",
    letterLabel: "What the work feels like",
    letterCopy:
      "I work in a thoughtful, direct, and non-shaming way. That means we can speak plainly, but not harshly; look underneath the immediate problem, but not disappear into theory; and take your life seriously without turning therapy into something stiff or clinical for its own sake.",
    note:
      "I am trained in counselling and psychodynamic psychotherapy, and work online with adults across Australia.",
    noteHref: "/about-joel",
    noteCta: "About Joel",
    closing: 'A first message can be simple: "I think I would like to talk to someone."',
    closingAccent: '"I think I would like to talk to someone."',
    ctaHref: "/contact",
    cta: "Get in touch",
  },
};

function useSeo() {
  useEffect(() => {
    document.title = homePageContent.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", homePageContent.meta);
    }
  }, []);
}

export default function Home() {
  useSeo();

  return (
    <main className="site-page home-page">
      <section className="hero-section hero-bg--diagonal home-page__hero">
        <Container>
          <div className="hero-top hero-top--supporting-media">
            <div className="home-page__hero-copy">
              <h1 className="hero-display home-page__hero-title">
                Counselling for when life feels <em>hard to untangle</em>.
              </h1>
              <div className="hero-copy-panel home-page__hero-support">
                <p>{homePageContent.hero.support}</p>
                <ul className="hero-support-tagline" aria-label="Practice details">
                  {homePageContent.hero.trustItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="hero-media-note" aria-label="About Joel Griffiths">
              <div className="hero-media-note__image">
                <img src={portraitSrc} alt="" />
              </div>
              <div className="hero-media-note__caption">
                <strong>{homePageContent.hero.portrait.name}</strong>
                <span>{homePageContent.hero.portrait.descriptor}</span>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid home-page__topics">
        <Container className="home-topics__grid">
          <div className="home-topics__intro site-grid__heading">
            <h2>{homePageContent.topics.heading}</h2>
          </div>

          <div className="home-topics__tiles" aria-label="Common counselling themes">
            {homePageContent.topics.items.map((topic) => (
              <article
                className={`home-topics__tile site-topic-card ${topic.layoutClass} ${topic.toneClass ?? ""}`.trim()}
                key={topic.title}
              >
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight home-page__inclusive">
        <Container>
          <div className="home-page__inclusive-frame">
            <div className="home-page__inclusive-main">
              <h2>
                {homePageContent.inclusive.heading.before}
                <em className="site-emphasis">{homePageContent.inclusive.heading.emphasis}</em>
                {homePageContent.inclusive.heading.after}
              </h2>
              <p className="home-page__inclusive-copy">{homePageContent.inclusive.copy}</p>
              <Button href={homePageContent.inclusive.href}>
                Explore inclusive counselling <ArrowRight size={16} />
              </Button>
            </div>

            <div className="home-page__inclusive-support">
              <div className="home-page__inclusive-items design-language-detail-stack" aria-label="Inclusive practice topics">
                {homePageContent.inclusive.details.map((detail) => (
                  <div className="home-page__inclusive-item" key={detail.title}>
                    <Link className="home-page__inclusive-link" to={detail.href}>
                      <span className="home-page__inclusive-heading">
                        <strong>{detail.title}</strong>
                        <span className="home-page__inclusive-action">
                          Learn more
                          <ArrowRight className="home-page__inclusive-icon" size={16} aria-hidden="true" />
                        </span>
                      </span>
                    </Link>
                    <span className="home-page__inclusive-item-copy">{detail.copy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-workroom home-page__workroom">
        <Container className="home-workroom__inner">
          <div className="home-workroom__intro">
            <span className="site-eyebrow">{homePageContent.workroom.eyebrow}</span>
            <h2>{homePageContent.workroom.heading}</h2>
            <p>{homePageContent.workroom.intro}</p>
          </div>

          <div className="home-workroom__letter">
            <span>{homePageContent.workroom.letterLabel}</span>
            <p>{homePageContent.workroom.letterCopy}</p>
          </div>

          <div className="home-workroom__joel-note">
            <p>{homePageContent.workroom.note}</p>
            <Button href={homePageContent.workroom.noteHref} variant="secondary">
              {homePageContent.workroom.noteCta}
            </Button>
          </div>

          <div className="home-workroom__next">
            <p>{homePageContent.workroom.closing.replace(homePageContent.workroom.closingAccent, "")}<span>{homePageContent.workroom.closingAccent}</span></p>
            <div>
              <Button href={homePageContent.workroom.ctaHref}>
                {homePageContent.workroom.cta} <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
