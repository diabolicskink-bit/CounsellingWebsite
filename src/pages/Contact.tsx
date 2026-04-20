import { useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/Container";

const processSteps = [
  {
    title: "A reply from Joel",
    text: "Usually within a few working days. He may ask a short follow-up question about availability or what you are looking for.",
  },
  {
    title: "A brief check-in if useful",
    text: "A short phone call or a couple of emails to confirm there is a reasonable fit, before a first session is arranged.",
  },
  {
    title: "A first session",
    text: "When timing and fit seem right, a first online session can be booked. You can still decide from there whether to continue.",
  },
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact Joel Griffiths at Vive Counselling. A short note about what is bringing you to counselling is enough to begin."
      );
    }
  }, []);

  return (
    <main className="site-page contact-page">
      <section className="hero-section hero-bg--diagonal">
        <Container>
          <div className="hero-top">
            <h1 className="hero-display">
              You do not need<br />
              the <em>whole story</em><br />
              ready.
            </h1>
            <div className="hero-copy-panel contact-page__hero-copy">
              <p>
                A brief note about what is bringing you to counselling is enough to begin. You can leave the full
                detail for a first conversation. Joel replies to all enquiries personally.
              </p>
              <a className="contact-page__email-link" href="mailto:hello@vivecounselling.com.au">
                hello@vivecounselling.com.au
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="contact-page__form-section">
        <Container>
          <div className="contact-page__form-grid">
            <aside className="contact-page__sidebar">
              <span className="site-eyebrow">What to include</span>
              <h2>Keep it short.</h2>
              <p>
                The first message only needs enough for Joel to consider whether there is likely availability and a
                reasonable fit. You do not need a polished summary.
              </p>
              <div className="contact-page__include-list">
                <p>What is bringing you to counselling</p>
                <p>Whether online sessions are what you are looking for</p>
                <p>Any availability or timing constraints</p>
                <p>Anything that would make first contact easier</p>
              </div>
              <p className="contact-page__sidebar-note">
                If some of this is difficult to put into words yet, you can say that. It is a reasonable place to
                start.
              </p>
            </aside>

            <form className="site-form contact-page__form" action="#" method="post">
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" type="text" placeholder="Your name" />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" autoComplete="email" type="email" placeholder="you@example.com" />
              </div>

              <div className="form-row">
                <label htmlFor="message">Your message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="A few sentences is enough. Say what is bringing you to counselling, whether online sessions suit you, and anything else that feels relevant."
                  rows={8}
                />
              </div>

              <div className="form-row">
                <label htmlFor="timing">Preferred timing</label>
                <select id="timing" name="timing" defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option value="weekday-morning">Weekday mornings</option>
                  <option value="weekday-afternoon">Weekday afternoons</option>
                  <option value="weekday-evening">Weekday evenings</option>
                  <option value="flexible">Flexible</option>
                  <option value="no-preference">No preference yet</option>
                </select>
              </div>

              <Button type="submit">Send your message</Button>
            </form>
          </div>
        </Container>
      </section>

      <section className="contact-page__process-section">
        <Container>
          <div className="contact-page__process-heading">
            <span className="site-eyebrow">What happens next</span>
            <h2>After you get in touch</h2>
          </div>
          <div className="hero-principles-strip">
            {processSteps.map((step) => (
              <div className="hero-principle-item" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
