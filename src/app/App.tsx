import { lazy, Suspense, useLayoutEffect, type ComponentType } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Layout from "../components/Layout";
import { articleRedirects, getArticlePath } from "../content/articles/manifest";
import { devRoutePaths, privateRoutePaths, publicRedirectRoutes, publicRoutePaths } from "../data/routes";
import Contact from "../pages/contact/Contact";
import CrisisSupport from "../pages/crisis-support/CrisisSupport";
import EnmPolyamoryCounselling from "../pages/inclusion/EnmPolyamoryCounselling";
import Home from "../pages/home/Home";
import InclusivePractice from "../pages/inclusion/InclusivePractice";
import KinkBdsmCounselling from "../pages/inclusion/KinkBdsmCounselling";
import LgbtqiaCounselling from "../pages/inclusion/LgbtqiaCounselling";
import NotFound from "../pages/not-found/NotFound";
import PrivacyPolicy from "../pages/privacy-policy/PrivacyPolicy";
import WorkingWithJoel from "../pages/working-with-joel/WorkingWithJoel";
import { hasThirdPartyAnalyticsLoaded } from "../tracking/analytics";
import SiteAnalytics from "../tracking/SiteAnalytics";
import VisitRecorder from "../tracking/VisitRecorder";

export type ArticlePageComponents = Readonly<{
  Index: ComponentType;
  Page: ComponentType;
}>;

export type AppProps = {
  articlePages: ArticlePageComponents;
  initialRenderAt: string;
};

type LazyRoute = Readonly<{
  path: string;
  Page: ComponentType;
}>;

const analyticsRoutes: readonly LazyRoute[] = [
  {
    path: privateRoutePaths.analytics,
    Page: lazy(() => import("../pages/analytics/DailyAnalyticsPage")),
  },
  {
    path: privateRoutePaths.analyticsEnquiries,
    Page: lazy(() => import("../pages/analytics/EnquiriesAnalyticsPage")),
  },
  {
    path: privateRoutePaths.analyticsExcluded,
    Page: lazy(() => import("../pages/analytics/ExcludedVisitorsPage")),
  },
  {
    path: privateRoutePaths.analyticsKeywords,
    Page: lazy(() => import("../pages/analytics/KeywordsAnalyticsPage")),
  },
  {
    path: privateRoutePaths.analyticsPageViews,
    Page: lazy(() => import("../pages/analytics/PageViewsAnalyticsPage")),
  },
  {
    path: privateRoutePaths.analyticsReferrers,
    Page: lazy(() => import("../pages/analytics/ReferrersAnalyticsPage")),
  },
];

const devRoutes: readonly LazyRoute[] = import.meta.env.DEV
  ? [
      {
        path: devRoutePaths.articleEditor,
        Page: lazy(() => import("../pages/dev/article-editor/ArticleEditor")),
      },
      {
        path: devRoutePaths.codexTestBed,
        Page: lazy(() => import("../pages/dev/test-beds/CodexTB")),
      },
      {
        path: devRoutePaths.designSystem,
        Page: lazy(() => import("../pages/dev/design-system/DesignSystem")),
      },
      {
        path: devRoutePaths.designSystemComponents,
        Page: lazy(() => import("../pages/dev/design-system/DesignSystemComponents")),
      },
      {
        path: devRoutePaths.designSystemFoundations,
        Page: lazy(() => import("../pages/dev/design-system/DesignSystemFoundations")),
      },
      {
        path: devRoutePaths.designSystemPatterns,
        Page: lazy(() => import("../pages/dev/design-system/DesignSystemPatterns")),
      },
      {
        path: devRoutePaths.documents,
        Page: lazy(() => import("../pages/dev/documents/Documents")),
      },
      {
        path: devRoutePaths.opusTestBed,
        Page: lazy(() => import("../pages/dev/test-beds/OpusTB")),
      },
    ]
  : [];

function LazyPage({ Page }: { Page: ComponentType }) {
  return (
    <Suspense fallback={null}>
      <Page />
    </Suspense>
  );
}

// Private pages must never share a document with third-party trackers, so arriving here by
// client-side navigation from a tracked public page forces a full load of a clean document.
function AnalyticsRoute() {
  const requiresCleanDocument = hasThirdPartyAnalyticsLoaded();

  useLayoutEffect(() => {
    if (requiresCleanDocument) {
      window.location.replace(window.location.href);
    }
  }, [requiresCleanDocument]);

  if (requiresCleanDocument) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
}

export default function App({ articlePages, initialRenderAt }: AppProps) {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AnalyticsRoute />}>
          {analyticsRoutes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
        </Route>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={publicRoutePaths.workingWithJoel} element={<WorkingWithJoel />} />
          <Route path={publicRoutePaths.inclusion} element={<InclusivePractice />} />
          <Route path={publicRoutePaths.kinkBdsm} element={<KinkBdsmCounselling />} />
          <Route path={publicRoutePaths.enmPolyamory} element={<EnmPolyamoryCounselling />} />
          <Route path={publicRoutePaths.lgbtqia} element={<LgbtqiaCounselling />} />
          <Route path={publicRoutePaths.articles} element={<LazyPage Page={articlePages.Index} />} />
          <Route path={getArticlePath(":slug")} element={<LazyPage Page={articlePages.Page} />} />
          <Route path={publicRoutePaths.contact} element={<Contact initialRenderAt={initialRenderAt} />} />
          <Route path={publicRoutePaths.crisisSupport} element={<CrisisSupport />} />
          <Route path={publicRoutePaths.privacyPolicy} element={<PrivacyPolicy />} />
          {publicRedirectRoutes.map(({ path, to }) => (
            <Route key={path} path={path} element={<Navigate to={to} replace />} />
          ))}
          {articleRedirects.map(({ fromSlug, toSlug }) => (
            <Route
              key={fromSlug}
              path={getArticlePath(fromSlug)}
              element={<Navigate to={getArticlePath(toSlug)} replace />}
            />
          ))}
          {devRoutes.map(({ path, Page }) => (
            <Route key={path} path={path} element={<LazyPage Page={Page} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <SiteAnalytics />
      <VisitRecorder />
    </>
  );
}
