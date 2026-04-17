import { CheckCircle2 } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import SectionHeading from "../components/SectionHeading";
import { fitItems } from "../data/site";

const counsellingThemes = [
  {
    title: "Anxiety and overthinking",
    copy: "When your mind does not switch off, everything feels heavier, or you keep going over the same things without getting anywhere.",
  },
  {
    title: "Relationship strain",
    copy: "Conflict, distance, recurring patterns, attachment difficulties, or relationships that leave you feeling confused, stuck, or worn down.",
  },
  {
    title: "Shame and self-criticism",
    copy: "Harsh self-judgment, embarrassment, feeling not good enough, or carrying parts of yourself that are difficult to be open about.",
  },
  {
    title: "Trauma, abuse, and neglect",
    copy: "Past experiences of abuse, neglect, coercion, or unsafe environments that still affect how you feel, relate, trust, cope, or move through the world.",
  },
  {
    title: "Identity and self-understanding",
    copy: "Questions about who you are, what you want, how you relate to others, or why certain patterns in your life keep repeating.",
  },
  {
    title: "Kink, BDSM, and non-monogamy",
    copy: "Including power exchange, BDSM, open relationships, and other consensual dynamics that are often misunderstood or treated as the problem, even when they are not.",
  },
];

const howIWorkBlocks = [
  {
    title: "Looking beneath the immediate problem",
    copy: "Not just what is happening, but why it keeps happening, what it may be connected to, and what it might be protecting.",
  },
  {
    title: "Serious, non-shaming attention",
    copy: "A space where difficult feelings, contradictions, private experiences, and parts of life that do not fit neatly elsewhere can be talked about properly.",
  },
  {
    title: "Change that makes sense",
    copy: "The aim is not insight for its own sake. It is greater clarity, more freedom in how you respond, and change that feels solid enough to last.",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Container className="home-hero__grid">
          <div className="home-hero__content">
            <div className="home-hero__heading">
              <h1>Thoughtful counselling for the complicated parts of life.</h1>
              <p>
                Online counselling for adults across Australia. A grounded, non-shaming practice for anxiety,
                relationship strain, sexuality, intimacy, grief, self-criticism, and other experiences that can
                feel exposing, hard to talk about, or not always well understood.
              </p>
            </div>
            <div className="button-row">
              <Button href="/contact">Make an enquiry</Button>
              <Button href="/approach" variant="secondary">
                Read about the approach
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="fit-strip">
        <Container className="fit-strip__grid">
          {fitItems.map(({ icon: Icon, label }) => (
            <div className="fit-strip__item" key={label}>
              <span className="fit-strip__icon">
                <Icon size={20} />
              </span>
              <p>{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="section issues-section">
        <Container className="stack issues-section__inner">
          <SectionHeading
            title="What brings people to counselling"
            copy="People come with all sorts of experiences, but this practice is especially suited to things that feel emotionally complicated, hard to talk about, or difficult to make sense of alone."
          />
          <div className="card-grid card-grid--three">
            {counsellingThemes.map((theme) => (
              <Card key={theme.title}>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section home-work-section">
        <Container className="home-work">
          <div className="home-work__intro">
            <SectionHeading
              title="How I work"
              copy="My work is thoughtful, relational, and psychologically minded. I pay attention not just to what is happening now, but to the patterns, histories, emotional pressures, and ways of relating that sit underneath it. The aim is not to force quick answers, but to understand things properly and create change that feels real."
            />
            <Button href="/approach" variant="secondary">
              Read more about the approach
            </Button>
          </div>
          <div className="home-work__cards">
            {howIWorkBlocks.map((block) => (
              <Card className="home-work__card" key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.copy}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="section inclusive-band">
        <Container className="inclusive-band__grid">
          <div className="inclusive-band__content">
            <h2>
              Counselling for people whose relationships, sexuality, or identity are not always well understood.
            </h2>
            <p>
              This includes adults in kink and BDSM communities, non-monogamous relationships, and LGBTIQA+
              communities, as well as people whose lives do not fit neatly into more mainstream assumptions.
            </p>
            <p>
              The aim is not to make these parts of your life the whole story. It is to work in a way that does
              not pathologise, sensationalise, or get stuck there when that is not the issue.
            </p>
          </div>
          <Card className="inclusive-band__card">
            <h3>What this means in practice</h3>
            <div className="check-list">
              {[
                "Less time explaining the basic shape of your life",
                "Less risk of consensual dynamics being treated as the problem",
                "More room to focus on what is actually difficult",
                "A calm, direct conversation without awkwardness or spectacle",
              ].map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="inclusive-band__card-action">
              <Button href="/inclusive-practice" variant="tertiary">
                Explore inclusive practice
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      <section className="section home-about-section">
        <Container className="home-about">
          <div className="home-about__rail">
            <h2>About Joel</h2>
          </div>
          <div className="rich-text home-about__copy">
            <p>
              I am trained in counselling and psychodynamic psychotherapy, and I work in a thoughtful, direct,
              and non-shaming way, with attention to the deeper patterns that shape how people feel, relate, and
              protect themselves. My aim is to offer counselling that is psychologically serious while staying
              grounded, accessible, and connected to everyday life.
            </p>
            <Button href="/contact">Get in Touch</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
