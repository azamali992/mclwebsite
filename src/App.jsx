import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRow from './components/StatsRow';
import BusinessDivisions from './components/BusinessDivisions';
import MgpsSolutions from './components/MgpsSolutions';
import Footer from './components/Footer';
import About from './pages/About';
import InfrastructurePage from './pages/Infrastructure';
import MgpsSolutionsPage from './pages/MgpsSolutionsPage';
import Contact from './pages/Contact';
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/mgps-solutions" element={<MgpsSolutionsPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}
