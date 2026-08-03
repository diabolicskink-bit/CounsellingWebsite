import { Archive } from "lucide-react";
import { Outlet } from "react-router-dom";
import "../styles-dev.css";
import Container from "./Container";

export default function DesignSystemArchiveLayout() {
  return (
    <>
      <aside
        aria-labelledby="design-system-archive-title"
        className="ds-archive-notice"
        data-design-system-status="historical"
      >
        <Container className="ds-archive-notice__inner">
          <span className="ds-archive-notice__icon" aria-hidden="true">
            <Archive size={22} strokeWidth={1.8} />
          </span>
          <div className="ds-archive-notice__copy">
            <span className="ds-archive-notice__label">Historical catalogue</span>
            <strong id="design-system-archive-title">Outdated — reconciliation pending</strong>
            <p>
              These pages preserve an outdated design-system snapshot. They are available for historical reference only
              and must not be treated as current production guidance or approved reusable API. Verify current public-route
              source and design-system governance before reusing any example.
            </p>
          </div>
        </Container>
      </aside>
      <Outlet />
    </>
  );
}
