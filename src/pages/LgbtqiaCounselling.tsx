import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";

const pageMetadata = getRouteMetadata("/inclusion/lgbtqia");

const assumptions = [
  {
    assumption: "Your partner is a man or a woman.",
    practice:
      "I will use your words for partners and relationships. If a word could mean several things, I will ask what it means for you.",
  },
  {
    assumption: "Coming out is the goal.",
    practice:
      "Disclosure is not a required outcome. Privacy, visibility and possible consequences can be considered in their real context.",
  },
  {
    assumption: "Family means biological family.",
    practice:
      "Chosen family, community, faith, estrangement and the people you rely on can all be part of the picture.",
  },
  {
    assumption: "Identity explains the difficulty.",
    practice:
      "Sexuality or gender may be central, one thread among several, or simply context I need to understand.",
  },
];

const startingPoints = [
  {
    title: "Sexuality or gender is what you want to discuss",
    copy:
      "You might want to talk about questioning, coming out or not coming out, visibility, your body, or changes in how you name or express yourself. Counselling does not have to lead towards a particular label, disclosure or decision.",
  },
  {
    title: "It matters to something else that is happening",
    copy:
      "The difficulty might involve dating, intimacy, a breakup, family or chosen family, faith, community, work, loneliness or rejection. Sexuality or gender can matter to what is happening without explaining all of it.",
  },
  {
    title: "The reason is something else",
    copy:
      "You might be looking for help with anxiety, low mood, grief, shame, trauma, self-criticism, burnout or a relationship difficulty. Sexuality or gender does not have to become the focus simply because it is part of your life.",
  },
];

export default function LgbtqiaCounselling() {
  useDocumentMetadata(pageMetadata.title, pageMetadata.description);

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <section className="hero-section hero-bg--default lgbtqia-page__hero">
        <Container>
          <div className="lgbtqia-page__hero-main">
            <div className="lgbtqia-page__hero-copy">
              <h1 className="hero-badge">Counselling for LGBTQIA+ adults</h1>
              <p className="hero-display">
                Without the <em>default settings.</em>
              </p>

              <div className="hero-copy-panel lgbtqia-page__hero-support">
                <p>
                  Sexuality, gender, relationships, family, faith, work and the rest of your life can all be part of
                  counselling. I will not assume which of them matters, or what any identity means for you. You can
                  start with the thing that is actually difficult.
                </p>
                <ul className="hero-support-tagline" aria-label="Practice details">
                  <li>Joel Griffiths</li>
                  <li>Adults</li>
                  <li>Perth-based, available across Australia</li>
                </ul>
                <div className="site-actions lgbtqia-page__hero-actions">
                  <Button href={routeHref(publicRoutePaths.contact)}>Make an enquiry</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="lgbtqia-page__defaults" aria-labelledby="lgbtqia-defaults-title">
        <div className="lgbtqia-page__frame">
          <header className="lgbtqia-page__defaults-header">
            <h2 id="lgbtqia-defaults-title">I will ask, rather than fill in the blanks.</h2>
            <p>
              Affirming practice is not a claim that I already know your experience. It changes the assumptions I
              start with, the questions I ask, and what I leave for you to define.
            </p>
          </header>

          <div className="lgbtqia-page__comparison-labels" aria-hidden="true">
            <span>Not a starting point</span>
            <span>Where I start instead</span>
          </div>
          <dl className="lgbtqia-page__assumptions">
            {assumptions.map((item) => (
              <div key={item.assumption}>
                <dt>
                  <span className="lgbtqia-page__mobile-label">Not a starting point: </span>
                  <s>{item.assumption}</s>
                </dt>
                <dd>
                  <span className="lgbtqia-page__mobile-label">Where I start instead: </span>
                  {item.practice}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="lgbtqia-page__reasons" aria-labelledby="lgbtqia-reasons-title">
        <div className="lgbtqia-page__frame">
          <header className="lgbtqia-page__reasons-header">
            <p className="lgbtqia-page__section-mark">What you might bring</p>
            <h2 id="lgbtqia-reasons-title">What brings you here may or may not be about sexuality or gender.</h2>
          </header>

          <div className="lgbtqia-page__reason-list">
            {startingPoints.map((startingPoint) => (
              <article key={startingPoint.title}>
                <h3>{startingPoint.title}</h3>
                <p>{startingPoint.copy}</p>
              </article>
            ))}
          </div>

          <p className="lgbtqia-page__reason-note">
            These starting points can overlap. You do not need to sort that out before making contact.
          </p>
        </div>
      </section>
    </main>
  );
}
