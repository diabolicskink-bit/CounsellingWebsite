import DevPageHero from "../../../components/DevPageHero";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import "../../../styles-codex-tb.css";

export default function CodexTB() {
  useDocumentMetadata(
    "Codex TB | Vive Counselling",
    "Clean test bed route for future Vive Counselling design explorations.",
  );

  return (
    <main className="site-page codex-tb-page">
      <DevPageHero
        badge="Codex TB"
        title="Codex test bed."
        description="Clean slate for the next design exploration."
      />
    </main>
  );
}
