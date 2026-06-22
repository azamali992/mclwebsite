import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRow from './components/StatsRow';
import BusinessDivisions from './components/BusinessDivisions';
import MgpsSolutions from './components/MgpsSolutions';
import Footer from './components/Footer';
import About from './pages/About';
import InfrastructurePage from './pages/Infrastructure';
import MgpsSolutionsPage from './pages/MgpsSolutionsPage';
import ModularOT from './pages/ModularOT';
import ClinicalSystems from './pages/ClinicalSystems';
import Team from './pages/Team';
import Gases from './pages/Gases';
import HealthEngineering from './pages/HealthEngineering';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import QualitySafety from './pages/QualitySafety';
import Certifications from './pages/Certifications';
import Production from './pages/Production';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import AboutSection1 from './components/AboutSection1';
import AboutSection2 from './components/AboutSection2';
import AboutSection3 from './components/AboutSection3';

function Home() {
  return (
    <div className="pt-24">
      <Hero />
      <StatsRow />
      <BusinessDivisions />
      <MgpsSolutions />
      <AboutSection1 />
      <AboutSection2 />
      <AboutSection3 />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/mgps-solutions" element={<MgpsSolutionsPage />} />
        <Route path="/modular-ot" element={<ModularOT />} />
        <Route path="/clinical-systems" element={<ClinicalSystems />} />
        <Route path="/team" element={<Team />} />
        <Route path="/gases" element={<Gases />} />
        <Route path="/health-engineering" element={<HealthEngineering />} />
        <Route path="/products" element={<Navigate to="/gases" replace />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quality-safety" element={<QualitySafety />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/production" element={<Production />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
