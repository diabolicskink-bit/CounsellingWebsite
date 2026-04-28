import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import EnmPolyamoryCounselling from "./pages/EnmPolyamoryCounselling";
import Enquire from "./pages/Enquire";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";
import KinkBdsmCounselling from "./pages/KinkBdsmCounselling";
import LgbtqiaCounselling from "./pages/LgbtqiaCounselling";
import NotFound from "./pages/NotFound";
import WorkingWithJoel from "./pages/WorkingWithJoel";

const devPages = import.meta.env.DEV
  ? {
      CodexTB: lazy(() => import("./pages/CodexTB")),
      DesignLanguage: lazy(() => import("./pages/DesignLanguage")),
      Documents: lazy(() => import("./pages/Documents")),
      DS_Components: lazy(() => import("./pages/design-system/DS_Components")),
      DS_Foundations: lazy(() => import("./pages/design-system/DS_Foundations")),
      DS_Heroes: lazy(() => import("./pages/design-system/DS_Heroes")),
      DS_Patterns: lazy(() => import("./pages/design-system/DS_Patterns")),
      OpusTB: lazy(() => import("./pages/OpusTB")),
    }
  : null;
const workingWithJoelPaths = ["about-joel", "approach", "working-with-joel"] as const;
const enquirePaths = ["fees", "enquire", "contact"] as const;

function renderDevPage(Page: NonNullable<typeof devPages>[keyof NonNullable<typeof devPages>]) {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {workingWithJoelPaths.map((path) => (
            <Route key={path} path={path} element={<WorkingWithJoel />} />
          ))}
          <Route path="inclusion" element={<InclusivePractice />} />
          <Route path="inclusion/kink-bdsm" element={<KinkBdsmCounselling />} />
          <Route path="inclusion/enm-polyamory" element={<EnmPolyamoryCounselling />} />
          <Route path="inclusion/lgbtqia" element={<LgbtqiaCounselling />} />
          {devPages ? (
            <>
              <Route path="codex-tb" element={renderDevPage(devPages.CodexTB)} />
              <Route path="opus-tb" element={renderDevPage(devPages.OpusTB)} />
              <Route path="documents" element={renderDevPage(devPages.Documents)} />
              <Route path="design-language" element={renderDevPage(devPages.DesignLanguage)} />
              <Route path="design-language/foundations" element={renderDevPage(devPages.DS_Foundations)} />
              <Route path="design-language/components" element={renderDevPage(devPages.DS_Components)} />
              <Route path="design-language/heroes" element={renderDevPage(devPages.DS_Heroes)} />
              <Route path="design-language/patterns" element={renderDevPage(devPages.DS_Patterns)} />
            </>
          ) : null}
          {enquirePaths.map((path) => (
            <Route key={path} path={path} element={<Enquire />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
