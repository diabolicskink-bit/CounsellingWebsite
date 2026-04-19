import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";

type InclusionPageData = {
  title: string;
  meta: string;
  h1: string;
  badge: string;
  intro: string;
  pathLabel: string;
  firstSection: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: string[];
    variant?: "scenario" | "plain";
  };
  stance: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  individual: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  faqs: Array<{ question: string; answer: string }>;
};

const pages: Record<"kink" | "enm" | "lgbtqia", InclusionPageData> = {
  kink: {
    title: "Kink & BDSM-Aware Counselling | Vive Counselling",
    meta:
      "Individual counselling where kink, BDSM, D/s, and power exchange can be discussed without awkwardness, moralising, or assumptions. Perth-based, online across Australia.",
    h1: "Kink & BDSM-aware counselling",
    badge: "Kink-aware counselling",
    pathLabel: "Kink & BDSM",
    intro:
      "Individual counselling where kink, BDSM, D/s, and power exchange can be discussed without awkwardness or assumptions. The kink itself does not have to be the issue; it may simply be part of the emotional and relational context that matters.",
    firstSection: {
      eyebrow: "What people may want to talk about",
      heading: "You can bring the dynamic, not just a problem",
      variant: "plain",
      items: [
        "Shame, secrecy, or fear of being misunderstood.",
        "Difficulty bringing a D/s dynamic or power exchange into therapy.",
        "Conflict, rupture, resentment, or mismatched needs.",
        "Trust, surrender, dependence, control, and attachment.",
        "Boundaries, consent, uncertainty, or mixed feelings.",
        "Wanting to think clearly without defending your sexuality first.",
        "A dynamic that matters emotionally even when it is not the main reason for counselling.",
        "Something deeply personal that needs careful language and room.",
      ],
    },
    stance: {
      eyebrow: "What kink-aware means here",
      heading: "Direct conversation without pathologising the dynamic",
      paragraphs: [
        "Kink-aware counselling means I do not assume kink, BDSM, D/s, or power exchange is a sign of harm, avoidance, instability, or poor attachment. The question is not whether the dynamic is acceptable. The question is what it means for you, how it is being lived, and where distress, conflict, shame, or confusion may be emerging.",
        "It also means you do not need to spend the session doing basic education before the work can begin. We can talk about meaning, boundaries, trust, longing, resentment, fear, consent, secrecy, and relational complexity directly.",
      ],
    },
    individual: {
      eyebrow: "Individual counselling",
      heading: "When a dynamic is part of the picture",
      paragraphs: [
        "You do not need to attend as a couple to talk about something that involves a partner, scene partner, or dynamic. Individual counselling can still be useful when the issue sits partly inside a relationship.",
        "The work may focus on how you experience the dynamic emotionally, what it brings up in you, where you feel caught, and what choices feel possible. It can also connect with broader patterns in intimacy, shame, attachment, or self-protection.",
      ],
    },
    faqs: [
      {
        question: "Can I talk about BDSM in counselling even if it is not the main issue?",
        answer:
          "Yes. BDSM, kink, D/s, or power exchange may be part of your life without being the reason you are seeking counselling. You can mention it where it matters and still focus on anxiety, grief, relationships, shame, or other concerns.",
      },
      {
        question: "Will I need to explain basic kink terms or dynamics?",
        answer:
          "You may need to explain what a particular dynamic means to you, but you should not have to provide a basic introduction before the counselling can begin.",
      },
      {
        question: "Do you assume kink is unhealthy?",
        answer:
          "No. I do not treat kink as pathology. If something is causing distress, we can look at that carefully without assuming the whole dynamic is the problem.",
      },
      {
        question: "Can I come on my own if the issue involves a partner or dynamic?",
        answer:
          "Yes. This is individual counselling, and it can still be useful when a concern involves a partner, a relational pattern, or a D/s or power exchange dynamic.",
      },
    ],
  },
  enm: {
    title: "Counselling for Polyamory, Open Relationships and ENM | Vive Counselling",
    meta:
      "Individual counselling for people in polyamory, open relationships, and consensual non-monogamy. Thoughtful, non-shaming support. Perth-based, online across Australia.",
    h1: "Counselling for polyamory, open relationships, and ENM",
    badge: "ENM and polyamory counselling",
    pathLabel: "ENM & polyamory",
    intro:
      "Individual counselling for people in polyamory, open relationships, and consensual non-monogamy. I will not assume monogamy is the answer before we have understood the problem.",
    firstSection: {
      eyebrow: "You might be trying to make sense of",
      heading: "Concrete pressures inside non-monogamous life",
      intro:
        "Sometimes the question is about one relationship. Sometimes it is about the whole structure, the pace of change, or how much emotional bandwidth you actually have.",
      variant: "scenario",
      items: [
        "Jealousy, insecurity, comparison, or feeling replaceable.",
        "One partner wanting non-monogamy while the other feels unsure.",
        "Mismatched pace, mismatched openness, or pressure to adapt quickly.",
        "Agreements that feel unclear, strained, or repeatedly renegotiated.",
        "Hinge stress, divided attention, burnout, or emotional overload.",
        "Wondering whether polyamory, an open relationship, or ENM actually fits.",
        "Breakups, transitions, disclosure, or tension in a wider relational network.",
        "Trying to think clearly without being pushed toward or away from a particular structure.",
      ],
    },
    stance: {
      eyebrow: "What affirming counselling means in this context",
      heading: "Non-monogamy is not treated as the automatic problem",
      paragraphs: [
        "Polyamory, open relationships, and consensual non-monogamy can involve real difficulty, but the structure is not assumed to be the cause before we have understood what is happening.",
        "Counselling can help you think about jealousy, fear, boundaries, agreements, attachment, needs, and fit without defaulting to moral judgement. The aim is not to sell you on ENM or steer you back to monogamy. It is to help you make sense of your own experience more clearly.",
      ],
    },
    individual: {
      eyebrow: "Individual counselling",
      heading: "When more than one relationship is involved",
      paragraphs: [
        "You can attend on your own if you are in a poly or open relationship, considering consensual non-monogamy, or unsure whether the structure fits you.",
        "Even when the wider relational system is complex, individual counselling can focus on your own emotions, needs, choices, limits, patterns, and capacity. That can make the next conversation or decision less reactive.",
      ],
    },
    faqs: [
      {
        question: "Can I come alone if I am in a poly or open relationship?",
        answer:
          "Yes. Individual counselling can be useful even when the concern involves more than one partner or a wider relationship network.",
      },
      {
        question: "Do you assume monogamy is the goal?",
        answer:
          "No. Counselling does not start from the assumption that monogamy is healthier or that ENM is the problem. We look at what is happening for you.",
      },
      {
        question: "What if I am not sure ENM is right for me?",
        answer:
          "Uncertainty is a valid reason to come. Counselling can help you think about fit, pressure, desire, fear, values, and what kind of relationship structure you can actually live well inside.",
      },
      {
        question: "Can counselling help if jealousy or insecurity is the issue?",
        answer:
          "Yes. Jealousy and insecurity can be explored without shame, including what triggers them, what they protect, and what they may be asking you to notice.",
      },
    ],
  },
  lgbtqia: {
    title: "LGBTQIA+ Affirming Counselling | Vive Counselling",
    meta:
      "Affirming counselling for LGBTQIA+ clients, including support with identity, relationships, shame, family strain, and mental health. Perth-based, online across Australia.",
    h1: "LGBTQIA+ affirming counselling",
    badge: "Queer-affirming counselling",
    pathLabel: "LGBTQIA+",
    intro:
      "LGBTQIA+ affirming counselling means you do not need to explain yourself from scratch before therapy can begin. Gender, sexuality, relationships, and the rest of your life can be met with ordinary competence and care.",
    firstSection: {
      eyebrow: "What people may want to bring",
      heading: "The issue may be identity, or it may be life",
      variant: "plain",
      items: [
        "Identity, self-understanding, uncertainty, or questioning.",
        "Family rejection, family strain, or religious conflict.",
        "Shame, minority stress, or internalised criticism.",
        "Relationships, breakups, intimacy, visibility, and belonging.",
        "Gender exploration or navigating systems that do not fit well.",
        "Wanting a therapist who does not make hetero or cis assumptions.",
        "Mental health concerns where LGBTQIA+ context still matters.",
        "Ordinary life difficulties in a setting that feels affirming.",
      ],
    },
    stance: {
      eyebrow: "You do not need to explain yourself from scratch",
      heading: "Less time correcting the frame",
      paragraphs: [
        "Affirming counselling means there is no default assumption about your gender, sexuality, relationship structure, or what your life should look like. You should not need to spend half the session correcting the frame before getting to what matters.",
        "Inclusion shows up in ordinary language and practice: how questions are asked, what is not assumed, and whether your experience can be taken seriously without becoming a token or a teaching moment.",
      ],
    },
    individual: {
      eyebrow: "What affirming practice looks like here",
      heading: "Practical inclusion, not badge language",
      paragraphs: [
        "Respectful language matters. So does not forcing people into poor-fit categories, leaving room for trans and non-binary clients, and being careful with assumptions about partners, bodies, family, sex, faith, and visibility.",
        "You can also come when sexuality or gender is not the main reason for counselling. Anxiety, grief, relationship strain, shame, self-worth, burnout, and loneliness still deserve support in a setting where you do not have to scan for basic safety first.",
      ],
    },
    faqs: [
      {
        question: "Do I need to be out?",
        answer:
          "No. You do not need to be out to family, work, community, or anyone else to come to counselling. We can talk carefully about privacy, visibility, risk, and what feels possible.",
      },
      {
        question: "Can I come if sexuality or gender is not the main reason I want counselling?",
        answer:
          "Yes. LGBTQIA+ affirming counselling is not only for identity issues. It can support ordinary life difficulties without treating your identity as irrelevant or as the whole story.",
      },
      {
        question: "Do you work with trans and non-binary clients?",
        answer:
          "Yes. Trans and non-binary clients are welcome, including clients exploring gender, navigating systems, dealing with family strain, or seeking counselling for unrelated concerns.",
      },
      {
        question: "Can I talk about family rejection, religion, or shame?",
        answer:
          "Yes. Family rejection, religious conflict, shame, and internalised criticism can be discussed directly and at your pace.",
      },
    ],
  },
};

function useSeo(data: InclusionPageData) {
  useEffect(() => {
    document.title = data.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", data.meta);
    }
  }, [data]);
}

function FaqSchema({ faqs }: { faqs: InclusionPageData["faqs"] }) {
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

function InclusionChildPage({ data }: { data: InclusionPageData }) {
  useSeo(data);

  return (
    <main className="site-page inclusion-page inclusion-child-page">
      <FaqSchema faqs={data.faqs} />
      <section className="site-hero inclusion-hero">
        <Container className="site-hero__content inclusion-hero__grid">
          <div className="site-hero__copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <Link to="/inclusion">Inclusive practice</Link>
              <span>{data.pathLabel}</span>
            </nav>
            <span className="site-hero__badge">{data.badge}</span>
            <h1>{data.h1}</h1>
            <p>{data.intro}</p>
            <div className="site-actions">
              <Button href="/contact">Make an enquiry about counselling</Button>
              <Button href="/inclusion" variant="secondary">
                Inclusive counselling hub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {data.pathLabel === "LGBTQIA+" ? (
        <section className="inclusion-copy-section inclusion-copy-section--early">
          <Container className="inclusion-two-column">
            <div>
              <span className="site-eyebrow">{data.stance.eyebrow}</span>
              <h2>{data.stance.heading}</h2>
            </div>
            <div className="inclusion-prose">
              {data.stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="inclusion-items-section">
        <Container className="inclusion-two-column">
          <div className="inclusion-section-heading">
            <span className="site-eyebrow">{data.firstSection.eyebrow}</span>
            <h2>{data.firstSection.heading}</h2>
            {data.firstSection.intro ? <p>{data.firstSection.intro}</p> : null}
          </div>
          <div className={`inclusion-item-list inclusion-item-list--${data.firstSection.variant ?? "plain"}`}>
            {data.firstSection.items.map((item) => (
              <div className="inclusion-item" key={item}>
                <CheckCircle2 size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {data.pathLabel !== "LGBTQIA+" ? (
        <section className="inclusion-copy-section">
          <Container className="inclusion-two-column">
            <div>
              <span className="site-eyebrow">{data.stance.eyebrow}</span>
              <h2>{data.stance.heading}</h2>
            </div>
            <div className="inclusion-prose">
              {data.stance.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="inclusion-individual-section">
        <Container className="inclusion-two-column">
          <div>
            <span className="site-eyebrow">{data.individual.eyebrow}</span>
            <h2>{data.individual.heading}</h2>
          </div>
          <div className="inclusion-prose">
            {data.individual.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              You can also <Link to="/approach">read more about my counselling approach</Link>,{" "}
              <Link to="/about-joel">read about Joel Griffiths</Link>, check{" "}
              <Link to="/fees">online counselling fees and session details</Link>, or{" "}
              <Link to="/contact">make an enquiry about counselling</Link>.
            </p>
          </div>
        </Container>
      </section>

      <section className="inclusion-faq-section">
        <Container className="inclusion-faq-grid">
          <div className="inclusion-section-heading">
            <span className="site-eyebrow">Questions</span>
            <h2>Common questions before starting</h2>
          </div>
          <div className="inclusion-faq-list">
            {data.faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="site-cta-block">
        <Container className="site-cta-block__inner">
          <div>
            <h2>You do not need to explain everything perfectly.</h2>
            <p>
              A first enquiry can be brief. Name what is bringing you to counselling, whether online sessions suit you,
              and anything important for first contact.
            </p>
          </div>
          <Button href="/contact" variant="secondary">
            Make an enquiry about counselling <ArrowRight size={16} />
          </Button>
        </Container>
      </section>
    </main>
  );
}

export function KinkBdsmCounselling() {
  return <InclusionChildPage data={pages.kink} />;
}

export function EnmPolyamoryCounselling() {
  return <InclusionChildPage data={pages.enm} />;
}

export function LgbtqiaCounselling() {
  return <InclusionChildPage data={pages.lgbtqia} />;
}
