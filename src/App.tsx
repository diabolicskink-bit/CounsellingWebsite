import { lazy, Suspense, useLayoutEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import SiteAnalytics from "./components/SiteAnalytics";
import VisitRecorder from "./components/VisitRecorder";
import Contact from "./pages/Contact";
import CrisisSupport from "./pages/CrisisSupport";
import EnmPolyamoryCounselling from "./pages/EnmPolyamoryCounselling";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";
import KinkBdsmCounselling from "./pages/KinkBdsmCounselling";
import LgbtqiaCounselling from "./pages/LgbtqiaCounselling";
import NotFound from "./pages/NotFound";
import WorkingWithJoel from "./pages/WorkingWithJoel";
import { devRoutePaths, privateRoutePaths, publicRedirectRoutes, publicRoutePaths } from "./data/routes";

const analyticsRoutes = [
  {
    Page: lazy(() => import("./pages/analytics/DailyAnalyticsPage")),
    path: privateRoutePaths.analytics,
  },
  {
    Page: lazy(() => import("./pages/analytics/PageViewsAnalyticsPage")),
    path: privateRoutePaths.analyticsPageViews,
  },
  {
    Page: lazy(() => import("./pages/analytics/EnquiriesAnalyticsPage")),
    path: privateRoutePaths.analyticsEnquiries,
  },
  {
    Page: lazy(() => import("./pages/analytics/KeywordsAnalyticsPage")),
    path: privateRoutePaths.analyticsKeywords,
  },
  {
    Page: lazy(() => import("./pages/analytics/ExcludedVisitorsPage")),
    path: privateRoutePaths.analyticsExcluded,
  },
] as const;

const devRoutes = import.meta.env.DEV
  ? [
      { path: devRoutePaths.codexTestBed, Page: lazy(() => import("./pages/dev/test-beds/CodexTB")) },
      { path: devRoutePaths.designSystem, Page: lazy(() => import("./pages/dev/DesignSystem")) },
      {
        path: devRoutePaths.designSystemComponents,
        Page: lazy(() => import("./pages/dev/design-system/DesignSystemComponents")),
      },
      {
        path: devRoutePaths.designSystemFoundations,
        Page: lazy(() => import("./pages/dev/design-system/DesignSystemFoundations")),
      },
      {
        path: devRoutePaths.designSystemPatterns,
        Page: lazy(() => import("./pages/dev/design-system/DesignSystemPatterns")),
      },
      { path: devRoutePaths.documents, Page: lazy(() => import("./pages/dev/Documents")) },
      { path: devRoutePaths.opusTestBed, Page: lazy(() => import("./pages/dev/test-beds/OpusTB")) },
    ]
  : [];

export type AppProps = {
  initialRenderAt: string;
};

function AnalyticsRoute() {
  const requiresPrivateDocument = typeof window !== "undefined" && Boolean(
    document.getElementById("vive-google-analytics")
    || document.getElementById("vive-google-analytics-config")
    || document.getElementById("vive-microsoft-clarity")
    || window.gtag
    || window.clarity,
  );

  useLayoutEffect(() => {
    if (requiresPrivateDocument) {
      window.location.replace(window.location.href);
    }
  }, [requiresPrivateDocument]);

  if (requiresPrivateDocument) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
}

export default function App({ initialRenderAt }: AppProps) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AnalyticsRoute />}>
          {analyticsRoutes.map(({ Page, path }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
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
          <Route path={publicRoutePaths.crisisSupport} element={<CrisisSupport />} />
          {devRoutes.map(({ Page, path }) => (
            <Route
              key={path}
              path={path}
              element={(
                <Suspense fallback={null}>
                  <Page />
                </Suspense>
              )}
            />
          ))}
          <Route path={publicRoutePaths.contact} element={<Contact initialRenderAt={initialRenderAt} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <SiteAnalytics />
      <VisitRecorder />
    </>
  );
}
