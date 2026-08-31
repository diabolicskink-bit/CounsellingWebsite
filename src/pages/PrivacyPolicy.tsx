import { Link } from "react-router-dom";
import Container from "../components/Container";
import { enquiryEmail } from "../data/enquiry";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-privacy-policy.css";

const privacyPolicyMetadata = getRouteMetadata(publicRoutePaths.privacyPolicy);
const contactHref = publicRoutePaths.contact;
const crisisSupportHref = publicRoutePaths.crisisSupport;

const policySections = [
  { href: "#scope", label: "About this policy" },
  { href: "#information", label: "Personal information collected" },
  { href: "#collection-and-use", label: "Collection and use" },
  { href: "#enquiries-and-counselling", label: "Enquiries and counselling records" },
  { href: "#website-analytics", label: "Website analytics" },
  { href: "#sharing", label: "Sharing and overseas processing" },
  { href: "#security-and-retention", label: "Security and retention" },
  { href: "#access-and-complaints", label: "Access, correction and complaints" },
] as const;

const updatedDate = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
}).format(new Date(`${privacyPolicyMetadata.lastModified}T00:00:00.000Z`));

export default function PrivacyPolicy() {
  useDocumentMetadata(privacyPolicyMetadata.title, privacyPolicyMetadata.description);

  return (
    <main className="site-page privacy-policy-page">
      <section
        aria-labelledby="privacy-policy-title"
        className="privacy-policy-page__hero site-hero-background"
      >
        <Container className="privacy-policy-page__hero-inner">
          <p className="privacy-policy-page__eyebrow">Privacy at Vive</p>
          <h1 id="privacy-policy-title">Privacy policy.</h1>
          <p className="privacy-policy-page__hero-copy">
            How Vive Counselling handles personal information from this website,
            enquiries and counselling services.
          </p>
          <p className="privacy-policy-page__updated">
            Last updated <time dateTime={privacyPolicyMetadata.lastModified}>{updatedDate}</time>
          </p>
        </Container>
      </section>

      <section className="privacy-policy-page__body">
        <Container className="privacy-policy-page__layout">
          <aside className="privacy-policy-page__index">
            <nav aria-label="Privacy policy sections">
              <p className="privacy-policy-page__index-title">On this page</p>
              <ol>
                {policySections.map((section, index) => (
                  <li key={section.href}>
                    <a href={section.href}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="privacy-policy-page__index-contact">
              <p>Privacy questions</p>
              <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
            </div>
          </aside>

          <article className="privacy-policy-page__content">
            <section aria-labelledby="privacy-summary-title" className="privacy-policy-page__summary">
              <header>
                <p className="privacy-policy-page__section-label">At a glance</p>
                <h2 id="privacy-summary-title">What happens to your information.</h2>
              </header>
              <dl className="privacy-policy-page__stages">
                <div>
                  <dt>Browsing</dt>
                  <dd>
                    You can browse without entering your name. The website records limited information
                    about visits and page use and may also use Google Analytics and Microsoft Clarity.
                  </dd>
                </div>
                <div>
                  <dt>Enquiring</dt>
                  <dd>
                    Your form message is delivered to Vive Counselling&apos;s Australian Zoho Mail
                    account so Joel can reply. The form is masked from Clarity, and your name, email
                    address and message are not added to Vive&apos;s website analytics records.
                  </dd>
                </div>
                <div>
                  <dt>Counselling</dt>
                  <dd>
                    Most client information and counselling records are kept in Zanda&apos;s
                    Australian-hosted system. Online sessions use Zanda&apos;s Zoom-powered telehealth
                    service. Vive Counselling does not currently record them.
                  </dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="scope-title" className="privacy-policy-page__section" id="scope">
              <p className="privacy-policy-page__section-number" aria-hidden="true">01</p>
              <div>
                <h2 id="scope-title">About this privacy policy</h2>
                <p>
                  Vive Counselling is a private counselling practice operated by Joel Griffiths. This
                  policy explains how personal information is collected, used, stored and disclosed
                  through the public website, initial enquiries, counselling administration and
                  counselling services.
                </p>
                <p>
                  Counselling may involve health information, which is sensitive information under
                  Australian privacy law. Vive Counselling handles personal information in line with
                  the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
                </p>
                <p>
                  Website privacy and confidentiality within a counselling relationship are related,
                  but they are not the same. An initial website or email enquiry is not a counselling
                  session. The confidentiality arrangements for counselling begin when they are agreed
                  with you as part of informed consent.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="information-title"
              className="privacy-policy-page__section"
              id="information"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">02</p>
              <div>
                <h2 id="information-title">Personal information we may collect</h2>
                <p>The information depends on how you interact with the practice. It may include:</p>
                <ul>
                  <li>
                    <strong>Contact and enquiry details</strong>, such as your name, email address,
                    state, time zone, availability, preferred timing and the message you choose to send.
                  </li>
                  <li>
                    <strong>Health and counselling information</strong> that you provide in an enquiry,
                    during counselling or in related correspondence.
                  </li>
                  <li>
                    <strong>Service and administrative records</strong>, such as appointments,
                    consent records, correspondence, invoices and counselling notes. Most client
                    records are kept in Zanda, the practice-management system used by Vive Counselling.
                  </li>
                  <li>
                    <strong>Website-use information</strong>, such as a pseudonymous visitor ID,
                    visit and page-view IDs, routes viewed, landing page, referral address, visit timing,
                    active time, selected contact option and limited advertising-attribution codes.
                  </li>
                  <li>
                    <strong>Technical information</strong>, such as browser user-agent, device category,
                    whether traffic appears to be automated, and information such as your IP address
                    received by hosting and analytics providers.
                  </li>
                </ul>
                <p>
                  You can browse without giving Vive Counselling your name. The website may still assign
                  a random visitor ID for analytics. If you make an enquiry, you can limit your first
                  message to the information Joel needs to respond.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="collection-and-use-title"
              className="privacy-policy-page__section"
              id="collection-and-use"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">03</p>
              <div>
                <h2 id="collection-and-use-title">How we collect and use personal information</h2>
                <p>
                  Most personal information comes directly from you: through the website enquiry form,
                  by email, through Zanda&apos;s client forms or portal, during appointments or through
                  other contact with the practice. Information may also come from a person you have
                  authorised to contact Vive Counselling, or where collection is authorised or required
                  by law. The website automatically records limited visit information for analytics.
                </p>
                <p>Vive Counselling may use personal information to:</p>
                <ul>
                  <li>respond to enquiries and arrange an initial consult or counselling session;</li>
                  <li>consider availability and whether the service appears suitable for the enquiry;</li>
                  <li>provide counselling and keep the records needed to administer the service;</li>
                  <li>communicate about appointments, invoices and other practical matters;</li>
                  <li>meet legal, professional, insurance and record-keeping obligations;</li>
                  <li>protect the website, identify automated traffic and investigate technical problems; and</li>
                  <li>understand how the website is used and improve its content and enquiry flow.</li>
                </ul>
              </div>
            </section>

            <section
              aria-labelledby="enquiries-and-counselling-title"
              className="privacy-policy-page__section"
              id="enquiries-and-counselling"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">04</p>
              <div>
                <h2 id="enquiries-and-counselling-title">Enquiries, client records and online counselling</h2>
                <p>
                  The enquiry form is a way to start a conversation. It is not a counselling session,
                  and it is not an emergency service. Please include only the detail Joel needs to
                  understand your enquiry and reply. If you need urgent help, use the{" "}
                  <Link to={crisisSupportHref}>Crisis Support page</Link>.
                </p>
                <p>
                  Form submissions pass through Vercel, the website host, and Resend, the email delivery
                  provider, before reaching Vive Counselling&apos;s Australian Zoho Mail inbox. Email and online
                  forms cannot be guaranteed to be completely secure. The enquiry form is masked from
                  Microsoft Clarity. Website analytics may record whether an enquiry was started, sent
                  or failed, but not your name, email address or message.
                </p>
                <p>
                  If you become a client, Vive Counselling creates and maintains your main client record
                  in Zanda. This may include contact and demographic details, appointments, consent forms,
                  clinical notes, files, correspondence and billing records. Contact Vive Counselling,
                  rather than Zanda, if you want to access or correct your client record.
                </p>
                <p>
                  Online counselling uses the Zoom-powered telehealth service integrated with Zanda.
                  Zanda holds the appointment and client link information, while Zoom processes the
                  connection and live audio and video needed to run the session. Vive Counselling does
                  not currently record telehealth sessions. Recording, transcription, file-sharing and
                  AI features will not be used to create or retain additional session content without
                  first explaining the change and obtaining any consent that is required.
                </p>
                <p>
                  The confidentiality arrangements and their limits are explained as part of informed
                  consent before counselling begins. Personal information may be used or disclosed with
                  your consent, where authorised or required by law, or where Australian privacy law
                  permits disclosure to address a serious threat to life, health or safety.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="website-analytics-title"
              className="privacy-policy-page__section"
              id="website-analytics"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">05</p>
              <div>
                <h2 id="website-analytics-title">Website analytics and browser storage</h2>
                <p>
                  Vive Counselling keeps its own website visit records to understand visits, page use and
                  enquiry outcomes. A random visitor ID is stored in your browser&apos;s local storage,
                  and the current visit is kept in session storage. A new visit starts after 30 minutes
                  of inactivity or when you arrive from a new external or tagged link. The visitor ID
                  changes after 12 months, and Vive&apos;s stored visit records are deleted after 12 months.
                </p>
                <p>
                  The website may also use Google Analytics to record public page views and actions such
                  as selecting an enquiry type or completing an enquiry. Microsoft Clarity may record
                  interactions outside the masked form and produce session replays and heatmaps to help
                  identify usability problems. Google and Microsoft may use cookies or similar
                  technologies and process technical information under their own privacy terms.
                </p>
                <p>
                  You can remove or block cookies and clear local or session storage through your browser
                  settings. Doing so may reset the identifiers used to distinguish visits. You can read
                  more in the{" "}
                  <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and the{" "}
                  <a href="https://privacy.microsoft.com/en-au/privacystatement">
                    Microsoft Privacy Statement
                  </a>.
                </p>
              </div>
            </section>

            <section aria-labelledby="sharing-title" className="privacy-policy-page__section" id="sharing">
              <p className="privacy-policy-page__section-number" aria-hidden="true">06</p>
              <div>
                <h2 id="sharing-title">Who we share information with</h2>
                <p>
                  Personal information is shared only where needed to operate the practice, provide the
                  service, meet professional or legal obligations, or where you have consented. The main
                  providers are:
                </p>
                <ul>
                  <li>
                    <a href="https://zandahealth.com/privacy-policy/"><strong>Zanda</strong></a> for
                    client records, practice administration and telehealth links. Zanda stores and backs
                    up Australian account data in Australian AWS data centres and uses Zoom to provide
                    its integrated telehealth feature.
                  </li>
                  <li>
                    <a href="https://www.zoom.com/en/trust/privacy/privacy-statement/"><strong>Zoom</strong></a>
                    {" "}for the live video service used through Zanda.
                  </li>
                  <li>
                    <a href="https://www.zoho.com/privacy.html"><strong>Zoho Mail</strong></a> for
                    email correspondence and the practice inbox. Vive Counselling uses an Australian
                    zoho.com.au account, so Zoho stores its service data in its Australian data centre.
                  </li>
                  <li>
                    <a href="https://vercel.com/legal/privacy-policy"><strong>Vercel</strong></a> for
                    website hosting and server functions,{" "}
                    <a href="https://resend.com/legal/privacy-policy"><strong>Resend</strong></a> for
                    delivery of website enquiries, and Neon for Vive&apos;s website analytics database.
                  </li>
                  <li>
                    Google for Google Analytics and Microsoft for Clarity on public website pages.
                  </li>
                </ul>
                <p>
                  Zanda stores and backs up Australian account data in Australian AWS data centres.
                  Limited, authorised support access may occur from Zanda staff in the United Kingdom or
                  United States, and some Zanda features use overseas providers. Zoom&apos;s telehealth
                  processing can occur in selected regions including Australia, Europe and the United States.
                </p>
                <p>
                  Zoho Mail service data is stored in Australia for the practice&apos;s zoho.com.au
                  account. Website enquiry messages also pass through Resend, which stores customer data
                  in the United States. Website hosting, database and analytics providers may process data
                  in the United States and other countries in which they operate. Provider locations can
                  change.
                </p>
                <p>
                  Where personal information may be processed overseas, Vive Counselling takes reasonable
                  steps to use providers with appropriate privacy and security safeguards. Overseas
                  recipients may still be subject to different privacy laws.
                </p>
                <p>
                  Information may also be disclosed when you authorise it, when disclosure is authorised
                  or required by law, or when another permitted privacy exception applies.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="security-and-retention-title"
              className="privacy-policy-page__section"
              id="security-and-retention"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">07</p>
              <div>
                <h2 id="security-and-retention-title">How we protect and retain information</h2>
                <p>
                  Vive Counselling takes reasonable steps to protect personal information from misuse,
                  interference, loss, unauthorised access, modification and disclosure. This includes
                  restricting access and using service providers with security controls. No internet,
                  email or electronic storage system can be guaranteed completely secure.
                </p>
                <p>
                  Zanda&apos;s practice-management and electronic health record system is independently
                  certified to ISO/IEC 27001:2022. The certification covers the platform and the supporting
                  engineering, infrastructure, data handling, security, migration, support and people
                  processes. Zanda states that Australian account data is encrypted at rest and in transit,
                  with access controls, activity logging, encrypted backups and tested recovery procedures.
                  You can review Zanda&apos;s{" "}
                  <a href="https://zandahealth.com/security/">security information</a> and{" "}
                  <a href="https://zandahealth.com/media/Zanda-Health-Pty-Ltd.-ISMS-ISO27001.pdf">
                    current ISO/IEC 27001 certificate
                  </a>.
                </p>
                <p>
                  First-party website visit data is retained for 12 months. Zanda does not automatically
                  delete archived client records; Vive Counselling manages their retention. Enquiry
                  correspondence, administrative information and counselling records are kept only for
                  as long as they are needed for the purpose for which they were collected and to meet
                  applicable legal, professional, insurance and record-keeping requirements. This can
                  mean some records cannot be deleted immediately after a request.
                </p>
                <p>
                  Suspected data breaches are assessed and managed. Vive Counselling will notify affected
                  people and the Office of the Australian Information Commissioner when the Notifiable
                  Data Breaches scheme requires it.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="access-and-complaints-title"
              className="privacy-policy-page__section"
              id="access-and-complaints"
            >
              <p className="privacy-policy-page__section-number" aria-hidden="true">08</p>
              <div>
                <h2 id="access-and-complaints-title">Access, correction and complaints</h2>
                <p>
                  You can ask to access personal information Vive Counselling holds about you, or ask for
                  inaccurate, out-of-date, incomplete, irrelevant or misleading information to be corrected.
                  Email <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>. Identity may need to be
                  verified before information is released, and any legal exception will be explained.
                </p>
                <p>
                  To make a privacy complaint, use the same email address, put &ldquo;Privacy complaint&rdquo;
                  in the subject line and explain what happened. Vive Counselling will consider the complaint
                  and aims to respond within 30 days. If you are not satisfied, or no response is received
                  within 30 days, you can{" "}
                  <a href="https://www.oaic.gov.au/privacy/privacy-complaints/lodge-a-privacy-complaint-with-us">
                    lodge a privacy complaint with the Office of the Australian Information Commissioner
                  </a>.
                </p>
              </div>
            </section>

            <section aria-labelledby="contact-title" className="privacy-policy-page__closing">
              <p className="privacy-policy-page__section-label">Contact and changes</p>
              <h2 id="contact-title">Privacy contact details.</h2>
              <p>
                Email <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a> or use the{" "}
                <Link to={contactHref}>Contact page</Link>. This policy may be updated when the practice,
                providers or privacy obligations change. The current version will always show its last
                updated date at the top of this page.
              </p>
            </section>
          </article>
        </Container>
      </section>
    </main>
  );
}
