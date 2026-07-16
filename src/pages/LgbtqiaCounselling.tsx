import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";

const pageMetadata = getRouteMetadata("/inclusion/lgbtqia");

const counsellingPlaces = [
  {
    id: "subject",
    title: "It may be what you want to talk about.",
    copy:
      "You might want to explore sexuality or gender directly: how you understand or express yourself, something that has changed, or a choice you are considering.",
  },
  {
    id: "context",
    title: "It may matter to something else.",
    copy:
      "It may shape what is happening in a relationship, family, faith, community, work or another part of your life without explaining the whole difficulty.",
  },
  {
    id: "background",
    title: "It may not be why you came.",
    copy:
      "You may be looking for help with anxiety, low mood, grief, trauma, self-criticism, burnout or another concern. Being LGBTQIA+ does not have to become the subject of counselling.",
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
              <h1 className="hero-badge">LGBTQIA+ affirming counselling</h1>
              <p className="hero-display">Counselling begins with what matters to you.</p>

              <div className="hero-copy-panel lgbtqia-page__hero-support">
                <p>
                  Sexuality, gender, relationships, family, faith, work and the rest of your life can all be part of
                  counselling. I will not assume which of them matters, or what any identity means for you. You can
                  start with the thing that is actually difficult.
                </p>
              </div>
            </div>
            <nav className="lgbtqia-page__hero-actions" aria-label="Page actions">
              <div className="lgbtqia-page__hero-action-list">
                <Button href={routeHref(publicRoutePaths.contact)} variant="primary">
                  Make an enquiry <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button href={routeHref(publicRoutePaths.inclusion)} variant="secondary">
                  <ArrowLeft size={16} aria-hidden="true" /> Back to Inclusion
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </section>

      <section className="lgbtqia-page__place" aria-labelledby="lgbtqia-place-title">
        <Container>
          <header className="lgbtqia-page__place-header">
            <div className="lgbtqia-page__place-heading">
              <h2 id="lgbtqia-place-title">What place does this have in counselling?</h2>
            </div>
          </header>

          <ul className="lgbtqia-page__place-map">
            {counsellingPlaces.map((place) => (
              <li
                className={`lgbtqia-page__place-option lgbtqia-page__place-option--${place.id}`}
                key={place.id}
              >
                <h3>{place.title}</h3>
                <p className="lgbtqia-page__place-copy">{place.copy}</p>
              </li>
            ))}
          </ul>

        </Container>
      </section>

      <section className="lgbtqia-page__relevance" aria-labelledby="lgbtqia-relevance-title">
        <Container>
          <header className="lgbtqia-page__relevance-header">
            <h2 id="lgbtqia-relevance-title">Sexuality or gender can change the context.</h2>
          </header>

          <div
            className="lgbtqia-page__relevance-field"
            role="group"
            aria-label="How the difficulty and its context are considered in counselling"
          >
            <p className="lgbtqia-page__relevance-node lgbtqia-page__relevance-node--difficulty">
              The difficulty itself.
            </p>
            <p className="lgbtqia-page__relevance-practice">
              I will not use sexuality or gender as a shortcut for understanding what is happening.
            </p>
            <p className="lgbtqia-page__relevance-node lgbtqia-page__relevance-node--context">
              The context around it.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
