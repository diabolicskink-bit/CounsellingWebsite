import { Mail, MapPin, Phone } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import Container from "../components/Container";
import PageHero from "../components/PageHero";

export default function Contact() {
  return (
    <>
      <PageHero
        title="A calm first step."
        copy="You do not need a polished summary. A short note about what is bringing you to counselling and whether you are looking for online sessions is enough."
      />

      <section className="section">
        <Container className="contact-grid">
          <form className="contact-form" action="#" method="post">
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" autoComplete="name" type="text" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" autoComplete="email" type="email" />
            </div>
            <div className="form-row">
              <label htmlFor="phone">Phone, if you prefer a call</label>
              <input id="phone" name="phone" autoComplete="tel" type="tel" />
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
            <Button type="submit">Send enquiry</Button>
            <p className="form-note">
              This form is a front-end placeholder. Connect it to your preferred form or email service before launch.
            </p>
          </form>

          <aside className="contact-aside">
            <Card>
              <h2>Practical contact details</h2>
              <div className="contact-list">
                <div>
                  <span className="icon-box">
                    <Mail size={20} />
                  </span>
                  <p>
                    <strong>Email</strong>
                    <span>hello@vivecounselling.com.au</span>
                  </p>
                </div>
                <div>
                  <span className="icon-box">
                    <Phone size={20} />
                  </span>
                  <p>
                    <strong>Phone</strong>
                    <span>Phone number to be added</span>
                  </p>
                </div>
                <div>
                  <span className="icon-box">
                    <MapPin size={20} />
                  </span>
                  <p>
                    <strong>Location</strong>
                    <span>Perth-based, online across Australia</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="quiet-card">
              <h2>Before you write</h2>
              <p>
                You can keep the first message simple. It is fine to say that something is difficult to explain
                and leave the detail for later.
              </p>
            </Card>
          </aside>
        </Container>
      </section>
    </>
  );
}
