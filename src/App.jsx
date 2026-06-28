import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRow from './components/StatsRow';
import BusinessDivisions from './components/BusinessDivisions';
import MgpsSolutions from './components/MgpsSolutions';
import Footer from './components/Footer';
import AboutSection1 from './components/AboutSection1';
import AboutSection2 from './components/AboutSection2';
import AboutSection3 from './components/AboutSection3';
import Chatbot from './components/Chatbot';
import SiteLoader from './components/SiteLoader';
import RouteLoader from './components/RouteLoader';
import Seo, { SITE_URL } from './components/Seo';
import { ChatbotProvider } from './context/ChatbotContext';
import STATS from './data/stats';

// Schema.org Organization JSON-LD for the homepage. Every field traces to
// real, already-published site copy — the Head Office address/phone/email
// from `src/pages/Contact.jsx`'s `offices` array and the `founded_year` stat
// from `src/data/stats.js` — nothing here is invented. `sameAs` (social
// profile URLs) is intentionally omitted: no verified, real social profile
// URLs exist anywhere in the codebase (Footer's social icons are present but
// not wired to real MCL profile URLs), and inventing them would violate the
// "never invent facts" constraint.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Multan Chemicals Limited',
  alternateName: 'MCL',
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  description: 'Pakistan-based manufacturer and supplier of industrial, medical and specialty gases, LPG, and medical gas pipeline / healthcare engineering systems, founded in ' + STATS.founded_year.value + '.',
  foundingDate: STATS.founded_year.value,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '4-C-II Industrial Estate, Multan Cantt, Sher Shah Town',
    addressLocality: 'Multan',
    addressCountry: 'PK',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-61-6538206',
    contactType: 'customer service',
    email: 'info@mcl-gases.com',
  },
};

// Route-level code splitting: every page below is fetched on demand instead of
// being bundled into the initial chunk every visitor downloads to see the
// homepage. `Admin.jsx` (which transitively pulls in `AdminDashboard` + all 7
// `AdminPanelComponents`) and the `Infrastructure`/`Gases`/`GasDetail` pages
// (which pull in `WarehouseMap.jsx` -> leaflet + react-leaflet + xlsx, or the
// 1011-line gases JSON) are the highest-value targets per the Phase 1 audit.
const About = lazy(() => import('./pages/About'));
const InfrastructurePage = lazy(() => import('./pages/Infrastructure'));
const MgpsSolutionsPage = lazy(() => import('./pages/MgpsSolutionsPage'));
const ModularOT = lazy(() => import('./pages/ModularOT'));
const ClinicalSystems = lazy(() => import('./pages/ClinicalSystems'));
const Team = lazy(() => import('./pages/Team'));
const Gases = lazy(() => import('./pages/Gases'));
const GasDetail = lazy(() => import('./pages/GasDetail'));
const HealthEngineering = lazy(() => import('./pages/HealthEngineering'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const Admin = lazy(() => import('./pages/Admin'));
const QualitySafety = lazy(() => import('./pages/QualitySafety'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Production = lazy(() => import('./pages/Production'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Home() {
  return (
    <div className="pt-24">
      <Seo
        title="Industrial & Medical Gases Manufacturer in Pakistan"
        description="Multan Chemicals Limited manufactures and supplies industrial gases, medical-grade gases, specialty gas mixtures and LPG, plus medical gas pipeline systems (MGPS) and healthcare engineering, nationwide across Pakistan."
        path="/"
        jsonLd={organizationJsonLd}
      />
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
    <ChatbotProvider>
      <div className="min-h-screen bg-canvas text-ink font-sans antialiased">
        <SiteLoader />
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/infrastructure" element={<InfrastructurePage />} />
            <Route path="/mgps-solutions" element={<MgpsSolutionsPage />} />
            <Route path="/modular-ot" element={<ModularOT />} />
            <Route path="/clinical-systems" element={<ClinicalSystems />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gases" element={<Gases />} />
            <Route path="/gases/:categoryPath/:slug" element={<GasDetail />} />
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
        </Suspense>
        <Footer />
        <Chatbot />
      </div>
    </ChatbotProvider>
  );
}
