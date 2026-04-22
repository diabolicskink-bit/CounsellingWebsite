import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";

type EmphasisCopy = {
  before: string;
  emphasis: string;
  after: string;
};

type InclusionPanel = {
  eyebrow: string;
  heading: string;
  href: string;
  paragraphs: string[];
  items: string[];
  cta: string;
};

type InclusionFaq = {
  question: string;
  answer: string;
};

type InclusionPageContent = {
  title: string;
  meta: string;
  hero: {
    title: EmphasisCopy;
    intro: string;
    topics: string[];
  };
  hub: {
    panels: InclusionPanel[];
  };
  faq: {
    heading: string;
    items: InclusionFaq[];
  };
};

const inclusionPageContent: InclusionPageContent = {
  title: "Inclusive Counselling for Diverse Relationships, Sexualities and Identities | Vive Counselling",
  meta:
    "Inclusive counselling for adults seeking thoughtful, non-shaming support around relationships, sexuality, identity, and emotional life. Perth-based, online across Australia.",
  hero: {
    title: {
      before: "Inclusive counselling for ",
      emphasis: "diverse lives",
      after: ".",
    },
    intro:
      "Kinky, non-monogamous, queer, or some mix of all three. That territory needs to be known before you arrive, not learned as you go. As a member of Perth's kink and non-monogamy communities, Joel knows it from the inside. Even if what brings you here is entirely unrelated, nothing needs to be left at the door.",
    topics: ["Kink & BDSM", "ENM & Polyamory", "LGBTQIA+"],
  },
  hub: {
    panels: [
      {
        eyebrow: "Kink & BDSM-aware counselling",
        heading: "Not the problem by default. Not off limits either.",
        href: "/inclusion/kink-bdsm",
        paragraphs: [
          "Whatever the desire, it can be named plainly. Nothing about it needs to be introduced carefully or landed gently. D/s, bondage, fetish, masochism, desires that have lived privately for years. None of it needs softening or explaining first. Sometimes it is exactly what brings you here. Sometimes it is simply there, alongside everything else.",
          "Consensual kink, BDSM, D/s, fetish and power exchange are not treated here as damage, danger or a diagnosis to explain away. At the same time, nothing has to be smoothed over. Consent can be unclear. Boundaries can be crossed. Dynamics can stop feeling okay. Shame, secrecy, drop, disclosure, mismatch, trauma responses and relationship strain can all be talked about plainly, without panic or moralising.",
        ],
        items: [],
        cta: "Explore kink & BDSM-aware counselling",
      },
      {
        eyebrow: "ENM & polyamory counselling",
        heading: "Your relationships are real. So are the hard parts.",
        href: "/inclusion/enm-polyamory",
        paragraphs: [
          "Polyamory and ENM are just how some people's relationships work. Whether you are settled in how you live, newly opening, a hinge under pressure, in a mono/poly relationship, or wondering if it's actually for you, all of it belongs. Hinge dynamics, metamours, nesting partners, hierarchy, jealousy alongside compersion. None of it needs explaining. The relationships are real.",
          "Counselling without real knowledge of these relationships can cause genuine harm, even when nobody means to. What feels like progress through a monogamous lens can set things up to fail. The hard parts, the insecurity, comparison, stretched time, broken agreements, pressure to be fine, the weight of multiple attachments. They deserve real support, not a quiet suggestion that it would all be easier another way.",
        ],
        items: [],
        cta: "Explore ENM & polyamory counselling",
      },
      {
        eyebrow: "LGBTQIA+ affirming counselling",
        heading: "Affirming support without making identity the whole story",
        href: "/inclusion/lgbtqia",
        paragraphs: [
          "Affirming counselling means your sexuality, gender, relationships and self-description are respected rather than treated as complications. It also means there is room to talk about minority stress, family pressure, religion, shame, dating, transition, grief, belonging and the ordinary problems that would still matter even in a more accepting world.",
          "You do not need a neat label or a settled explanation before you start. Therapy can include identity, but it can also be about anxiety, relationships, trauma, self-worth, loss, burnout, sex, loneliness or simply wanting to speak freely with someone who will not make the wrong things difficult.",
        ],
        items: [],
        cta: "Explore LGBTQIA+ affirming counselling",
      },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "Do I need to be kinky, polyamorous, or queer to work with you?",
        answer:
          "No. Some communities have specific experiences in therapy that make finding real help harder, not because their problems are different, but because the spaces weren't built with them in mind. Addressing that directly is what the inclusive practice focus is about. But underneath everything, the work here is with the same things that move through every human life. Grief, fear, loneliness, love that hurts, parts of yourself you don't understand, something that has been sitting with you that you haven't been able to say out loud. Anyone carrying any of that is welcome here, whatever else is true about them.",
      },
      {
        question: "What if I only have some experience, or I'm not sure the label fits me?",
        answer:
          "No. There is a particular feeling that comes with being on the edges of something. Not kinky enough, not poly enough, not sure the label really fits, or simply feeling like a lesser version compared to others who seem to be living it more fully. That feeling is worth taking seriously. It does not have to be resolved before reaching out.",
      },
    ],
  },
};

function useSeo() {
  useEffect(() => {
    document.title = inclusionPageContent.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", inclusionPageContent.meta);
    }
  }, []);
}

function FaqSchema({ faqs }: { faqs: InclusionFaq[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }),
      }}
    />
  );
}

export default function InclusivePractice() {
  useSeo();
  const { hero, hub, faq } = inclusionPageContent;

  return (
    <main className="site-page inclusion-page">
      <FaqSchema faqs={faq.items} />
      <section className="hero-section hero-bg--diagonal inclusion-hero">
        <Container>
          <div className="hero-top inclusion-hero__top">
            <div className="inclusion-hero__intro">
              <h1 className="hero-display inclusion-hero__title">
                {hero.title.before}
                <em>{hero.title.emphasis}</em>
                {hero.title.after}
              </h1>
              <p className="hero-copy-panel inclusion-hero__lede">{hero.intro}</p>
            </div>

            <aside className="inclusion-hero__details" aria-label="Inclusive counselling topics">
              <div className="hero-detail-stack inclusion-hero__detail-stack">
                {hero.topics.map((item) => (
                  <p className="hero-detail-stack__item inclusion-hero__detail-item" key={item}>
                    {item}
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="site-grid inclusion-hub">
        <Container>
          <div className="inclusion-hub__panels">
            {hub.panels.map((panel) => (
              <article className="site-copy-panel inclusion-hub__panel" key={panel.heading}>
                <div className="inclusion-hub__panel-layout">
                  <div className="inclusion-hub__panel-lead">
                    <span className="site-eyebrow">{panel.eyebrow}</span>
                    <h3>{panel.heading}</h3>
                  </div>
                  <div className="inclusion-hub__panel-body">
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {panel.items.length > 0 ? (
                      <div className="inclusion-hub__list-block">
                        <p className="inclusion-hub__list-heading">This may include:</p>
                        <ul className="site-card__list inclusion-hub__list">
                          {panel.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="inclusion-hub__panel-action">
                    <Button href={panel.href} variant="tertiary" className="inclusion-hub__button">
                      {panel.cta} <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-grid site-faq-section">
        <Container>
          <div className="site-faq-shell">
            <div className="site-faq-shell__header">
              <h2>{faq.heading}</h2>
            </div>
            <div className="site-faq-list">
              {faq.items.map((item, index) => (
                <details className="site-faq-item" key={item.question} open={index === 0}>
                  <summary className="site-faq-question">
                    <h3>{item.question}</h3>
                    <span className="site-faq-icon" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </summary>
                  <div className="site-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
