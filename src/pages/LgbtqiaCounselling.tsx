import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-lgbtqia.css";

type FaqItem = {
  question: string;
  answer: string;
};

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

const topics = [
  {
    title: "Identity and change",
    copy:
      "Sexuality, gender, questioning, coming out or not coming out, visibility, your body, and changes in how you name or express yourself.",
  },
  {
    title: "Relationships and belonging",
    copy:
      "Family, chosen family, faith, community, dating, intimacy, breakups, loneliness, rejection, and finding where you belong.",
  },
  {
    title: "The rest of life",
    copy:
      "Anxiety, low mood, grief, shame, self-criticism, trauma, work, burnout or relationship difficulties where LGBTQIA+ context matters without becoming the whole story.",
  },
];

const faqs = [
  {
    question: "Do I need to be out?",
    answer:
      "No. You do not need to be out to family, work, community or anyone else to come to counselling. We can talk about privacy, visibility, possible consequences and what feels manageable without treating disclosure as the goal.",
  },
  {
    question: "Can I come if sexuality or gender is not the main reason?",
    answer:
      "Yes. You might be looking for help with grief, anxiety, work, burnout, a relationship or something else entirely. LGBTQIA+ context can be understood without being made irrelevant or turned into the explanation for everything.",
  },
  {
    question: "What if I am still questioning or do not know which words fit?",
    answer:
      "You do not need a settled label before coming to counselling. Uncertainty can be explored without pressure to reach a particular answer, tell other people, or make a decision before you are ready.",
  },
  {
    question: "Do you work with trans and non-binary clients?",
    answer:
      "Yes. I work with trans and non-binary adults, whether gender is central to what you want to discuss or simply part of your life. If you are seeking a letter, report or formal assessment, mention that in your enquiry so I can clarify whether it is within the service before you book.",
  },
  {
    question: "Can a partner join a session?",
    answer:
      "Most counselling here is individual. A partner may sometimes join a session for a specific conversation when we have agreed beforehand on its purpose. This is considered case by case and is not an ongoing couples counselling service.",
  },
] satisfies FaqItem[];

export default function LgbtqiaCounselling() {
  useDocumentMetadata(pageMetadata.title, pageMetadata.description);

  return (
    <main className="site-page inclusion-page lgbtqia-page">
      <FaqSchema faqs={faqs} />

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

      <section className="lgbtqia-page__topics" aria-labelledby="lgbtqia-topics-title">
        <div className="lgbtqia-page__frame lgbtqia-page__topics-grid">
          <header>
            <p className="lgbtqia-page__section-mark">What you might bring</p>
            <h2 id="lgbtqia-topics-title">There is no correct category for the reason you came.</h2>
          </header>

          <div className="lgbtqia-page__topic-list">
            {topics.map((topic) => (
              <article key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
              </article>
            ))}
            <p className="lgbtqia-page__topic-note">
              These are examples, not an intake checklist. You do not need to sort out which part belongs where
              before making contact.
            </p>
          </div>
        </div>
      </section>

      <section className="lgbtqia-page__faq" aria-labelledby="lgbtqia-faq-title">
        <div className="lgbtqia-page__frame lgbtqia-page__faq-grid">
          <header>
            <p className="lgbtqia-page__section-mark">Before you write</p>
            <h2 id="lgbtqia-faq-title">A few practical questions.</h2>
          </header>

          <div className="lgbtqia-page__faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <div>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="lgbtqia-page__contact" aria-labelledby="lgbtqia-contact-title">
        <div className="lgbtqia-page__frame lgbtqia-page__contact-grid">
          <h2 id="lgbtqia-contact-title">You can keep the first message short.</h2>
          <div>
            <p>
              Say what you would like help with, ask about fit, or request the free 15-minute consult before deciding
              whether to book.
            </p>
            <Link className="lgbtqia-page__action lgbtqia-page__action--dark" to={routeHref(publicRoutePaths.contact)}>
              Make an enquiry <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
