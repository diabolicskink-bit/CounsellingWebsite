import { useEffect } from "react";
import DevPageHero from "../components/DevPageHero";

export default function CodexTB() {
  useEffect(() => {
    document.title = "Codex TB | Reset";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Codex test bed reset and ready for future experiments."
      );
    }
  }, []);

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
