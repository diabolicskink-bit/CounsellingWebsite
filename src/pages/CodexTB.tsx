import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const keepItems = [
  "A felt sense of Joel, not just service copy.",
  "A plain-English description of how the work feels.",
  "Enough seriousness and training to build trust.",
  "A low-pressure way to begin, without a loud sales ending.",
];

const improveItems = [
  "The current section still reads as several stitched-together beats.",
  "The About, Approach, and Contact parts are present, but not yet fused.",
  "The strongest line arrives at the end instead of shaping the whole section.",
  "It needs a clearer final form in the homepage rhythm.",
];

const roomNotes = [
  {
    title: "Joel",
    copy: "Perth-based, ACA registered, working online with adults across Australia.",
  },
  {
    title: "The work",
    copy: "Serious about patterns, not just symptoms. Plainspoken, not clinical for its own sake.",
  },
  {
    title: "Beginning",
    copy: '"I think I need somewhere to talk about this" is a complete first message.',
  },
];

const noteMarginItems = [
  {
    title: "Joel Griffiths",
    copy: "Graduate Diploma in Counselling and Psychotherapy. ACA registered counsellor.",
  },
  {
    title: "Approach",
    copy: "Integrative and psychodynamically informed, grounded in relationships and recurring difficulties.",
  },
  {
    title: "First contact",
    copy: "You can leave the full story for later.",
  },
];

const ledgerRows = [
  {
    label: "Who is here",
    copy: "Joel Griffiths works online with adults across Australia, with particular interest in shame, attachment, sexuality, and difficulties that feel exposing, confusing, or hard to explain elsewhere.",
  },
  {
    label: "What the work pays attention to",
    copy: "The counselling is interested in the immediate problem, but not limited to it. It also pays attention to the wider pattern: relationships, repetitions, defences, losses, and the emotional logic of why certain struggles keep returning.",
  },
  {
    label: "How the first step works",
    copy: "If this feels like the right kind of space, a brief message is enough. You do not need the whole story ready before making contact.",
  },
];

const thresholdLines = [
  "For what is hard to say.",
  "For what keeps repeating.",
  "For beginnings that need to stay small at first.",
];

const sectionLinks = [
  { label: "About Joel", href: "/about-joel" },
  { label: "Approach", href: "/approach" },
  { label: "Contact", href: "/contact" },
];

function QuietLinks({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <nav
      className={`codex-tb-quiet-links ${light ? "codex-tb-quiet-links--light" : ""} ${className}`.trim()}
      aria-label="Related pages"
    >
      {sectionLinks.map((link) => (
        <Link
          className={`codex-tb-quiet-link ${light ? "codex-tb-quiet-link--light" : ""}`.trim()}
          key={link.href}
          to={link.href}
        >
          <span>{link.label}</span>
          <ArrowRight size={16} />
        </Link>
      ))}
    </nav>
  );
}

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | Final homepage section candidates";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Five integrated homepage section candidates combining About, Approach, and Contact."
      );
    }
  }, []);

  return (
    <main className="site-page codex-tb-page">
      <section className="site-grid codex-tb-intro">
        <Container className="site-grid__heading codex-tb-intro__inner">
          <span className="site-eyebrow">Homepage section study</span>
          <h1>One section. Four jobs. No stitched-together feeling.</h1>
          <p>
            The current homepage section already found the right ingredients: a human sense of Joel,
            a description of the work, enough seriousness to build trust, and a low-pressure way to
            begin. What it still needs is form. It has to feel gathered, not assembled.
          </p>
        </Container>
      </section>

      <section className="codex-tb-brief">
        <Container className="codex-tb-brief__grid">
          <article className="codex-tb-brief-block">
            <span className="site-eyebrow">Keep</span>
            <h2>The section should still hold these things.</h2>
            <ul className="codex-tb-brief-list">
              {keepItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="codex-tb-brief-block codex-tb-brief-block--soft">
            <span className="site-eyebrow">Improve</span>
            <h2>This is what the new candidates are trying to solve.</h2>
            <ul className="codex-tb-brief-list">
              {improveItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="codex-tb-trial codex-tb-trial--room">
        <Container>
          <span className="codex-tb-trial__label">Candidate 01 / The Room</span>
          <div className="codex-tb-room">
            <div className="codex-tb-room__intro">
              <h2>A room for what has become difficult to carry alone.</h2>
            </div>

            <div className="codex-tb-room__body">
              <p>
                Joel Griffiths offers online counselling for adults across Australia. His way
                of working is thoughtful, direct, and psychodynamically informed: interested in
                the immediate problem, but also in the relationships, repetitions, and private
                meanings gathered around it.
              </p>
              <p>
                That may mean anxiety, self-criticism, attachment, shame, sexuality, conflict,
                or the sense that something in life keeps taking the same shape. The point is
                not to make your experience sound neater than it feels. The point is to have
                somewhere it can be understood properly.
              </p>
            </div>

            <aside className="codex-tb-room__rail">
              {roomNotes.map((note) => (
                <div className="codex-tb-room-note" key={note.title}>
                  <strong>{note.title}</strong>
                  <p>{note.copy}</p>
                </div>
              ))}
            </aside>

            <QuietLinks className="codex-tb-room__links" />
          </div>
        </Container>
      </section>

      <section className="codex-tb-trial codex-tb-trial--desk">
        <Container>
          <span className="codex-tb-trial__label">Candidate 02 / The Desk</span>
          <div className="codex-tb-desk">
            <article className="codex-tb-desk__main">
              <span className="site-eyebrow">Working with Joel</span>
              <p className="codex-tb-desk__statement">
                Some people arrive with a clear problem. Some with a pattern they are tired of
                repeating. Some only know that life has narrowed around a fear, a shame, or a
                private difficulty they have never quite managed to say out loud.
              </p>
              <p className="codex-tb-desk__support">
                Joel works with adults who want somewhere serious enough for that. The
                counselling is grounded in real life, but psychologically minded about what sits
                underneath: attachment, self-protection, desire, conflict, repetition, and the
                things people often keep out of ordinary conversation.
              </p>
            </article>

            <aside className="codex-tb-desk__note codex-tb-desk__note--about">
              <strong>About Joel</strong>
              <p>
                Perth-based, working online across Australia, with particular understanding of
                shame, sexuality, kink, and ethical non-monogamy.
              </p>
            </aside>

            <aside className="codex-tb-desk__note codex-tb-desk__note--begin">
              <strong>How it can begin</strong>
              <p>
                With a short email. A few honest lines. No polished summary required.
              </p>
            </aside>

            <div className="codex-tb-desk__footer">
              <p>Maybe not all at once. But enough to begin honestly.</p>
              <QuietLinks className="codex-tb-desk__links" />
            </div>
          </div>
        </Container>
      </section>

      <section className="codex-tb-trial codex-tb-trial--note">
        <Container>
          <span className="codex-tb-trial__label">Candidate 03 / The Note</span>
          <div className="codex-tb-note">
            <article className="codex-tb-note__body">
              <span className="codex-tb-note__eyebrow">A more personal voice</span>
              <h2>What matters to me in this work is that you do not have to tidy yourself up before you speak.</h2>
              <p>
                I am interested in the difficulty you are dealing with, but also in the larger
                pattern around it: the attachments, habits of self-protection, repeated
                disappointments, and private meanings that can make a present problem feel
                bigger than the present moment alone.
              </p>
              <p>
                I work in a way that is thoughtful, direct, and non-shaming. That means we can
                speak plainly, look underneath what is happening, and keep the work connected to
                the actual life you are living.
              </p>
              <p>
                If you think this may be the right place to talk, a short note is enough to
                begin.
              </p>
            </article>

            <aside className="codex-tb-note__margin">
              {noteMarginItems.map((item) => (
                <div className="codex-tb-note__item" key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                </div>
              ))}
              <QuietLinks className="codex-tb-note__links" />
            </aside>
          </div>
        </Container>
      </section>

      <section className="codex-tb-trial codex-tb-trial--ledger">
        <Container>
          <span className="codex-tb-trial__label">Candidate 04 / The Ledger</span>
          <div className="codex-tb-ledger">
            <div className="codex-tb-ledger__intro">
              <h2>Not just support. A way of understanding what keeps happening.</h2>
            </div>

            <div className="codex-tb-ledger__table">
              {ledgerRows.map((row) => (
                <div className="codex-tb-ledger__row" key={row.label}>
                  <span>{row.label}</span>
                  <p>{row.copy}</p>
                </div>
              ))}
            </div>

            <div className="codex-tb-ledger__quote">
              <p>You do not need the whole story ready before the first sentence counts.</p>
            </div>

            <QuietLinks className="codex-tb-ledger__links" />
          </div>
        </Container>
      </section>

      <section className="codex-tb-trial codex-tb-trial--threshold">
        <Container>
          <span className="codex-tb-trial__label codex-tb-trial__label--light">
            Candidate 05 / The Threshold
          </span>
          <div className="codex-tb-threshold">
            <div className="codex-tb-threshold__intro">
              <h2>You may not need more information. You may need the right place to start.</h2>
              <p>
                By this point in the homepage, the question is probably not what counselling
                is. It is whether this feels like the kind of work, and the kind of person,
                you could imagine speaking to.
              </p>
            </div>

            <div className="codex-tb-threshold__lines">
              {thresholdLines.map((line) => (
                <p className="codex-tb-threshold__line" key={line}>
                  {line}
                </p>
              ))}
            </div>

            <aside className="codex-tb-threshold__side">
              <p>
                Joel Griffiths offers thoughtful online counselling for adults across Australia.
                The work is steady, psychologically minded, and non-shaming. If this already
                feels close to your life, you can begin with a short note.
              </p>
              <QuietLinks className="codex-tb-threshold__links" light />
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
