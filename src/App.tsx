import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import About from "./pages/About";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import Fees from "./pages/Fees";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";
import TestBed from "./pages/TestBed";
import DesignLanguage from "./pages/DesignLanguage";
import DS_Foundations from "./pages/design-system/DS_Foundations";
import DS_Components from "./pages/design-system/DS_Components";
import DS_Patterns from "./pages/design-system/DS_Patterns";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about-joel" element={<About />} />
          <Route path="approach" element={<Approach />} />
          <Route path="inclusive-practice" element={<InclusivePractice />} />
          <Route path="test-bed" element={<TestBed />} />
          <Route path="inclusive-practice-trial" element={<TestBed />} />
          <Route path="design-language" element={<DesignLanguage />} />
          <Route path="design-language/foundations" element={<DS_Foundations />} />
          <Route path="design-language/components" element={<DS_Components />} />
          <Route path="design-language/patterns" element={<DS_Patterns />} />
          <Route path="inclusive-practice-trial-2" element={<DesignLanguage />} />
          <Route path="fees" element={<Fees />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
