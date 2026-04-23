import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles-inclusive-practice.css";
import Container from "../components/Container";
import Button from "../components/Button";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

type InclusionPanel = {
  eyebrow: string;
  heading: string;
  href: string;
  paragraphs: string[];
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
    title: {
      lineOne: string;
      lineTwoBefore: string;
      emphasis: string;
      lineTwoAfter: string;
    };
    statement: {
      lineOne: string;
      lineTwo: string;
    };
    support: string;
    topics: {
      label: string;
      href: string;
    }[];
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
      lineOne: "Inclusive counselling",
      lineTwoBefore: "for ",
      emphasis: "diverse lives",
      lineTwoAfter: ".",
    },
    statement: {
      lineOne: "Known before you arrive.",
      lineTwo: "Not learned as you go.",
    },
    support:
      "Kinky, non-monogamous, queer, or some mix of all three. As a member of Perth's kink and non-monogamy communities, Joel knows it from the inside. Even if what brings you here is entirely unrelated, nothing needs to be left at the door.",
    topics: [
      { label: "Kink & BDSM", href: "/inclusion/kink-bdsm" },
      { label: "ENM & Polyamory", href: "/inclusion/enm-polyamory" },
      { label: "LGBTQIA+", href: "/inclusion/lgbtqia" },
    ],
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
        question: "A lot of counsellors say they are inclusive. What does that mean here?",
        answer:
          "A lot of sites say inclusive now. The difference here is that you do not have to explain kink, BDSM, polyamory, ENM, gender, sexuality, partners, roles or labels from scratch before you can talk about why you are here. Some of that understanding comes from being part of these worlds, not only learning about them professionally. That means less translating, less second-guessing how something will land, and more room to speak plainly without the work being quietly pulled toward the counsellor's own ideas about what a life or relationship is supposed to be.",
      },
      {
        question: "What if I only have some experience, or I'm not sure the label fits me?",
        answer:
          "No. There is a particular feeling that comes with being on the edges of something. Not kinky enough, not poly enough, not sure the label really fits, or simply feeling like a lesser version compared to others who seem to be living it more fully. That feeling is worth taking seriously. It does not have to be resolved before reaching out.",
      },
      {
        question: "What if I'm still figuring out whether I'm kinky, queer, or into non-monogamy?",
        answer:
          "No. The not-sure is real, and it has its own weight. You do not need to know what it means or where it lands before bringing it here.",
      },
      {
        question: "Does community involvement affect whether I can work with Joel?",
        answer:
          "Anyone active in Perth's kink or ENM scene will know Joel as a community figure, and that makes a therapeutic relationship inappropriate. Reach out directly and a brief conversation can help find other options. If you are outside the community but thinking about exploring it during therapy, that is worth raising early. Going once is a different situation from becoming a regular, and what makes sense depends on what the involvement actually looks like. That conversation happens as things develop rather than being decided in advance.",
      },
    ],
  },
};

export default function InclusivePractice() {
  useDocumentMetadata(inclusionPageContent.title, inclusionPageContent.meta);
  const { hero, hub, faq } = inclusionPageContent;

  return (
    <main className="site-page inclusion-page">
      <FaqSchema faqs={faq.items} />
      <section className="hero-section hero-bg--default inclusion-hero">
        <div className="inclusion-hero__masthead">
          <Container>
            <div className="hero-top inclusion-hero__top">
              <div className="inclusion-hero__headline-block">
                <h1 className="hero-display inclusion-hero__title">
                  <span>{hero.title.lineOne}</span>
                  <span>
                    {hero.title.lineTwoBefore}
                    <em>
                      {hero.title.emphasis}
                      {hero.title.lineTwoAfter}
                    </em>
                  </span>
                </h1>
              </div>

              <nav className="inclusion-hero__details" aria-label="Inclusive counselling topics">
                <div className="inclusion-hero__detail-stack">
                  {hero.topics.map((item) => (
                    <Link className="inclusion-hero__detail-link" key={item.label} to={item.href}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>

            <div className="inclusion-hero__caption">
              <p className="inclusion-hero__statement">
                <span>{hero.statement.lineOne}</span>
                <span>{hero.statement.lineTwo}</span>
              </p>
              <p className="inclusion-hero__support">{hero.support}</p>
            </div>
          </Container>
        </div>
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

      <FaqSection className="site-highlight" items={faq.items} title={faq.heading} />
    </main>
  );
}
