import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { Link } from "react-router-dom";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

const trustItems = [
  "Perth-based, online across Australia",
  "Individual counselling",
  "Serious, thoughtful, and human",
  "Kink-, ENM-, and LGBTQIA+-aware",
];

const topicTiles = [
  {
    title: "Low mood and depression",
    copy: "Heaviness, numbness, hopelessness, or a flatness that does not lift and is hard to explain. Feeling distant from yourself, from other people, or from things that used to matter.",
    className: "home-topics__tile--middle",
  },
  {
    title: "Anxiety and overthinking",
    copy: "A mind that will not settle. Going over the same things, bracing for things that have not happened yet, or carrying a background worry that is hard to name or put down.",
    className: "home-topics__tile--wide",
  },
  {
    title: "Relationships and attachment",
    copy: "Feeling disconnected, stuck in the same arguments, or unable to get as close as you want to be. Ongoing conflict, or patterns in how you attach, trust, or pull away that keep repeating regardless of who you are with.",
    className: "home-topics__tile--lift",
  },
  {
    title: "Shame and self-worth",
    copy: "Harsh self-judgement, a persistent sense of not being enough, or something about yourself that feels too difficult or too exposing to say.",
    className: "home-topics__tile--soft",
  },
  {
    title: "Trauma, abuse, and neglect",
    copy: "Experiences of harm, control, or neglect that left a mark on how safe the world feels, how much you trust people, how close you let yourself get, or how you move through ordinary life.",
    className: "home-topics__tile--deep",
  },
  {
    title: "Emotional swings ",
    copy: "Emotions that swing fast and feel hard to manage. Closeness that can turn to distance quickly, or moments of feeling everything followed by feeling nothing at all.",
    className: "home-topics__tile--quiet",
  },
];

const inclusivePracticeDetails = [
  {
    title: "Kink & BDSM-aware counselling",
    copy: "Speak about kink, BDSM, D/s, power exchange, shame, trust, or boundaries without the dynamic being treated as the problem.",
    href: "/inclusion/kink-bdsm",
  },
  {
    title: "Counselling for ENM & polyamory",
    copy: "Support for polyamory, open relationships, consensual non-monogamy, jealousy, agreements, pace, and fit.",
    href: "/inclusion/enm-polyamory",
  },
  {
    title: "LGBTQIA+ affirming counselling",
    copy: "Counselling where gender, sexuality, relationships, family strain, shame, and ordinary life difficulties can be met plainly.",
    href: "/inclusion/lgbtqia",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "Vive Counselling | Online counselling across Australia";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Online counselling for adults across Australia with Joel Griffiths. Grounded, thoughtful, inclusive, and non-shaming support."
      );
    }
  }, []);

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
                <p>
                  I offer online counselling for adults across Australia, based in Perth. I work with anxiety,
                  relationship strain, self-criticism, trauma, sexuality, and experiences that feel exposing,
                  confusing, or hard to talk about. My approach is direct, thoughtful, and non-shaming.
                </p>
                <ul className="hero-support-tagline" aria-label="Practice details">
                  {trustItems.map((item) => (
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
                <strong>Joel Griffiths</strong>
                <span>Counselling and psychodynamic psychotherapy</span>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid home-page__topics">
        <Container className="home-topics__grid">
          <div className="home-topics__intro site-grid__heading">
            <h2>What counselling can help with</h2>
          </div>

          <div className="home-topics__tiles" aria-label="Common counselling themes">
            {topicTiles.map((topic) => (
              <article className={`home-topics__tile ${topic.className}`} key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-highlight home-page__inclusive">
        <Container className="design-language-split home-page__inclusive-grid">
          <div className="site-highlight__box home-page__inclusive-copy">
            <span className="site-highlight__eyebrow">Inclusive practice</span>
            <h2>Counselling where important parts of your life do not need to be translated first.</h2>
            <p>
              Inclusive practice here means thoughtful, non-shaming counselling for diverse relationships, sexualities,
              identities, kink, BDSM, polyamory, open relationships, and consensual non-monogamy.
            </p>
            <Button href="/inclusion">
              Explore inclusive counselling <ArrowRight size={16} />
            </Button>
          </div>

          <div className="home-inclusive-feature__details" aria-label="What inclusive practice means">
            {inclusivePracticeDetails.map((detail) => (
              <Link to={detail.href} key={detail.title}>
                <strong>{detail.title}</strong>
                <span>{detail.copy}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-workroom home-page__workroom">
        <Container className="home-workroom__inner">
          <div className="home-workroom__intro">
            <span className="site-eyebrow">Working with Joel</span>
            <h2>Start where you are. We can make sense of it from there.</h2>
            <p>
              You might arrive with a clear problem, a half-formed worry, a relationship pattern, a private shame, or
              the sense that something keeps happening and you do not quite know why. The work is to give that enough
              attention that it can become less tangled, less automatic, and more possible to respond to.
            </p>
          </div>

          <div className="home-workroom__portrait">
            <img src={portraitSrc} alt="" />
            <div>
              <strong>Joel Griffiths</strong>
              <span>Counselling and psychodynamic psychotherapy</span>
            </div>
          </div>

          <div className="home-workroom__letter">
            <span>What the work feels like</span>
            <p>
              I work in a thoughtful, direct, and non-shaming way. That means we can speak plainly, but not harshly;
              look underneath the immediate problem, but not disappear into theory; and take your life seriously
              without turning therapy into something stiff or clinical for its own sake.
            </p>
          </div>

          <div className="home-workroom__joel-note">
            <p>
              I am trained in counselling and psychodynamic psychotherapy, and work online with adults across Australia.
            </p>
            <Button href="/about-joel" variant="secondary">
              About Joel
            </Button>
          </div>

          <div className="home-workroom__next">
            <p>
              A first message can be simple: <span>"I think I would like to talk to someone."</span>
            </p>
            <div>
              <Button href="/contact">
                Get in touch <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>You do not need to explain everything clearly before getting in touch.</h2>
            <p>A short note about what is bringing you to counselling is enough to begin.</p>
          </div>
          <Button href="/contact" variant="secondary">
            Make an enquiry <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}
