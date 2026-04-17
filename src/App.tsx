import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import About from "./pages/About";
import Approach from "./pages/Approach";
import Contact from "./pages/Contact";
import Fees from "./pages/Fees";
import Home from "./pages/Home";
import InclusivePractice from "./pages/InclusivePractice";

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
          <Route path="fees" element={<Fees />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
