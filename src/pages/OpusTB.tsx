import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import "../styles-opus-tb.css";

export default function OpusTB() {
  useDocumentMetadata(
    "Opus TB | Vive Counselling",
    "Clean test bed route for future Vive Counselling design explorations.",
  );

  return (
    <main className="site-page opus-tb-page">
      <DevPageHero
        badge="Opus TB"
        title="Opus test bed."
        description="Clean slate for the next design exploration."
      />
    </main>
  );
}
