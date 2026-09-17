import DevPageHero from "./DevPageHero";
import useDocumentMetadata from "../../../hooks/useDocumentMetadata";
import "./test-beds.css";

export default function CodexTB() {
  useDocumentMetadata(
    "Codex TB | Vive Counselling",
    "Clean test bed route for future Vive Counselling design explorations.",
  );

  return (
    <main className="site-page test-bed-page codex-tb-page">
      <DevPageHero
        badge="Codex TB"
        title="Codex test bed."
        description="Clean slate for the next design exploration."
      />
    </main>
  );
}
