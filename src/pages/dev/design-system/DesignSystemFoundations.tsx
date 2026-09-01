import DesignSystemSpecimen from "../../../components/DesignSystemSpecimen";
import DesignSystemWorkspace from "./DesignSystemWorkspace";

type ColourFoundation = {
  ariaLabel: string;
  consumers: readonly [string, ...string[]];
  facts: readonly [
    readonly [label: string, value: string],
    readonly [label: string, value: string],
  ];
  identifier: `--${string}`;
  note: string;
  role: string;
  swatchLabel: string;
  swatchModifier: string;
  swatchValue: string;
  title: string;
};

const colourFoundations: readonly ColourFoundation[] = [
  {
    ariaLabel: "Cedar colour swatch, hexadecimal 234b3d",
    consumers: [
      ".site-header .header-button and .button--primary",
      ".site-footer focus-visible states",
      ".contact-invitation__action and Contact form focus states",
    ],
    facts: [
      ["Light text on cedar", "9.53:1"],
      ["Cedar on paper", "9.05:1"],
    ],
    identifier: "--cedar",
    note: "Both recorded pairings meet WCAG AAA contrast for ordinary text.",
    role: "Primary brand accent for action surfaces, strong interactive or editorial emphasis, and focus or boundary cues on verified light site surfaces.",
    swatchLabel: "Primary accent",
    swatchModifier: "cedar",
    swatchValue: "#234B3D",
    title: "Cedar",
  },
  {
    ariaLabel: "Warm section rule swatch, cedar at 22 percent over the warm section background",
    consumers: [
      ".site-section-warm and closing invitations",
      "Documents and Crisis Support content boundaries",
      "Working with Joel and specialist Inclusion page editorial rules",
    ],
    facts: [
      ["Composite on section", "#C4CBC2"],
      ["Rule width", "1px"],
    ],
    identifier: "--section-rule",
    note: "The rule separates adjacent materials without being the only cue to section structure.",
    role: "Quiet cedar-derived separator for supported light editorial materials.",
    swatchLabel: "Section boundary",
    swatchModifier: "section-rule",
    swatchValue: "22%",
    title: "Light editorial rule",
  },
  {
    ariaLabel: "Dark editorial rule swatch, pale green at 20 percent over the dark editorial background",
    consumers: [
      "Specialist counselling hero actions",
      "Home, Working with Joel, and Inclusion topic boundaries",
      "Documents hero",
    ],
    facts: [
      ["Composite on dark", "#41564F"],
      ["Rule width", "1px"],
    ],
    identifier: "--section-dark-rule",
    note: "The rule remains decorative and is never the only cue to content structure.",
    role: "Quiet pale separator for supported dark editorial and hero materials.",
    swatchLabel: "Dark-surface boundary",
    swatchModifier: "section-dark-rule",
    swatchValue: "20%",
    title: "Dark editorial rule",
  },
  {
    ariaLabel: "Warm section colour swatch, hexadecimal f2efe8",
    consumers: [
      "Documents workspace",
      "Home, Working with Joel, and Inclusion editorial backings",
      "Contact, Kink and BDSM, ENM and polyamory, and LGBTQIA+ sections",
    ],
    facts: [
      ["Dark ink on section", "13.87:1"],
      ["Body text on section", "8.18:1"],
    ],
    identifier: "--section-warm",
    note: "The lighter global page canvas remains a distinct inherited material.",
    role: "Flat warm paper for public editorial page backings, sections, and content materials.",
    swatchLabel: "Editorial section",
    swatchModifier: "section-warm",
    swatchValue: "#F2EFE8",
    title: "Warm paper",
  },
  {
    ariaLabel: "Sage colour swatch, hexadecimal dfe8dc",
    consumers: [
      "Documents workspace and table headings",
      "Working with Joel and specialist Inclusion page editorial fields",
      "Contact essentials and submission mark",
    ],
    facts: [
      ["Dark ink on sage", "12.68:1"],
      ["Body text on sage", "7.47:1"],
    ],
    identifier: "--section-sage",
    note: "Both recorded pairings meet WCAG AAA contrast for ordinary text.",
    role: "Pale sage material for editorial fields, sections, supporting fills, and the Documents workspace navigation.",
    swatchLabel: "Editorial field",
    swatchModifier: "section-sage",
    swatchValue: "#DFE8DC",
    title: "Sage",
  },
  {
    ariaLabel: "Dark editorial colour swatch, hexadecimal 173028",
    consumers: [
      "Documents navigation",
      "Home, Working with Joel, and specialist Inclusion page treatments",
      "Contact first-message heading",
    ],
    facts: [
      ["Light text on dark", "13.72:1"],
      ["Dark on warm paper", "12.27:1"],
    ],
    identifier: "--section-dark",
    note: "The nearby Kink page dark remains local because it is a different colour.",
    role: "Deep green for dark editorial surfaces and strong foregrounds on supported warm or sage materials.",
    swatchLabel: "Editorial contrast",
    swatchModifier: "section-dark",
    swatchValue: "#173028",
    title: "Dark editorial",
  },
  {
    ariaLabel: "Soft dark editorial colour swatch, hexadecimal 21483a",
    consumers: [
      "Home inclusive-practice background",
      "Working with Joel topics background",
    ],
    facts: [
      ["Light text on surface", "9.96:1"],
      ["Supported companion", "--section-dark"],
    ],
    identifier: "--section-dark-soft",
    note: "The colour is supported only as a dark-gradient companion.",
    role: "Lighter endpoint for gradients composed with the supported dark editorial material.",
    swatchLabel: "Gradient endpoint",
    swatchModifier: "section-dark-soft",
    swatchValue: "#21483A",
    title: "Soft dark editorial",
  },
  {
    ariaLabel: "Portrait panel colour swatch, hexadecimal 6b5146",
    consumers: [".home-about__portrait", ".working-with-joel-page__intro-note"],
    facts: [
      ["Light text on panel", "7.07:1"],
      ["Panel against frame", "5.22:1"],
    ],
    identifier: "--portrait-panel",
    note: "The supported role is limited to the shared portrait treatment.",
    role: "Dark chocolate outer material for the identified-person portrait treatment; not a general surface or action colour.",
    swatchLabel: "Portrait material",
    swatchModifier: "portrait-panel",
    swatchValue: "#6B5146",
    title: "Portrait panel",
  },
  {
    ariaLabel: "Portrait frame colour swatch, hexadecimal e4d9cc",
    consumers: [
      ".home-about__portrait-frame",
      ".working-with-joel-page__intro-note .hero-media-note__image",
    ],
    facts: [
      ["Dark text on frame", "11.45:1"],
      ["Frame against panel", "5.22:1"],
    ],
    identifier: "--portrait-frame",
    note: "This is a non-text media material, not a general content surface.",
    role: "Pale warm backing immediately around identified-person imagery inside the shared chocolate portrait panel.",
    swatchLabel: "Image backing",
    swatchModifier: "portrait-frame",
    swatchValue: "#E4D9CC",
    title: "Portrait frame",
  },
  {
    ariaLabel: "Portrait footer tint swatch, rgba 32 21 17 at 12 percent over the portrait panel",
    consumers: [".home-about__portrait-link", ".working-with-joel-page__intro-note-details"],
    facts: [
      ["Composite on panel", "#624A40"],
      ["Light text on composite", "7.95:1"],
    ],
    identifier: "--portrait-footer-tint",
    note: "The stronger Home-only interaction tint remains page-local.",
    role: "Translucent chocolate footer or action band applied only over the shared portrait panel.",
    swatchLabel: "Footer and action tint",
    swatchModifier: "portrait-footer",
    swatchValue: "12%",
    title: "Portrait footer tint",
  },
];

function ColourFoundationSpecimen({ foundation }: { foundation: ColourFoundation }) {
  return (
    <DesignSystemSpecimen
      consumers={foundation.consumers}
      identifier={foundation.identifier}
      recordPath="docs/design-system/foundations.md"
      role={foundation.role}
      title={foundation.title}
    >
      <div className="system-colour-specimen">
        <div
          className={
            "system-colour-specimen__swatch system-colour-specimen__swatch--" +
            foundation.swatchModifier
          }
          aria-label={foundation.ariaLabel}
        >
          <span>{foundation.swatchLabel}</span>
          <strong>{foundation.swatchValue}</strong>
        </div>

        <div className="system-colour-specimen__facts">
          <div>
            <span>Production token</span>
            <code>{"var(" + foundation.identifier + ")"}</code>
          </div>
          <dl>
            {foundation.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>{foundation.note}</p>
        </div>
      </div>
    </DesignSystemSpecimen>
  );
}
export default function DesignSystemFoundations() {
  return (
    <DesignSystemWorkspace
      description="Public semantic type and material foundations approved for deliberate reuse, shown through their current production implementation and verified roles."
      section="foundations"
      title="Foundations"
    >
      <section
        className="system-workspace__supported"
        id="foundations"
        aria-labelledby="foundations-heading"
        data-supported-specimen-count={2 + colourFoundations.length}
      >
        <div className="system-workspace__section-heading">
          <p>Supported foundation</p>
          <h2 id="foundations-heading">Foundations</h2>
        </div>

        <DesignSystemSpecimen
          consumers={[
            "Home About narrative, inclusive copy, and closing invitation",
            "Working with Joel introduction, approach overview, and active tab copy",
            "Crisis Support emergency guidance and section introductions",
          ]}
          identifier=".site-reading"
          recordPath="docs/design-system/foundations.md"
          role="Default long-form reading typography for public-page prose, with a contextual foreground allowed when the supported body colour does not suit the surface."
          title="Reading copy"
        >
          <div className="system-reading-specimen">
            <p className="site-reading system-reading-specimen__sample">
              Counselling can help you make sense of what is happening and look at what might need to change.
            </p>
            <dl className="system-reading-specimen__facts">
              <div>
                <dt>Weight</dt>
                <dd>400</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>1.005–1.04rem</dd>
              </div>
              <div>
                <dt>Leading</dt>
                <dd>1.63</dd>
              </div>
            </dl>
          </div>
        </DesignSystemSpecimen>

        <DesignSystemSpecimen
          consumers={[
            "Home About opening paragraph",
            "Working with Joel introduction opening paragraph",
          ]}
          identifier=".site-reading--lead"
          recordPath="docs/design-system/foundations.md"
          role="Lead-paragraph modifier that preserves the reading measure and rhythm while adding one step of emphasis through darker ink and medium weight."
          title="Lead reading copy"
        >
          <div className="system-reading-specimen">
            <p className="site-reading site-reading--lead system-reading-specimen__sample">
              I’m Joel Griffiths. I offer online counselling to individuals and couples across Australia.
            </p>
            <dl className="system-reading-specimen__facts">
              <div>
                <dt>Weight</dt>
                <dd>500</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>1.005–1.04rem</dd>
              </div>
              <div>
                <dt>Leading</dt>
                <dd>1.63</dd>
              </div>
            </dl>
          </div>
        </DesignSystemSpecimen>

        {colourFoundations.map((foundation) => (
          <ColourFoundationSpecimen key={foundation.identifier} foundation={foundation} />
        ))}
      </section>
    </DesignSystemWorkspace>
  );
}
