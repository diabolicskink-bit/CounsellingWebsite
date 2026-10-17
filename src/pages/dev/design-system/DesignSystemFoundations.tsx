import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import DesignSystemWorkspace from "./DesignSystemWorkspace";

type Token = `--${string}`;

type Swatch = {
  token: Token;
  /** Material a translucent token is composited over, both in the swatch and its reported value. */
  over?: Token;
  /** Shown only as a translucent hue, so the swatch states it rather than implying a solid surface. */
  translucentOnly?: boolean;
};

type ContrastPair = {
  text: Token;
  surface: Token;
  surfaceOver?: Token;
  /** Non-text pairs are graded against the 3:1 boundary guideline rather than text thresholds. */
  nonText?: boolean;
};

type ColourRecord = {
  consumers: readonly [string, ...string[]];
  pairs: readonly ContrastPair[];
  role: string;
  swatches: readonly Swatch[];
  title: string;
};

type ColourFamily = {
  description: string;
  id: string;
  records: readonly ColourRecord[];
  title: string;
};

type Rgba = readonly [red: number, green: number, blue: number, alpha: number];

const foundationsRecord = "docs/design-system/FOUNDATIONS.md";

const colourFamilies: readonly ColourFamily[] = [
  {
    id: "colour-text",
    title: "Text",
    description: "Foregrounds for light surfaces. Every heading on a light surface is ink.",
    records: [
      {
        title: "Ink, body and muted",
        swatches: [{ token: "--ink" }, { token: "--body" }, { token: "--muted" }],
        role: "Ink is the shared heading colour and strongest text; body is paragraph copy; muted is supporting copy, labels and navigation.",
        pairs: [
          { text: "--ink", surface: "--paper" },
          { text: "--body", surface: "--paper" },
          { text: "--muted", surface: "--paper" },
          { text: "--muted", surface: "--section-warm" },
        ],
        consumers: [
          "Global document and .site-page defaults",
          "Shared header, navigation, footer and buttons",
          ".site-reading",
          "Home, Working with Joel, Articles, Contact, Crisis Support and Privacy Policy copy",
          "<ContactInvitation />",
        ],
      },
    ],
  },
  {
    id: "colour-light",
    title: "Light materials",
    description: "Page canvas, editorial paper and the lightest card and field surfaces.",
    records: [
      {
        title: "Chalk",
        swatches: [{ token: "--chalk" }],
        role: "Off-white for the lightest surfaces and the strongest text and icons on dark surfaces. Stands in for pure white.",
        pairs: [
          { text: "--ink", surface: "--chalk" },
          { text: "--chalk", surface: "--cedar-dark" },
        ],
        consumers: [
          ".site-hero foreground and dark specialist section titles",
          "Shared header button, buttons and mobile navigation",
          "Contact form fields and cards",
          "Articles index cards and article ground",
          "Crisis Support actions",
          "Home and Working with Joel portrait, topic and hero treatments",
          "<ContactInvitation /> actions",
        ],
      },
      {
        title: "Paper",
        swatches: [{ token: "--paper" }],
        role: "Root canvas for the document and .site-page, and quiet alternate washes on light pages.",
        pairs: [{ text: "--body", surface: "--paper" }],
        consumers: [
          "body and .site-page",
          "Contact success panel",
          "Article page paper",
          "Crisis Support and Working with Joel light regions",
        ],
      },
      {
        title: "Warm paper",
        swatches: [{ token: "--section-warm" }],
        role: "Flat warm paper for the site chrome and for public editorial backings, sections and content materials. Use .site-section-warm for the complete section pattern.",
        pairs: [
          { text: "--ink", surface: "--section-warm" },
          { text: "--body", surface: "--section-warm" },
          { text: "--muted", surface: "--section-warm" },
        ],
        consumers: [
          ".site-header, .nav-submenu and .site-footer",
          "Documents workspace",
          "Home, Working with Joel, Inclusion, Kink and BDSM, ENM and polyamory, LGBTQIA+ and Privacy Policy backings",
          "Not-found page action",
          "Contact enquiry task",
        ],
      },
      {
        title: "Deep warm paper",
        swatches: [{ token: "--section-warm-deep" }],
        role: "A second warm material that must separate from adjacent paper or warm paper. Not a hover state.",
        pairs: [{ text: "--ink", surface: "--section-warm-deep" }],
        consumers: ["Home ENM and polyamory topic card", "Article page deep paper"],
      },
    ],
  },
  {
    id: "colour-lines",
    title: "Lines and fields",
    description: "Control boundaries and quiet editorial separators.",
    records: [
      {
        title: "Line",
        swatches: [{ token: "--line" }],
        role: "The one light-surface line: editorial rules, panel and table borders, secondary and disabled button borders, and text-field boundaries. Never the only cue to structure.",
        pairs: [{ text: "--line", surface: "--chalk", nonText: true }],
        consumers: [
          ".button--secondary and .button:disabled",
          "Contact form fields, hours table and success panel",
          "Supported warm sections",
          "Documents boundaries and Markdown content",
          "Crisis Support and Privacy Policy separators",
          "Contact and <ContactInvitation /> separators",
          "Working with Joel and Inclusion editorial rules",
        ],
      },
      {
        title: "Field placeholder",
        swatches: [{ token: "--field-placeholder" }],
        role: "Placeholder text in form fields. An inherited value below the text guideline; visible labels carry the field's meaning.",
        pairs: [{ text: "--field-placeholder", surface: "--chalk" }],
        consumers: ["Contact form fields"],
      },
    ],
  },
  {
    id: "colour-greens",
    title: "Greens",
    description: "The brand accent, its interaction state and the dark editorial and gradient materials.",
    records: [
      {
        title: "Cedar",
        swatches: [{ token: "--cedar" }],
        role: "Primary brand accent for actions, strong emphasis, focus and boundary cues, and the light end of dark gradients.",
        pairs: [
          { text: "--chalk", surface: "--cedar" },
          { text: "--cedar", surface: "--paper" },
        ],
        consumers: [
          ".header-button and .button--primary",
          "Footer, article, Privacy Policy and Contact focus and link treatments",
          "Working with Joel active-tab rule",
          "<ContactInvitation /> emphasis and primary action",
          "Gradient endpoints of .site-hero-surface, mobile navigation and dark sections",
        ],
      },
      {
        title: "Dark cedar",
        swatches: [{ token: "--cedar-dark" }],
        role: "The single dark green: dark editorial surfaces and gradient starts, cedar action states, dark shadows, and strong non-heading foregrounds on light materials.",
        pairs: [
          { text: "--chalk", surface: "--cedar-dark" },
          { text: "--cedar-dark", surface: "--paper" },
          { text: "--cedar-dark", surface: "--section-warm" },
          { text: "--cedar-dark", surface: "--section-sage" },
        ],
        consumers: [
          "Shared button and header-button states",
          ".site-hero-surface, mobile navigation and dark section gradients",
          "Mobile navigation and desktop submenu shadows",
          "Home inclusive practice and Working with Joel topics",
          "Inclusion, LGBTQIA+ and not-found foregrounds",
          "Contact, Crisis Support and <ContactInvitation /> action treatments",
        ],
      },
    ],
  },
  {
    id: "colour-pale-greens",
    title: "Pale greens",
    description: "Sage fields on light pages, and emphasis, supporting text and rules on dark surfaces.",
    records: [
      {
        title: "Sage field",
        swatches: [{ token: "--section-sage" }],
        role: "Editorial fields, sections and supporting fills, and the emphasis and active foreground on dark surfaces.",
        pairs: [
          { text: "--ink", surface: "--section-sage" },
          { text: "--body", surface: "--section-sage" },
          { text: "--section-sage", surface: "--cedar-dark" },
        ],
        consumers: [
          "Documents workspace and table headings",
          "Working with Joel topic close and tab panel",
          "Inclusion and specialist editorial fields",
          "Home Kink and BDSM topic card",
          "Contact essentials and submission mark",
          ".site-hero emphasis and mobile navigation active links",
        ],
      },
      {
        title: "Sage, deep sage and glow",
        swatches: [{ token: "--sage" }, { token: "--sage-deep" }, { token: "--sage-glow", translucentOnly: true }],
        role: "Sage is the eyebrow and emphasis foreground on dark heroes; deep sage is a stronger material; glow is the hue of radial glows and never carries text.",
        pairs: [
          { text: "--sage", surface: "--cedar-dark" },
          { text: "--cedar-dark", surface: "--sage-deep" },
        ],
        consumers: [
          ".site-hero eyebrows",
          "<ArticleHero /> link underlines",
          "Desktop submenu active state",
          "Home inclusive emphasis, LGBTQIA+ topic card and hub link icon",
          "Glows of dark heroes, navigation and sections",
        ],
      },
      {
        title: "Mist",
        swatches: [{ token: "--mist" }],
        role: "Supporting text, quiet rules and focus rings on dark surfaces, normally at 0.86 opacity for copy.",
        pairs: [{ text: "--mist", surface: "--cedar-dark" }],
        consumers: [
          ".site-hero supporting foreground",
          "Specialist dark-section copy",
          "Home hero and inclusive practice",
          "Working with Joel hero actions and topics",
          "Mobile navigation, Privacy Policy hero and <ArticleHero /> focus",
        ],
      },
      {
        title: "Dark editorial rule",
        swatches: [{ token: "--section-dark-rule", over: "--cedar-dark" }],
        role: "Mist at 20% for quiet separators over dark editorial and hero materials. Decorative only.",
        pairs: [],
        consumers: [
          "Specialist counselling hero actions",
          "Home inclusive-practice and Working with Joel dark topics",
          "Inclusion and specialist dark editorial regions",
          "Documents hero",
        ],
      },
    ],
  },
  {
    id: "colour-earth",
    title: "Earth and portrait",
    description: "Warm materials reserved for the closing invitation and identified-person portraits.",
    records: [
      {
        title: "Earth tan",
        swatches: [{ token: "--earth-tan" }],
        role: "The closing invitation surface and warm decorative tints. Not a general page background.",
        pairs: [
          { text: "--ink", surface: "--earth-tan" },
          { text: "--cedar-dark", surface: "--earth-tan" },
        ],
        consumers: ["<ContactInvitation />", "Home ENM and polyamory topic orb"],
      },
      {
        title: "Portrait panel",
        swatches: [{ token: "--portrait-panel" }],
        role: "Dark chocolate outer frame around identified-person media. Not a general surface or action colour.",
        pairs: [{ text: "--chalk", surface: "--portrait-panel" }],
        consumers: [".home-about__portrait", ".working-with-joel-page__intro-note"],
      },
      {
        title: "Portrait frame",
        swatches: [{ token: "--portrait-frame" }],
        role: "Pale warm backing immediately around identified-person imagery inside the panel. A non-text media material.",
        pairs: [{ text: "--portrait-panel", surface: "--portrait-frame", nonText: true }],
        consumers: [".home-about__portrait-frame", ".working-with-joel-page__portrait-frame"],
      },
      {
        title: "Portrait shadow",
        swatches: [{ token: "--portrait-shadow", translucentOnly: true }],
        role: "Deep chocolate used only translucently for the borders, rings, shadows and tints of portrait media.",
        pairs: [],
        consumers: [
          ".home-about__portrait, its frame and link",
          ".working-with-joel-page__intro-note and its portrait frame",
        ],
      },
      {
        title: "Portrait footer tint",
        swatches: [{ token: "--portrait-footer-tint", over: "--portrait-panel" }],
        role: "Portrait shadow at 12% for a footer or action band directly over the portrait panel.",
        pairs: [{ text: "--chalk", surface: "--portrait-footer-tint", surfaceOver: "--portrait-panel" }],
        consumers: [".home-about__portrait-link", ".working-with-joel-page__intro-note-details"],
      },
    ],
  },
  {
    id: "colour-alerts",
    title: "Emergency and errors",
    description: "Reserved for genuine emergency guidance and form errors. Text always states the message; colour never carries it alone.",
    records: [
      {
        title: "Emergency",
        swatches: [
          { token: "--emergency" },
          { token: "--emergency-ink" },
          { token: "--emergency-hover" },
          { token: "--emergency-active" },
          { token: "--emergency-surface" },
        ],
        role: "The crisis alert palette: heading and call action, alert body text, the action's hover and pressed states, and the alert panel.",
        pairs: [
          { text: "--chalk", surface: "--emergency" },
          { text: "--emergency-ink", surface: "--emergency-surface" },
          { text: "--emergency", surface: "--emergency-surface" },
        ],
        consumers: ["Crisis Support emergency panel and call action"],
      },
      {
        title: "Form error",
        swatches: [{ token: "--error-rule" }, { token: "--error-ink" }, { token: "--error-surface" }],
        role: "Form error messages: the leading rule, the message text and the message panel.",
        pairs: [{ text: "--error-ink", surface: "--error-surface" }],
        consumers: ["Contact enquiry form error"],
      },
    ],
  },
];

const colourRecordCount = colourFamilies.reduce((total, family) => total + family.records.length, 0);
const typographyRecordCount = 2;
const layoutRecordCount = 1;

function documentHref(path: string) {
  return `/documents?${new URLSearchParams({ doc: path }).toString()}`;
}

/* Colour values are resolved from the live production tokens, so the page cannot drift from source. */

function parseComputedColour(value: string): Rgba | null {
  const channels = value.match(/[\d.]+/g)?.map(Number);

  if (!channels || channels.length < 3) {
    return null;
  }

  return [channels[0], channels[1], channels[2], channels[3] ?? 1];
}

function composite([red, green, blue, alpha]: Rgba, [baseRed, baseGreen, baseBlue]: Rgba): Rgba {
  return [
    red * alpha + baseRed * (1 - alpha),
    green * alpha + baseGreen * (1 - alpha),
    blue * alpha + baseBlue * (1 - alpha),
    1,
  ];
}

function toHex([red, green, blue]: Rgba) {
  return (
    "#" +
    [red, green, blue]
      .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function relativeLuminance([red, green, blue]: Rgba) {
  const [linearRed, linearGreen, linearBlue] = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * linearRed + 0.7152 * linearGreen + 0.0722 * linearBlue;
}

function contrastRatio(first: Rgba, second: Rgba) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function collectTokens() {
  const tokens = new Set<Token>();

  for (const family of colourFamilies) {
    for (const record of family.records) {
      for (const swatch of record.swatches) {
        tokens.add(swatch.token);
        if (swatch.over) tokens.add(swatch.over);
      }
      for (const pair of record.pairs) {
        tokens.add(pair.text);
        tokens.add(pair.surface);
        if (pair.surfaceOver) tokens.add(pair.surfaceOver);
      }
    }
  }

  return tokens;
}

function useResolvedColours() {
  const [colours, setColours] = useState<ReadonlyMap<Token, Rgba>>(new Map());

  useEffect(() => {
    const probe = document.createElement("span");
    probe.hidden = true;
    document.body.append(probe);

    const resolved = new Map<Token, Rgba>();
    for (const token of collectTokens()) {
      probe.style.color = `var(${token})`;
      const colour = parseComputedColour(getComputedStyle(probe).color);
      if (colour) resolved.set(token, colour);
    }

    probe.remove();
    setColours(resolved);
  }, []);

  return colours;
}

function resolveLayered(colours: ReadonlyMap<Token, Rgba>, token: Token, over?: Token) {
  const colour = colours.get(token);
  if (!colour) return null;

  const base = over ? colours.get(over) : undefined;
  return base ? composite(colour, base) : colour;
}

function grade(ratio: number, nonText: boolean) {
  if (nonText) {
    return ratio >= 3 ? "3:1" : "Below 3:1";
  }

  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Below AA";
}

function swatchStyle({ token, over }: Swatch): CSSProperties {
  return {
    background: over ? `linear-gradient(var(${token}), var(${token})), var(${over})` : `var(${token})`,
  };
}

function ColourSwatch({ colours, swatch }: { colours: ReadonlyMap<Token, Rgba>; swatch: Swatch }) {
  const value = resolveLayered(colours, swatch.token, swatch.over);
  const alpha = colours.get(swatch.token)?.[3] ?? 1;

  return (
    <li className="system-palette__chip">
      <span className="system-palette__swatch" style={swatchStyle(swatch)} aria-hidden="true" />
      <code>{swatch.token}</code>
      <span className="system-palette__value">
        {value ? toHex(value) : "—"}
        {swatch.over && alpha < 1 ? <span>{`${Math.round(alpha * 100)}% on ${swatch.over}`}</span> : null}
        {swatch.translucentOnly ? <span>Translucent only</span> : null}
      </span>
    </li>
  );
}

function ContrastSample({ colours, pair }: { colours: ReadonlyMap<Token, Rgba>; pair: ContrastPair }) {
  const surface = resolveLayered(colours, pair.surface, pair.surfaceOver);
  const text = colours.get(pair.text);
  const ratio = surface && text ? contrastRatio(composite(text, surface), surface) : null;
  const result = ratio === null ? null : grade(ratio, Boolean(pair.nonText));
  const fails = result?.startsWith("Below") ?? false;

  return (
    <li className="system-contrast" data-contrast-result={fails ? "below" : "meets"}>
      <span
        className="system-contrast__sample"
        style={{
          ...swatchStyle({ token: pair.surface, over: pair.surfaceOver }),
          color: `var(${pair.text})`,
        }}
        aria-hidden="true"
      >
        {pair.nonText ? <span className="system-contrast__boundary" /> : "Aa"}
      </span>
      <span className="system-contrast__label">
        <code>{pair.text}</code> on <code>{pair.surface}</code>
      </span>
      <span className="system-contrast__ratio">
        {ratio === null ? "—" : `${ratio.toFixed(2)}:1`}
        {result ? <em>{result}</em> : null}
      </span>
    </li>
  );
}

function Consumers({ consumers }: { consumers: readonly string[] }) {
  return (
    <details className="system-foundation__consumers">
      <summary>{`Verified consumers (${consumers.length})`}</summary>
      <ul>
        {consumers.map((consumer) => (
          <li key={consumer}>{consumer}</li>
        ))}
      </ul>
    </details>
  );
}

function FoundationGroupHeading({ children, count, id }: { children: ReactNode; count: number; id: string }) {
  return (
    <header className="system-foundation-group__heading">
      <h3 id={id}>{children}</h3>
      <span>{`${count} ${count === 1 ? "record" : "records"}`}</span>
      <Link to={documentHref(foundationsRecord)}>Open authoritative record</Link>
    </header>
  );
}

function ColourRecordRow({ colours, record }: { colours: ReadonlyMap<Token, Rgba>; record: ColourRecord }) {
  const identifiers = record.swatches.map((swatch) => swatch.token).join(", ");

  return (
    <article className="system-colour-record" data-design-system-status="supported">
      <div className="system-colour-record__identity">
        <h5>{record.title}</h5>
        <p>{record.role}</p>
        <Consumers consumers={record.consumers} />
      </div>

      <ul className="system-palette__chips" aria-label={`${identifiers} values`}>
        {record.swatches.map((swatch) => (
          <ColourSwatch key={swatch.token} colours={colours} swatch={swatch} />
        ))}
      </ul>

      {record.pairs.length > 0 ? (
        <ul className="system-colour-record__contrast" aria-label={`${record.title} contrast pairs`}>
          {record.pairs.map((pair) => (
            <ContrastSample key={pair.text + pair.surface} colours={colours} pair={pair} />
          ))}
        </ul>
      ) : (
        <p className="system-colour-record__decorative">Decorative or translucent only; never carries text.</p>
      )}
    </article>
  );
}

function PaletteOverview() {
  return (
    <div className="system-palette-overview" aria-label="Palette overview">
      {colourFamilies.map((family) => (
        <a key={family.id} className="system-palette-overview__family" href={`#${family.id}`}>
          <span className="system-palette-overview__strip" aria-hidden="true">
            {family.records.flatMap((record) =>
              record.swatches.map((swatch) => (
                <span key={swatch.token} style={swatchStyle(swatch)} title={swatch.token} />
              )),
            )}
          </span>
          <strong>{family.title}</strong>
        </a>
      ))}
    </div>
  );
}

function ReadingRecord({
  className,
  consumers,
  facts,
  identifier,
  role,
  sample,
  title,
}: {
  className: string;
  consumers: readonly [string, ...string[]];
  facts: readonly (readonly [label: string, value: string])[];
  identifier: string;
  role: string;
  sample: string;
  title: string;
}) {
  return (
    <article className="system-reading-record" data-design-system-status="supported">
      <div className="system-reading-record__stage">
        <p className={className}>{sample}</p>
      </div>
      <div className="system-reading-record__body">
        <code>{identifier}</code>
        <h4>{title}</h4>
        <p>{role}</p>
        <dl>
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <Consumers consumers={consumers} />
      </div>
    </article>
  );
}

function useAnchorOffset() {
  const [offset, setOffset] = useState<string | null>(null);

  useEffect(() => {
    const probe = document.createElement("div");
    probe.hidden = true;
    probe.style.paddingTop = "var(--site-anchor-offset)";
    document.body.append(probe);
    setOffset(getComputedStyle(probe).paddingTop);
    probe.remove();
  }, []);

  return offset;
}

export default function DesignSystemFoundations() {
  const colours = useResolvedColours();
  const anchorOffset = useAnchorOffset();

  return (
    <DesignSystemWorkspace
      description="Public reading type, the site palette and layout primitives approved for deliberate reuse, resolved from their current production tokens."
      section="foundations"
      title="Foundations"
    >
      <section
        className="system-workspace__supported"
        id="foundations"
        aria-labelledby="foundations-heading"
        data-supported-specimen-count={typographyRecordCount + colourRecordCount + layoutRecordCount}
      >
        <div className="system-workspace__section-heading">
          <p>Supported foundation</p>
          <h2 id="foundations-heading">Foundations</h2>
        </div>

        <nav className="system-foundations__jump" aria-label="Foundation groups">
          <a href="#typography-heading">
            Typography <span>{typographyRecordCount}</span>
          </a>
          <a href="#colour-heading">
            Colour <span>{colourRecordCount}</span>
          </a>
          <a href="#layout-heading">
            Layout <span>{layoutRecordCount}</span>
          </a>
        </nav>

        <section className="system-foundation-group" aria-labelledby="typography-heading">
          <FoundationGroupHeading count={typographyRecordCount} id="typography-heading">
            Typography
          </FoundationGroupHeading>

          <div className="system-reading-records">
            <ReadingRecord
              className="site-reading"
              consumers={[
                "Home About narrative, inclusive copy and closing invitation",
                "Working with Joel introduction, approach overview and active tab copy",
                "Inclusion hub and specialist page prose",
                "<ArticleHero /> abstracts",
                "Crisis Support guidance, Privacy Policy and Contact prose",
              ]}
              facts={[
                ["Weight", "400"],
                ["Size", "1.005–1.04rem"],
                ["Leading", "1.63"],
              ]}
              identifier=".site-reading"
              role="Default long-form reading role. A dark or incompatible surface may override only the foreground."
              sample="Counselling can help you make sense of what is happening and look at what might need to change."
              title="Reading copy"
            />
            <ReadingRecord
              className="site-reading site-reading--lead"
              consumers={["Home About opening paragraph", "Working with Joel introduction opening paragraph"]}
              facts={[
                ["Weight", "500"],
                ["Colour", "--ink"],
                ["Leading", "1.63"],
              ]}
              identifier=".site-reading--lead"
              role="One opening or summary paragraph per reading group, used with .site-reading. Not an inline emphasis utility."
              sample="I’m Joel Griffiths. I offer online counselling to individuals and couples across Australia."
              title="Lead reading copy"
            />
          </div>
        </section>

        <section className="system-foundation-group" aria-labelledby="colour-heading">
          <FoundationGroupHeading count={colourRecordCount} id="colour-heading">
            Colour
          </FoundationGroupHeading>

          <p className="system-foundation-group__intro">
            Every public colour comes from these tokens on <code>:root</code>; page CSS never adds colour
            literals. Translucent uses write <code>rgb(var(--name-rgb) / 0.22)</code>. Values and contrast
            ratios below are read from the live tokens.
          </p>

          <PaletteOverview />

          {colourFamilies.map((family) => (
            <section key={family.id} className="system-colour-family" id={family.id} aria-labelledby={`${family.id}-heading`}>
              <header className="system-colour-family__heading">
                <h4 id={`${family.id}-heading`}>{family.title}</h4>
                <p>{family.description}</p>
              </header>
              {family.records.map((record) => (
                <ColourRecordRow key={record.title} colours={colours} record={record} />
              ))}
            </section>
          ))}
        </section>

        <section className="system-foundation-group" aria-labelledby="layout-heading">
          <FoundationGroupHeading count={layoutRecordCount} id="layout-heading">
            Layout
          </FoundationGroupHeading>

          <article className="system-layout-record" data-design-system-status="supported">
            <div className="system-layout-record__diagram" aria-hidden="true">
              <span className="system-layout-record__header">Sticky header</span>
              <span className="system-layout-record__gap">{anchorOffset ?? "—"}</span>
              <span className="system-layout-record__target">Scroll target</span>
            </div>
            <div className="system-reading-record__body">
              <code>--site-anchor-offset</code>
              <h4>Anchor offset</h4>
              <p>
                Header clearance for <code>scroll-margin-top</code> on anchored sections. Derived from the header
                height, so it is 96px above 700px and 90px at or below. Not a general spacing token.
              </p>
              <Consumers
                consumers={[
                  "Contact enquiry, confirmation and fees anchors",
                  "Article citation targets",
                  "Crisis Support service and region anchors",
                  "Privacy Policy section anchors",
                  "Working with Joel topics anchor",
                  "Development design-system workspace",
                ]}
              />
            </div>
          </article>
        </section>
      </section>
    </DesignSystemWorkspace>
  );
}
