import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import About from "./pages/About";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import Fees from "./pages/Fees";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";
import {
  EnmPolyamoryCounselling,
  KinkBdsmCounselling,
  LgbtqiaCounselling,
} from "./pages/InclusionChildPages";
import CodexTB from "./pages/CodexTB";
import DesignLanguage from "./pages/DesignLanguage";
import DS_Foundations from "./pages/design-system/DS_Foundations";
import DS_Components from "./pages/design-system/DS_Components";
import DS_Heroes from "./pages/design-system/DS_Heroes";
import DS_Patterns from "./pages/design-system/DS_Patterns";
import OpusTB from "./pages/OpusTB";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-joel" element={<About />} />
          <Route path="approach" element={<Approach />} />
          <Route path="inclusion" element={<InclusivePractice />} />
          <Route path="inclusion/kink-bdsm" element={<KinkBdsmCounselling />} />
          <Route path="inclusion/enm-polyamory" element={<EnmPolyamoryCounselling />} />
          <Route path="inclusion/lgbtqia" element={<LgbtqiaCounselling />} />
          <Route path="codex-tb" element={<CodexTB />} />
          <Route path="opus-tb" element={<OpusTB />} />
          <Route path="design-language" element={<DesignLanguage />} />
          <Route path="design-language/foundations" element={<DS_Foundations />} />
          <Route path="design-language/components" element={<DS_Components />} />
          <Route path="design-language/heroes" element={<DS_Heroes />} />
          <Route path="design-language/patterns" element={<DS_Patterns />} />
          <Route path="fees" element={<Fees />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
