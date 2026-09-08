import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-kink-bdsm.css";

const metadata = getRouteMetadata(publicRoutePaths.kinkBdsm);

export default function KinkBdsmCounselling() {
  useDocumentMetadata(metadata.title, metadata.description);

  return (
    <main className="site-page kink-page">
      <section className="site-hero site-hero-surface kink-cover" aria-labelledby="kink-heading">
        <Container>
          <p className="site-hero__eyebrow">Kink &amp; BDSM counselling</p>
          <h1 className="site-hero__statement" id="kink-heading">
            The things that<br />are <em>hard to say.</em>
          </h1>
          <p className="site-reading kink-cover__introduction">
            You can be comfortable talking about sex and still struggle to tell a partner
            that you felt hurt, wanted more, or need something to change. Counselling gives
            us time to understand what you have been feeling and why it may be difficult
            to talk about.
          </p>
          <Link className="kink-cover__action" to={publicRoutePaths.contact}>
            <span>Contact Joel</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <div className="kink-cover__details">
            <p>With Joel Griffiths, ACA-registered counsellor</p>
            <p>Based in Perth. Online across Australia.</p>
          </div>
        </Container>
      </section>

      <Container className="kink-essay">
        <section className="kink-discussion" aria-labelledby="kink-work-heading">
          <p className="kink-page__label">The work we can do together</p>
          <h2 id="kink-work-heading">What we pay<br /><em>attention to.</em></h2>
          <p className="site-reading">
            You may be able to negotiate a scene in detail, yet find it hard to say you felt
            lonely afterwards. Or you may enjoy a role while feeling uneasy about what a
            partner expects of you outside it.
          </p>
          <p className="site-reading">
            In counselling, we can look at what you hoped for, what happened and what makes
            it difficult to talk about.
          </p>
          <p className="site-reading">
            That understanding can help you work out what to say to a partner, or reconsider
            an arrangement that no longer suits you.
          </p>
        </section>

        <aside className="kink-practitioner" aria-labelledby="kink-practitioner-heading">
          <div className="kink-practitioner__portrait">
            <img
              src="/joel-griffiths-homepage-portrait.jpg"
              alt="Joel Griffiths"
              width="744"
              height="1123"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="kink-practitioner__introduction">
            <p className="kink-page__label">Your counsellor</p>
            <h2 id="kink-practitioner-heading">I’m Joel.</h2>
            <p className="site-reading">
              I’m a counsellor with significant expertise in kink and BDSM and extensive lived
              experience in these communities. My work brings that knowledge into conversations
              about desire, intimacy, shame and the ways people relate to one another.
            </p>
            <Link className="kink-page__link" to={publicRoutePaths.workingWithJoel}>
              <span>How I work</span>
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="kink-practitioner__broader-work">
            <p className="site-reading">
              I also work with anxiety, depression, trauma, grief and burnout.
            </p>
          </div>
        </aside>

        <section className="kink-pleasure" aria-labelledby="kink-pleasure-heading">
          <h2 id="kink-pleasure-heading">What you <em>love</em><br />about kink matters.</h2>
          <p className="site-reading">
            Pleasure, closeness, play or a sense of belonging may be part of what makes
            kink valuable to you. I want to understand those experiences as well as anything
            that is troubling you.
          </p>
          <p className="site-reading">
            You may also want to talk about a fantasy you have never shared, a change in
            your desires, or feeling ashamed of something you enjoy. We can explore those
            questions without deciding in advance what your sexuality ought to look like.
          </p>
        </section>

        <section className="kink-discussion kink-discussion--harm" aria-labelledby="kink-harm-heading">
          <p className="kink-page__label">Consent &amp; harm</p>
          <h2 id="kink-harm-heading">If someone<br /><em>has hurt you.</em></h2>
          <p className="site-reading">
            We can talk about pressure or harm, including when someone has used a role,
            an agreement or the language of consent to excuse it.
            You do not have to defend kink in order to talk about something that was wrong.
          </p>
          <p className="site-reading">
            If you are unsure about an experience, we can examine it carefully. I work with
            trauma, including sexual trauma, and we can look at how the experience is
            affecting your life now.
          </p>
          <Link className="kink-page__link" to={`${publicRoutePaths.articles}/kink-aware-therapy`}>
            <span>Read about kink-aware therapy</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </section>
      </Container>

      <section className="kink-invitation" aria-labelledby="kink-invitation-heading">
        <Container className="kink-invitation__layout">
          <div className="kink-invitation__opening">
            <p className="kink-page__label">Starting counselling</p>
            <h2 id="kink-invitation-heading">See whether<br />we’re a <em>good fit.</em></h2>
          </div>
          <div className="kink-invitation__copy">
            <p className="site-reading">
              You can request a free 15-minute consult, ask a question, or get in touch to
              arrange an appointment. Sessions are online, for adults across Australia.
            </p>
            <p className="site-reading">
              I work with individuals, couples and people in relationships involving more
              than two people. If you would like to attend with partners, we’ll discuss
              who is coming and the arrangements before booking.
            </p>
            <Link className="kink-page__button" to={publicRoutePaths.contact}>
              <span>Contact Joel</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
