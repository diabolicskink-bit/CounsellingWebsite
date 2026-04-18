import Button from "../components/Button";
import Container from "../components/Container";

const portraitSrc = "/joel-griffiths-portrait-temp.svg";

const trustItems = [
  "Online across Australia",
  "For adults",
  "Grounded and non-shaming",
  "Inclusive relationships, sexualities, and identities",
];

const topicTiles = [
  {
    title: "Anxiety and overthinking",
    copy: "When your mind does not switch off, everything feels heavier, and you keep going over the same things without getting anywhere.",
    className: "home-topics__tile--quiet",
  },
  {
    title: "Relationship issues",
    copy: "Distance, conflict, attachment difficulties, repeated patterns, or relationships that leave you feeling confused, stuck, or worn down.",
    className: "home-topics__tile--lift",
  },
  {
    title: "Shame and self-worth",
    copy: "Harsh self-judgement, embarrassment, or parts of yourself that feel difficult to name, share, or soften.",
    className: "home-topics__tile--wide",
  },
  {
    title: "Trauma, abuse, and neglect",
    copy: "Past experiences of harm, coercion, or instability that still shape how you feel, relate, trust, or protect yourself.",
    className: "home-topics__tile--deep",
  },
  {
    title: "Identity",
    copy: "Questions about who you are, what you want, and why certain patterns in your life keep returning.",
    className: "home-topics__tile--soft",
  },
];

const inclusivePracticeDetails = [
  "Less time educating the therapist",
  "Consent, boundaries, power exchange, and BDSM can be discussed directly",
  "Polyamory, open relationships, and ethical non-monogamy are not treated as the problem",
  "More room for what matters",
];

export default function Home() {
  return (
    <>
      <section className="home-hero-v2">
        <Container className="home-hero-v2__inner">
          <div className="home-hero-v2__content">
            <h1>Counselling for when life feels difficult, tangled, or hard to make sense of.</h1>
            <p>
              Based in Perth, I offer online counselling for adults across Australia. People often come with anxiety,
              relationship strain, self-criticism, grief, sexuality, or things that feel exposing, confusing, or hard to
              talk about. My approach is direct, thoughtful, and non-shaming.
            </p>
            <div className="button-row home-hero-v2__actions">
              <Button href="/contact">Make an enquiry</Button>
              <Button href="/approach" variant="secondary">
                Read about the approach
              </Button>
            </div>
            <ul className="home-hero-v2__trust" aria-label="Practice details">
              {trustItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="home-hero-v2__visual" aria-label="Portrait placeholder for Joel Griffiths">
            <div className="home-hero-v2__portrait">
              <img src={portraitSrc} alt="" />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-topics">
        <Container className="home-topics__grid">
          <div className="home-topics__intro">
            <h2>What people often bring to counselling</h2>
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

      <section className="home-inclusive-feature">
        <Container className="home-inclusive-feature__inner">
          <div className="home-inclusive-feature__content">
            <span className="home-inclusive-feature__eyebrow">
              Kink-aware therapy, BDSM-aware therapy, and ENM counselling
            </span>
            <h2>Kink-aware and ENM-aware counselling without the translation work.</h2>
            <p>
              I bring clinical training alongside community familiarity with kink, BDSM, power exchange, polyamory,
              open relationships, and ethical non-monogamy. You should not have to spend the first part of counselling
              educating your therapist before you can talk about what is actually difficult.
            </p>
            <Button href="/inclusive-practice" variant="tertiary">
              Explore inclusive practice
            </Button>
          </div>

          <div className="home-inclusive-feature__details" aria-label="What inclusive practice means">
            {inclusivePracticeDetails.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-workroom">
        <Container className="home-workroom__inner">
          <div className="home-workroom__intro">
            <span className="home-eyebrow">Working with Joel</span>
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
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
