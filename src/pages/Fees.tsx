import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import CTASection from "../components/CTASection";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import SplitSection from "../components/SplitSection";
import { practicalItems } from "../data/site";

export default function Fees() {
  return (
    <>
      <PageHero
        title="Practical details, kept clear."
        copy="Sessions are online, 50 minutes, and available to adults across Australia. The first step is a brief enquiry so availability and fit can be considered."
        aside={
          <Card className="fee-card">
            <p className="card-kicker">Standard session</p>
            <p className="fee-card__amount">$170</p>
            <p>50-minute online counselling session</p>
            <p className="small-note">Placeholder fee for editing before launch.</p>
          </Card>
        }
      />

      <section className="section">
        <Container className="stack">
          <SectionHeading
            title="The basic frame"
            copy="This page is designed to be easy to update as practical details change."
          />
          <div className="card-grid card-grid--three">
            {practicalItems.map(({ icon: Icon, title, copy }) => (
              <Card className="info-card" key={title}>
                <span className="icon-box">
                  <Icon size={20} />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--surface">
        <Container>
          <div className="two-column-panel">
            <div>
              <h2>Starting does not need to be elaborate.</h2>
              <p>
                A short message is enough. You can say what is bringing you to counselling, whether online work
                suits you, and any scheduling constraints that matter.
              </p>
            </div>
            <div className="check-list">
              {[
                "Send a brief enquiry through the contact page.",
                "Joel will reply with availability and any useful next questions.",
                "If it seems like a reasonable fit, a first online session can be arranged.",
                "You do not need to explain the whole story before booking.",
              ].map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SplitSection title="Clear boundaries help keep the work steady.">
        <p>
          A cancellation policy, payment details, and any required forms can be confirmed before the first
          appointment. This placeholder copy can be replaced with the final practice terms when they are ready.
        </p>
        <p>
          Vive does not currently present itself as a crisis service. If you are in immediate danger, call
          emergency services on 000 or contact a crisis support service in your area.
        </p>
        <Button href="/contact">Make an enquiry</Button>
      </SplitSection>

      <CTASection
        title="A brief enquiry is enough to begin."
        copy="You can include what is bringing you to counselling, your availability, and whether online sessions are what you are looking for."
        secondaryHref="/approach"
        secondaryLabel="Read the approach"
      />
    </>
  );
}
