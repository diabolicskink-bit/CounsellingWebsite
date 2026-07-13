import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import SiteAnalytics from "./components/SiteAnalytics";
import Contact from "./pages/Contact";
import EnmPolyamoryCounselling from "./pages/EnmPolyamoryCounselling";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";
import KinkBdsmCounselling from "./pages/KinkBdsmCounselling";
import LgbtqiaCounselling from "./pages/LgbtqiaCounselling";
import NotFound from "./pages/NotFound";
import WorkingWithJoel from "./pages/WorkingWithJoel";
import { devRoutePaths, publicRedirectRoutes, publicRoutePaths } from "./data/routes";

const devPages = import.meta.env.DEV
  ? {
      CodexTB: lazy(() => import("./pages/dev/test-beds/CodexTB")),
      DesignLanguage: lazy(() => import("./pages/dev/DesignLanguage")),
      Documents: lazy(() => import("./pages/dev/Documents")),
      DS_Components: lazy(() => import("./pages/dev/design-system/DS_Components")),
      DS_Foundations: lazy(() => import("./pages/dev/design-system/DS_Foundations")),
      DS_Heroes: lazy(() => import("./pages/dev/design-system/DS_Heroes")),
      DS_Patterns: lazy(() => import("./pages/dev/design-system/DS_Patterns")),
      OpusTB: lazy(() => import("./pages/dev/test-beds/OpusTB")),
    }
  : null;

type DevPages = NonNullable<typeof devPages>;
type DevPageKey = keyof DevPages;

const devRoutes: Array<{ page: DevPageKey; path: (typeof devRoutePaths)[keyof typeof devRoutePaths] }> = [
  { path: devRoutePaths.codexTestBed, page: "CodexTB" },
  { path: devRoutePaths.opusTestBed, page: "OpusTB" },
  { path: devRoutePaths.documents, page: "Documents" },
  { path: devRoutePaths.designLanguage, page: "DesignLanguage" },
  { path: devRoutePaths.designLanguageFoundations, page: "DS_Foundations" },
  { path: devRoutePaths.designLanguageComponents, page: "DS_Components" },
  { path: devRoutePaths.designLanguageHeroes, page: "DS_Heroes" },
  { path: devRoutePaths.designLanguagePatterns, page: "DS_Patterns" },
];

type AppProps = {
  initialRenderAt: string;
};

function renderDevPage(Page: DevPages[DevPageKey]) {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

export default function App({ initialRenderAt }: AppProps) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {publicRedirectRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<Navigate to={route.to} replace />} />
          ))}
          <Route path={publicRoutePaths.workingWithJoel} element={<WorkingWithJoel />} />
          <Route path={publicRoutePaths.inclusion} element={<InclusivePractice />} />
          <Route path={publicRoutePaths.kinkBdsm} element={<KinkBdsmCounselling />} />
          <Route path={publicRoutePaths.enmPolyamory} element={<EnmPolyamoryCounselling />} />
          <Route path={publicRoutePaths.lgbtqia} element={<LgbtqiaCounselling />} />
          {devPages
            ? devRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={renderDevPage(devPages[route.page])} />
              ))
            : null}
          <Route path={publicRoutePaths.contact} element={<Contact initialRenderAt={initialRenderAt} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <SiteAnalytics />
    </>
  );
}
