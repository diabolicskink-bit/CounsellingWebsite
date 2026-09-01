import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles-inclusive-practice.css";
import Container from "../components/Container";
import { getRouteMetadata } from "../data/routeMetadata";
import { publicRoutePaths } from "../data/routes";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

type InclusionChapter = {
  id: string;
  heading: string;
  href: string;
  overview: string;
  linkLabel: string;
};

type InclusionPageContent = {
  title: string;
  meta: string;
  hero: {
    heading: string;
    statement: {
      lineOne: string;
      lineTwo: string;
    };
    support: string;
  };
  chapters: InclusionChapter[];
};

const inclusionMetadata = getRouteMetadata(publicRoutePaths.inclusion);

const inclusionPageContent: InclusionPageContent = {
  title: inclusionMetadata.title,
  meta: inclusionMetadata.description,
  hero: {
    heading: "Kink, ENM and LGBTQIA+ inclusive counselling.",
    statement: {
      lineOne: "Known before you arrive.",
      lineTwo: "Not learned as you go.",
    },
    support:
      "Kinky, non-monogamous, queer, or some mix of all three. As a member of Perth's kink and non-monogamy communities, Joel knows it from the inside. Even if what brings you here is entirely unrelated, nothing needs to be left at the door.",
  },
  chapters: [
    {
      id: "kink-bdsm",
      heading: "Kink & BDSM-aware counselling",
      href: publicRoutePaths.kinkBdsm,
      overview:
        "Use the words you normally use. Kink may be the reason for counselling, relevant to a relationship or simply part of your life. I already understand the basics of D/s, power exchange, consent, drop and common kink practices, so the session does not have to begin with an introduction. I will still ask what something means for you. The same label can describe very different relationships and experiences.",
      linkLabel: "Read about kink & BDSM-aware counselling",
    },
    {
      id: "enm-polyamory",
      heading: "ENM & polyamory counselling",
      href: publicRoutePaths.enmPolyamory,
      overview:
        "Polyamory and ENM do not come with one correct relationship shape. Opening a relationship, jealousy, agreements, time, a mono/poly difference or the effect one relationship has on another can all bring someone to counselling. Sometimes non-monogamy is simply part of the background. I work from the relationships that actually exist and the goals of the people involved, without treating monogamy or non-monogamy as the preferred result.",
      linkLabel: "Read about ENM & polyamory counselling",
    },
    {
      id: "lgbtqia",
      heading: "LGBTQIA+ affirming counselling",
      href: publicRoutePaths.lgbtqia,
      overview:
        "Sexuality, gender or sex characteristics may be the question, part of the context or barely relevant to what you want to discuss. LGBTQIA+ affirming counselling can include questioning, disclosure, family, faith and relationships, as well as anxiety, grief or work. Identity is not debated, and being more open is not assumed to be the goal.",
      linkLabel: "Read about LGBTQIA+ affirming counselling",
    },
  ],
};

export default function InclusivePractice() {
  useDocumentMetadata(inclusionPageContent.title, inclusionPageContent.meta);
  const { hero, chapters } = inclusionPageContent;

  return (
    <main className="site-page inclusion-hub-page">
      <section className="site-hero site-hero-background">
        <Container>
          <h1 className="site-hero__eyebrow">{hero.heading}</h1>

          <div className="inclusion-hub-page__hero-promise">
            <p className="inclusion-hub-page__hero-promise-line">
              {hero.statement.lineOne}
            </p>
            <p className="inclusion-hub-page__hero-promise-line">
              {hero.statement.lineTwo}
            </p>
          </div>

          <p className="inclusion-hub-page__hero-support site-reading">{hero.support}</p>
        </Container>
      </section>

      {chapters.map((chapter) => (
        <InclusionChapterSection chapter={chapter} key={chapter.id} />
      ))}
    </main>
  );
}

function InclusionChapterSection({ chapter }: { chapter: InclusionChapter }) {
  const headingId = `inclusion-${chapter.id}-heading`;

  return (
    <section
      className="inclusion-hub-page__chapter site-section-warm"
      aria-labelledby={headingId}
    >
      <Container className="inclusion-hub-page__chapter-layout">
        <header className="inclusion-hub-page__chapter-heading">
          <h2 id={headingId}>{chapter.heading}</h2>
        </header>

        <div className="inclusion-hub-page__chapter-overview">
          <p className="site-reading">{chapter.overview}</p>
          <Link className="inclusion-hub-page__chapter-link" to={chapter.href}>
            <span>{chapter.linkLabel}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
