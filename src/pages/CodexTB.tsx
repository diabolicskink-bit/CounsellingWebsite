import DevPageHero from "../components/DevPageHero";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

export default function CodexTB() {
  useDocumentMetadata("Codex TB | Reset", "Codex test bed reset and ready for future experiments.");

  return (
    <main className="site-page">
      <DevPageHero
        badge="Codex TB"
        title="Reset."
        description="This workspace has been cleared and is ready for future experiments."
      />
    </main>
  );
}
