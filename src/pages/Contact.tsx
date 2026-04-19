import { useEffect } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Button from "../components/Button";
import Container from "../components/Container";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    text: "hello@vivecounselling.com.au",
  },
  {
    icon: Phone,
    title: "Phone",
    text: "Phone number to be added",
  },
  {
    icon: MapPin,
    title: "Location",
    text: "Perth-based, online across Australia",
  },
];

const firstMessageNotes = [
  "What is bringing you to counselling.",
  "Whether online sessions are what you are looking for.",
  "Any availability or timing constraints.",
  "Anything that would help first contact feel easier.",
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Vive Counselling";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact Vive Counselling to enquire about online counselling for adults across Australia."
      );
    }
  }, []);

  return (
    <main className="site-page contact-page">
      <section className="site-hero contact-page__hero">
        <Container className="site-hero__content contact-page__hero-grid">
          <div className="site-hero__copy">
            <span className="site-hero__badge">Contact</span>
            <h1>A calm first step.</h1>
            <p>
              You do not need a polished summary. A short note about what is bringing you to counselling and whether you
              are looking for online sessions is enough.
            </p>
          </div>

          <aside className="contact-page__hero-panel">
            <span>Before you write</span>
            <h2>Keep it simple.</h2>
            <p>
              It is fine to say something feels difficult to explain and leave the detail for later. The first contact
              only needs enough information to consider availability and fit.
            </p>
          </aside>
        </Container>
      </section>

      <section className="contact-page__form-section">
        <Container className="contact-page__form-grid">
          <div>
            <span className="site-eyebrow">Enquiry form</span>
            <h2>Send a short message.</h2>
            <p>
              The form below is a placeholder for the front end. It can be connected to the preferred form or email
              service before launch.
            </p>
          </div>

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
              <label htmlFor="phone">Phone, if you prefer a call</label>
              <input id="phone" name="phone" autoComplete="tel" type="tel" placeholder="Optional" />
            </div>

            <div className="form-row">
              <label htmlFor="message">What would you like Joel to know?</label>
              <textarea
                id="message"
                name="message"
                placeholder="A few sentences is enough. You can mention what is bringing you to counselling, availability, and anything important for first contact."
                rows={7}
              />
            </div>

            <div className="site-control-list">
              <label>
                <input name="contactPreference" type="checkbox" />
                <span>Email is the best first contact</span>
              </label>
              <label>
                <input defaultChecked name="sessionFormat" type="radio" />
                <span>Online session</span>
              </label>
            </div>

            <div className="form-row">
              <label htmlFor="timing">Preferred timing</label>
              <select id="timing" name="timing" defaultValue="weekday-daytime">
                <option value="weekday-daytime">Weekday daytime</option>
                <option value="weekday-evening">Weekday evening</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <Button type="submit">
              Send enquiry <ArrowRight size={16} />
            </Button>
          </form>
        </Container>
      </section>

      <section className="contact-page__details-section">
        <Container>
          <div className="contact-page__details-grid">
            {contactDetails.map(({ icon: Icon, title, text }) => (
              <article className="contact-page__detail-card" key={title}>
                <div className="site-card__icon">
                  <Icon size={24} />
                </div>
                <p>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="contact-page__message-section">
        <Container className="contact-page__message-grid">
          <div>
            <span className="site-eyebrow">What to include</span>
            <h2>You can leave the full story for later.</h2>
          </div>

          <article className="contact-page__message-panel">
            {firstMessageNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </article>
        </Container>
      </section>
    </main>
  );
}
