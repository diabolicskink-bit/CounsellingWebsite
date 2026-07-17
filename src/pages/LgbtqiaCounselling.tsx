import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";

const pageMetadata = getRouteMetadata("/inclusion/lgbtqia");

export default function LgbtqiaCounselling() {
  useDocumentMetadata(pageMetadata.title, pageMetadata.description);

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <section className="hero-section hero-bg--default lgbtqia-page__hero">
        <Container>
          <div className="lgbtqia-page__hero-main">
            <div className="lgbtqia-page__hero-copy">
              <h1 className="hero-badge">LGBTQIA+ affirming counselling and therapy</h1>
              <p className="hero-display">
                There is no single <em>LGBTQIA+ story</em> to bring to therapy.
              </p>

              <div className="hero-copy-panel lgbtqia-page__hero-support">
                <p>
                  I’m Joel Griffiths, a Perth-based counsellor offering online individual counselling to adults across
                  Australia.
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

      <section className="site-grid lgbtqia-page__recognition" aria-labelledby="lgbtqia-recognition-title">
        <Container className="lgbtqia-page__recognition-layout">
          <header className="lgbtqia-page__section-heading">
            <h2 id="lgbtqia-recognition-title">Where does sexuality or gender fit?</h2>
          </header>

          <ol className="lgbtqia-page__recognition-flow">
            <li className="lgbtqia-page__recognition-item lgbtqia-page__recognition-item--question">
              <h3>It may be the question.</h3>
              <p>
                You may be finding words for your sexuality or gender, thinking about coming out, or looking again at
                something you thought you had settled years ago. You can also be clear about who you are and still be
                unsure what to do next.
              </p>
            </li>
            <li className="lgbtqia-page__recognition-item lgbtqia-page__recognition-item--context">
              <h3>It may be the context.</h3>
              <p>
                An important relationship has changed, or family, faith or community has become harder to remain part
                of. Counselling can focus on the conflict, loss or choices involved without treating sexuality or
                gender as the problem.
              </p>
            </li>
            <li className="lgbtqia-page__recognition-item lgbtqia-page__recognition-item--background">
              <h3>It may barely matter.</h3>
              <p>
                You may want help with anxiety, grief, burnout or trouble in a relationship. Sexuality or gender does
                not need to become the subject of counselling simply because it is part of your life.
              </p>
            </li>
          </ol>
        </Container>
      </section>

      <section className="site-highlight lgbtqia-page__fluency" aria-labelledby="lgbtqia-fluency-title">
        <Container className="lgbtqia-page__fluency-layout">
          <header className="section-heading lgbtqia-page__fluency-introduction">
            <h2 id="lgbtqia-fluency-title">Therapy is not for debating your identity.</h2>
            <p className="section-heading__copy site-ruled-paragraph">
              Mistaken assumptions about sexuality, gender or sex characteristics can change what a counsellor sees
              as the problem. For me, LGBTQIA+ affirming therapy means working with you as an individual. Who you are
              is not up for debate.
            </p>
          </header>

          <div className="site-card site-copy-flow lgbtqia-page__fluency-field">
            <p className="lgbtqia-page__fluency-examples-intro">
              For example, you should not have to manage your therapist by:
            </p>
            <ul className="lgbtqia-page__fluency-examples">
              <li>Arguing against assumptions about your sexuality based on your current partner.</li>
              <li>Explaining why asexuality is not a symptom or a problem to solve.</li>
              <li>Keeping the conversation going when sexuality or gender makes them uncomfortable.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="site-grid lgbtqia-page__disclosure" aria-labelledby="lgbtqia-disclosure-title">
        <Container className="lgbtqia-page__disclosure-layout">
          <header className="lgbtqia-page__disclosure-heading">
            <h2 id="lgbtqia-disclosure-title">Who to tell, and when</h2>
            <h3 className="site-ruled-paragraph lgbtqia-page__disclosure-position">
              More disclosure is not automatically the goal.
            </h3>
          </header>

          <div className="lgbtqia-page__disclosure-details">
            <div className="lgbtqia-page__disclosure-detail">
              <p className="lgbtqia-page__disclosure-summary">
                Being open may make sense in one part of your life and carry real risk in another.
              </p>

              <p className="lgbtqia-page__disclosure-body">
                Who knows, what they know, and what it is safe or useful to say can differ across each part of your
                life.
              </p>
            </div>

            <p className="lgbtqia-page__disclosure-body">
              Counselling can be a place to think about whether, when and how to tell someone, and what each choice
              might change. If you are questioning or trying out language, you do not have to reach a conclusion on a
              timetable.
            </p>

            <p className="lgbtqia-page__disclosure-body">
              I will not assume what should happen with family, faith, culture or community. We can look at the
              relationships, risks and values involved without treating separation or reconciliation as the measure
              of progress.
            </p>
          </div>

          <ul
            className="lgbtqia-page__context-line lgbtqia-page__context-line--after"
            aria-label="Contexts in which disclosure may differ"
          >
            <li>Relationships</li>
            <li>Family</li>
            <li>Work</li>
            <li>Faith</li>
            <li>Community</li>
          </ul>
        </Container>
      </section>

    </main>
  );
}
