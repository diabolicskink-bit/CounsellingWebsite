import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import CTASection from "../components/CTASection";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import SplitSection from "../components/SplitSection";
import { inclusiveTopics } from "../data/site";

export default function InclusivePractice() {
  return (
    <>
      <PageHero
        title="Non-pathologising counselling for lives that are often misunderstood elsewhere."
        copy="Vive works with adults across diverse sexualities, genders, relationship structures, and communities, including kink/BDSM, ethical non-monogamy, and LGBTQIA+ lives."
        aside={
          <div className="image-panel">
            <img
              alt="A simple arrangement of chairs in a calm contemporary room"
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        }
      />

      <SplitSection title="Difference is not treated as the problem.">
        <p>
          Inclusive practice here is not a banner, a special interest, or a demand that every conversation become
          about identity. It is a grounded clinical stance: people should be able to speak directly about the
          shape of their lives without having to educate, defend, or make themselves smaller.
        </p>
        <p>
          Kink, BDSM, non-monogamy, queerness, gender, sexuality, desire, and unconventional relationship
          structures can be relevant to counselling. They can also simply be part of the background of a person's
          life while the work focuses elsewhere.
        </p>
        <p>
          The point is not to sensationalise difference. The point is to remove the needless drag of being
          misunderstood before the real conversation can begin.
        </p>
      </SplitSection>

      <section className="section section--surface">
        <Container className="stack">
          <SectionHeading
            title="Contexts that can be spoken about plainly"
            copy="These are not treated as problems in themselves. They are parts of adult life that may or may not be central to the work."
          />
          <div className="topic-grid">
            {inclusiveTopics.map((topic) => (
              <Card className="topic-card" key={topic}>
                <p>{topic}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="feature-panel">
            <div className="feature-panel__content">
              <h2>Respectful, direct, and not easily shocked.</h2>
              <p>
                Some people come to counselling because sexuality, gender, desire, or relationship structure is
                central to what is hurting. Others are dealing with anxiety, grief, shame, family, work, intimacy,
                or depression, and simply need those parts of their life not to become an awkward detour.
              </p>
              <p>
                Either way, the work stays focused on you as a whole person. No single part of your life is made
                to carry the whole meaning of who you are.
              </p>
            </div>
            <Card className="feature-panel__card">
              <h3>This can mean</h3>
              <div className="check-list">
                {[
                  "Plain language around sex, desire, consent, power, and relationship agreements.",
                  "No assumption that non-normative lives are inherently unstable or pathological.",
                  "Attention to stigma and minority stress where they matter.",
                  "Enough clinical seriousness to talk about risk, conflict, shame, or harm without collapsing into judgement.",
                ].map((item) => (
                  <div className="check-item" key={item}>
                    <CheckCircle2 size={19} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <SplitSection title="Inclusive practice sits inside broader counselling work." className="section--surface">
        <p>
          Vive is a counselling practice for adults. Inclusive work is part of that broader frame, not a separate
          brand personality. The same care is given to anxiety, grief, relationship strain, family dynamics,
          loneliness, burnout, self-criticism, and the ordinary pain of being a person.
        </p>
        <Button href="/approach" variant="secondary">
          Read about the approach
        </Button>
      </SplitSection>

      <CTASection
        title="You can make contact without over-explaining your life first."
        secondaryHref="/about-joel"
        secondaryLabel="About Joel"
      />
    </>
  );
}
