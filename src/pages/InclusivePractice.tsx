import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import { inclusiveTopics } from "../data/site";

const topicDescriptions: Record<string, string> = {
  "Kink and BDSM":
    "A space where consent, power and desire can be named clearly without shame or assumption.",
  "Ethical non-monogamy":
    "An environment that understands non-traditional agreements and the emotional work they bring.",
  "LGBTQIA+ lives":
    "Support that acknowledges identity without making it the only lens on your experience.",
  "Sexuality and desire":
    "Room to talk about attraction, erotic needs and personal values in a grounded way.",
  "Gender and self-understanding":
    "A place to explore gender, body, role and belonging without unnecessary pressure.",
  "Diverse relationship structures":
    "Respect for the shape of your relationships, whether they are polyamorous, solo poly, open or otherwise.",
};

const sessionNotes = [
  "Plain, direct language around sex, consent and relationship agreements.",
  "No assumption that non-normative lives are pathological or unstable.",
  "Clinical attention to stigma and minority stress where it matters.",
  "The seriousness needed to talk about risk, conflict and shame without judgement.",
];

export default function InclusivePractice() {
  useEffect(() => {
    document.title = "Inclusive Practice | Vive Counselling";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Inclusive counselling for adults across diverse sexualities, genders and relationship structures, including kink/BDSM, ethical non-monogamy and LGBTQIA+ lives."
      );
    }
  }, []);

  return (
    <>
      <section className="page-hero inclusive-hero">
        <Container className="inclusive-hero__grid">
          <div className="inclusive-hero__copy">
            <span className="eyebrow">Inclusive counselling</span>
            <h1>Non-pathologising support for lives that are often misunderstood elsewhere.</h1>
            <p>
              Vive works with adults who want their life and identity to be heard plainly, without the first session
              becoming a lesson in explanation.
            </p>
            <div className="hero-pill-grid">
              <span className="hero-pill">Kink-aware</span>
              <span className="hero-pill">ENM-informed</span>
              <span className="hero-pill">Queer-affirming</span>
            </div>
            <div className="hero-actions">
              <Button href="/contact">Start with a short enquiry</Button>
              <Button href="/about-joel" variant="secondary">
                About Joel
              </Button>
            </div>
          </div>

          <Card className="inclusive-hero__panel">
            <span className="panel-label">A clearer first step</span>
            <h2>Bring what matters, not what feels explainable.</h2>
            <p>
              The first step is not to argue for your experience. It is to meet your life honestly and make the
              conversation useful from the start.
            </p>
            <ul>
              <li>No assumption that difference is the problem.</li>
              <li>Language that feels direct but not harsh.</li>
              <li>Clinical care for the emotional stresses of being misunderstood.</li>
            </ul>
          </Card>
        </Container>
      </section>

      <section className="section section--surface inclusive-vision">
        <Container className="inclusive-vision__grid">
          <div>
            <h2>Inclusive practice is an open clinical stance.</h2>
            <p>
              It is not a separate brand or a specialism that only applies to one kind of person. It is a way of
              holding space so that your life can be spoken about frankly, respectfully and without needless
              qualification.
            </p>
          </div>

          <Card className="inclusive-vision__card">
            <h3>What this means in the room</h3>
            <p>
              The work stays focused on you as a whole person. We attend to the detail of your experience without
              letting identity become a barrier to the real conversation.
            </p>
          </Card>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="section-heading">
            <h2>Contexts that can be spoken about plainly</h2>
            <p>
              These are not treated as problems in themselves. They are parts of adult life that may or may not be
              central to the work.
            </p>
          </div>

          <div className="topic-grid">
            {inclusiveTopics.map((topic) => (
              <Card className="topic-card" key={topic}>
                <h3>{topic}</h3>
                <p>{topicDescriptions[topic]}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section inclusive-session-panel">
        <Container>
          <div className="feature-panel feature-panel--rich">
            <div className="feature-panel__content">
              <p className="section-eyebrow">How this shows up in session</p>
              <h2>Respect, clarity and psychological safety.</h2>
              <p>
                Counselling can feel safer when the therapist is ready to hear what you bring without turning it into a
                label, a pathology or a debate. That is the orientation of inclusive practice here.
              </p>
            </div>

            <Card className="feature-panel__card feature-panel__card--accent">
              <h3>This can mean</h3>
              <div className="check-list">
                {sessionNotes.map((note) => (
                  <div className="check-item" key={note}>
                    <CheckCircle2 size={19} />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <section className="section section--surface inclusive-band inclusive-band--strong">
        <Container className="inclusive-band__grid">
          <div className="inclusive-band__content">
            <h2>Inclusive practice is part of broader counselling work.</h2>
            <p>
              The same care is given to anxiety, grief, family strain, loneliness, burnout and the ordinary pain of
              being human. Inclusive practice is not separate — it is one way of keeping the work grounded and
              compassionate.
            </p>
          </div>

          <Card className="inclusive-band__card inclusive-band__card--wide">
            <h3>Why this frame matters</h3>
            <p>
              It allows the work to stay open and honest without collapsing into identity politics. It keeps the
              conversation focused on real stress, real relationships and real emotional patterns.
            </p>
            <div className="inclusive-band__card-action">
              <Button href="/approach" variant="secondary">
                Read about the approach
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      <section className="section inclusive-final-cta">
        <Container className="inclusive-final-cta__panel">
          <div>
            <h2>You can make contact without over-explaining your life first.</h2>
            <p>
              A short note about what is bringing you to counselling and whether you are looking for online sessions is
              enough. The first step can be simple, honest and direct.
            </p>
          </div>

          <div className="inclusive-final-cta__actions">
            <Button href="/contact">Contact Vive Counselling</Button>
            <Button href="/about-joel" variant="secondary">
              About Joel
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
