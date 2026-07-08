import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles-inclusive-practice.css";
import Container from "../components/Container";
import Button from "../components/Button";
import FaqSection from "../components/FaqSection";
import FaqSchema from "../components/FaqSchema";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths, routeHref, showDraftInclusionLinks } from "../data/routes";
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
    eyebrow: string;
    title: {
      lineOne: string;
      lineTwoBefore: string;
      emphasis: string;
      lineTwoAfter: string;
    };
    topics: {
      label: string;
      href: string;
    }[];
  };
  hub: {
    intro: {
      statement: {
        lineOne: string;
        lineTwo: string;
      };
      support: string;
    };
    panels: InclusionPanel[];
  };
  faq: {
    heading: string;
    items: InclusionFaq[];
  };
};

const inclusionMetadata = getRouteMetadata("/inclusion");

const inclusionPageContent: InclusionPageContent = {
  title: inclusionMetadata.title,
  meta: inclusionMetadata.description,
  hero: {
    eyebrow: "Inclusive counselling",
    title: {
      lineOne: "Inclusive counselling",
      lineTwoBefore: "for ",
      emphasis: "diverse lives",
      lineTwoAfter: ".",
    },
    topics: [
      { label: "Kink & BDSM", href: routeHref(publicRoutePaths.kinkBdsm) },
      { label: "ENM & Polyamory", href: routeHref(publicRoutePaths.enmPolyamory) },
      { label: "LGBTQIA+", href: routeHref(publicRoutePaths.lgbtqia) },
    ],
  },
  hub: {
    intro: {
      statement: {
        lineOne: "Known before you arrive.",
        lineTwo: "Not learned as you go.",
      },
      support:
        "Kinky, non-monogamous, queer, or some mix of all three. As a member of Perth's kink and non-monogamy communities, Joel knows it from the inside. Even if what brings you here is entirely unrelated, nothing needs to be left at the door.",
    },
    panels: [
      {
        eyebrow: "Kink & BDSM-aware counselling",
        heading: "Not the problem by default. Not off limits either.",
        href: routeHref(publicRoutePaths.kinkBdsm),
        paragraphs: [
          "Whatever the desire, it can be named plainly. Nothing about it needs to be introduced carefully or landed gently. D/s, bondage, fetish, masochism, desires that have lived privately for years. Sometimes it is exactly what brings you here. Sometimes it is simply there, alongside everything else.",
          "Consensual kink is not treated here as damage, danger or a diagnosis to explain away. And nothing has to be smoothed over. Consent can be unclear. Boundaries can be crossed. Dynamics can stop feeling okay. All of it can be talked about plainly, without panic or moralising.",
        ],
        cta: "Kink & BDSM-aware counselling",
      },
      {
        eyebrow: "ENM & polyamory counselling",
        heading: "Your relationships are real. So are the hard parts.",
        href: routeHref(publicRoutePaths.enmPolyamory),
        paragraphs: [
          "Polyamory and ENM aren't edge cases, they're just how some people's relationships work. Whether you're settled in that, newly opening, a hinge under pressure, or still working out whether it's actually for you, the whole shape of it belongs here. The structures, the agreements, the places where jealousy and compersion sit right next to each other. The relationships are real.",
          "Counselling without genuine knowledge of these relationships can cause real harm, even when nobody means it to. What feels like progress through a monogamous lens can set things up to fail. The hard parts, insecurity, stretched time, broken agreements, the pressure to seem fine, the weight of caring about more than one person, deserve real support, not a quiet suggestion that it would all be easier another way.",
        ],
        cta: "ENM & polyamory counselling",
      },
      {
        eyebrow: "LGBTQIA+ affirming counselling",
        heading: "No soft launch of who you are.",
        href: routeHref(publicRoutePaths.lgbtqia),
        paragraphs: [
          "Being LGBTQIA+ can shape safety, family, desire, belonging, shame, faith, work, relationships, and the way you have had to move through the world. It can also be completely beside the point of what you need to talk about that day. Both can be true.",
          "This is counselling that does not treat queerness, transness, or gender difference as pathology, novelty, or background trivia. It is part of what you bring here. Sometimes central. Sometimes ordinary. Sometimes complicated.",
        ],
        cta: "LGBTQIA+ affirming counselling",
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
      <section className="hero-section hero-bg--default">
        <Container>
          <div className="hero-top inclusion-hero__top">
            <div className="inclusion-hero__heading">
              <h1 className="hero-badge">{hero.eyebrow}</h1>
              <h2 className="hero-display inclusion-hero__title">
                <span>{hero.title.lineOne}</span>{" "}
                <span>
                  {hero.title.lineTwoBefore}
                  <em>
                    {hero.title.emphasis}
                    {hero.title.lineTwoAfter}
                  </em>
                </span>
              </h2>
            </div>

            <nav className="inclusion-hero__details" aria-label="Inclusive counselling topics">
              {hero.topics.map((item) => (
                <InclusionHeroDetailItem item={item} key={item.label} />
              ))}
            </nav>
          </div>
        </Container>
      </section>

      <section className="site-grid inclusion-hub">
        <Container>
          <div className="inclusion-hub__intro">
            <h2 className="inclusion-hub__intro-statement">
              <span>{hub.intro.statement.lineOne}</span>
              <span>{hub.intro.statement.lineTwo}</span>
            </h2>
            <p className="inclusion-hub__intro-support">{hub.intro.support}</p>
          </div>

          <div className="inclusion-hub__panels">
            {hub.panels.map((panel) => (
              <article className="site-copy-panel" key={panel.heading}>
                <div className="inclusion-hub__panel-layout">
                  <div className="inclusion-hub__panel-lead">
                    <span className="site-eyebrow">{panel.eyebrow}</span>
                    <h3 className="inclusion-hub__panel-title">{panel.heading}</h3>
                  </div>
                  <div className="inclusion-hub__panel-body">
                    {panel.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {showDraftInclusionLinks ? (
                    <div className="inclusion-hub__panel-action">
                      <Button href={panel.href} variant="tertiary">
                        {panel.cta} <ArrowRight size={16} />
                      </Button>
                    </div>
                  ) : null}
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

function InclusionHeroDetailItem({ item }: { item: { label: string; href: string } }) {
  if (showDraftInclusionLinks) {
    return (
      <Link className="inclusion-hero__detail-link" to={item.href}>
        {item.label}
      </Link>
    );
  }

  return <span className="inclusion-hero__detail-link inclusion-hero__detail-link--static">{item.label}</span>;
}
