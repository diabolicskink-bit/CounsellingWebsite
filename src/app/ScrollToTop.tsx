import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function findHashTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    // A malformed fragment such as "#%E0" is not a valid target.
    return null;
  }
}

export default function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const target = findHashTarget(hash);

    if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
      target.focus({ preventScroll: true });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [hash, pathname]);

  return null;
}
