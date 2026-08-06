import Container from "../../components/Container";
import useDocumentMetadata from "../../hooks/useDocumentMetadata";
import "../../styles-policies.css";

const policySections = [
  {
    id: "cancellation",
    number: "01",
    title: "Cancellation",
    introduction:
      "How appointment changes, late notice and missed sessions could be explained.",
    details: [
      {
        term: "Notice",
        description:
          "State the notice period here and explain how a client should cancel or reschedule.",
      },
      {
        term: "Late cancellation",
        description:
          "State whether a fee applies when the required notice period is not met.",
      },
      {
        term: "Missed sessions",
        description:
          "Explain what happens when a client does not attend a scheduled session.",
      },
      {
        term: "Exceptions",
        description:
          "Describe any discretion for illness, emergencies or other exceptional circumstances.",
      },
    ],
  },
  {
    id: "confidentiality",
    number: "02",
    title: "Confidentiality",
    introduction:
      "How privacy, its limits and professional obligations could be explained.",
    details: [
      {
        term: "What stays private",
        description:
          "Summarise what is treated as confidential within the counselling relationship.",
      },
      {
        term: "When information may be shared",
        description:
          "List the safety, legal or consent-based circumstances that can limit confidentiality.",
      },
      {
        term: "Professional supervision",
        description:
          "Explain how client work may be discussed without unnecessary identifying information.",
      },
      {
        term: "Questions or concerns",
        description:
          "Explain how a client can ask about confidentiality before or during counselling.",
      },
    ],
  },
] as const;

export default function Policies() {
  useDocumentMetadata(
    "Policies | Vive Counselling",
    "Development-only structural prototype for Vive Counselling policy information.",
  );

  return (
    <main className="site-page policies-page">
      <section
        aria-labelledby="policies-title"
        className="policies-page__introduction"
      >
        <Container className="policies-page__introduction-inner">
          <p className="policies-page__eyebrow">Development preview</p>
          <div className="policies-page__introduction-grid">
            <h1 id="policies-title">Policies</h1>
            <p className="policies-page__summary">
              A structural prototype for presenting practical information with
              clarity, context and enough detail to answer common questions.
            </p>
          </div>
          <div aria-label="Prototype status" className="policies-page__notice" role="note">
            <strong>Illustrative content</strong>
            <p>
              The wording on this page is for design review only. It does not
              describe Vive Counselling&rsquo;s current policies.
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Policy document" className="policies-page__body">
        <Container className="policies-page__layout">
          <nav aria-label="Policy contents" className="policies-page__contents">
            <p className="policies-page__contents-label">On this page</p>
            <ol>
              {policySections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span aria-hidden="true">{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="policies-page__document">
            {policySections.map((section) => (
              <section
                aria-labelledby={`${section.id}-title`}
                className="policies-page__chapter"
                id={section.id}
                key={section.id}
              >
                <header className="policies-page__chapter-heading">
                  <span aria-hidden="true" className="policies-page__chapter-number">
                    {section.number}
                  </span>
                  <div>
                    <h2 id={`${section.id}-title`}>{section.title}</h2>
                    <p>{section.introduction}</p>
                  </div>
                </header>

                <dl className="policies-page__details">
                  {section.details.map((detail) => (
                    <div key={detail.term}>
                      <dt>{detail.term}</dt>
                      <dd>{detail.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </article>
        </Container>
      </section>
    </main>
  );
}
