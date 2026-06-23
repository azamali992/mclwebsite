import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars, FaTimes, FaChevronDown, FaArrowRight,
  FaBuilding, FaBullseye, FaHistory, FaUsers, FaMapMarkedAlt, FaIndustry, FaAward,
} from 'react-icons/fa';
import logo from '../assets/MCL_Logo.jpeg';
import { slugify, industrialGases, medicalGases, specialtyGases, lpgGases } from '../data/products';
import useStats from '../hooks/useStats';
import { resolveStat } from '../data/stats';

export default function Navbar() {
  const { statsMap } = useStats();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [gasesOpen, setGasesOpen] = useState(false);
  const [healthEngOpen, setHealthEngOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileGasesOpen, setMobileGasesOpen] = useState(false);
  const [mobileHealthEngOpen, setMobileHealthEngOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const aboutLinks = [
    { label: 'Company Overview', to: '/about#overview', icon: FaBuilding },
    { label: 'Mission, Vision & Values', to: '/about#mission', icon: FaBullseye },
    { label: 'History & Milestones', to: '/about#history', icon: FaHistory },
    { label: 'Leadership Team', to: '/about#team', icon: FaUsers },
    { label: 'Nationwide Network', to: '/about#network', icon: FaMapMarkedAlt },
    { label: 'Industries We Serve', to: '/about#clients', icon: FaIndustry },
    { label: 'Certifications', to: '/about#certifications', icon: FaAward },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gases', path: '/gases' },
    { name: 'Health Engineering', path: '/health-engineering' },
    { name: 'Infrastructure', path: '/infrastructure' },
    { name: 'Production', path: '/production' },
    { name: 'Quality & Safety', path: '/quality-safety' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleQuoteClick = () => {
    navigate('/contact');
  };

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100/80' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between h-24 items-center">

          {/* Logo area */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Multan Chemicals Limited Logo"
              style={{ height: '50px', width: 'auto' }}
              className="h-12 w-auto"
            />
            <div className="flex flex-col ml-3 border-l-2 border-gray-200 pl-3">
              <span className="text-2xl font-semibold text-gray-800 leading-none tracking-wide">Multan</span>
              <span className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wider">Chemicals Limited</span>
            </div>
          </Link>

          {/* Right side wrapper */}
          <div className="hidden lg:flex items-center space-x-8">

            {/* Desktop links */}
            <div className="flex space-x-6 xl:space-x-8 items-center">
              {navLinks.map((link) => {
                const active = isActive(link.path);

                if (link.name === 'About Us') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setAboutOpen(true)}
                      onMouseLeave={() => setAboutOpen(false)}
                    >
                      <Link
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        aria-expanded={aboutOpen}
                        onFocus={() => setAboutOpen(true)}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-1 border-b-2 focus:ring-2 focus:ring-mclRed focus:outline-none rounded px-1 ${
                          active
                            ? 'border-mclRed text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-mclRed hover:border-mclRed'
                        }`}
                      >
                        {link.name}
                        <FaChevronDown size={10} className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      {aboutOpen && (
                        <div className="absolute top-full left-0 pt-3 w-[90vw] max-w-[300px]">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
                            <ul className="space-y-0.5">
                              {aboutLinks.map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <li key={item.to}>
                                    <Link
                                      to={item.to}
                                      onClick={() => setAboutOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:text-mclRed hover:bg-red-50 transition-colors"
                                    >
                                      <ItemIcon className="text-mclRed flex-shrink-0" size={14} />
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.name === 'Gases') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setGasesOpen(true)}
                      onMouseLeave={() => setGasesOpen(false)}
                    >
                      <Link
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        aria-expanded={gasesOpen}
                        onFocus={() => setGasesOpen(true)}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-1 border-b-2 focus:ring-2 focus:ring-mclRed focus:outline-none rounded px-1 ${
                          active
                            ? 'border-mclRed text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-mclRed hover:border-mclRed'
                        }`}
                      >
                        {link.name}
                        <FaChevronDown size={10} className={`transition-transform ${gasesOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      {gasesOpen && (
                        <div className="absolute top-full left-0 xl:left-1/2 xl:-translate-x-1/2 pt-3 w-[95vw] max-w-[820px]">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">Medical Gases</p>
                              <ul className="space-y-2.5">
                                {medicalGases.map((p) => (
                                  <li key={p.title}>
                                    <Link to={`/gases#${slugify(p.title)}`} onClick={() => setGasesOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                      {p.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">Industrial Gases</p>
                              <ul className="space-y-2.5">
                                {[...industrialGases, ...lpgGases].map((p) => (
                                  <li key={p.title}>
                                    <Link to={`/gases#${slugify(p.title)}`} onClick={() => setGasesOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                      {p.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">Specialty Gases</p>
                              <ul className="space-y-2.5">
                                {specialtyGases.map((p) => (
                                  <li key={p.title}>
                                    <Link to={`/gases#${slugify(p.title)}`} onClick={() => setGasesOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                      {p.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-6">
                              <div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-3">Quick Links</p>
                                <ul className="space-y-2.5">
                                  {[
                                    { label: 'All Industrial Gases', to: '/gases#industrial' },
                                    { label: 'All Medical Gases', to: '/gases#medical' },
                                    { label: 'Specialty Gases', to: '/gases#specialty' },
                                    { label: 'LPG', to: '/gases#lpg' },
                                  ].map((q) => (
                                    <li key={q.to}>
                                      <Link to={q.to} onClick={() => setGasesOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                        {q.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-mclRed rounded-lg p-4 text-white">
                                <p className="text-white/80 font-bold uppercase tracking-widest text-[10px] mb-1">Our Capacity</p>
                                <p className="text-2xl font-extrabold leading-none mb-1">{resolveStat(statsMap, 'oxygen_plant_capacity').value}</p>
                                <p className="text-white/80 text-xs mb-3">Largest single liquid oxygen plant in Pakistan.</p>
                                <Link to="/production" onClick={() => setGasesOpen(false)} className="text-xs font-bold uppercase inline-flex items-center gap-1 hover:gap-2 transition-all">
                                  View Production <FaArrowRight size={10} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.name === 'Health Engineering') {
                  return (
                    <div
                      key={link.name}
                      className="relative"
                      onMouseEnter={() => setHealthEngOpen(true)}
                      onMouseLeave={() => setHealthEngOpen(false)}
                    >
                      <Link
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        aria-expanded={healthEngOpen}
                        onFocus={() => setHealthEngOpen(true)}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-1 border-b-2 focus:ring-2 focus:ring-mclRed focus:outline-none rounded px-1 ${
                          active
                            ? 'border-mclRed text-gray-900'
                            : 'border-transparent text-gray-600 hover:text-mclRed hover:border-mclRed'
                        }`}
                      >
                        {link.name}
                        <FaChevronDown size={10} className={`transition-transform ${healthEngOpen ? 'rotate-180' : ''}`} />
                      </Link>

                      {healthEngOpen && (
                        <div className="absolute top-full left-0 xl:left-1/2 xl:-translate-x-1/2 pt-3 w-[90vw] max-w-[620px]">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">MGPS Solutions</p>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link to="/mgps-solutions" onClick={() => setHealthEngOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                    Medical Gas Pipeline Systems
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/mgps-solutions" onClick={() => setHealthEngOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                    Terminal Units & Gas Delivery
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">Modular OT</p>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link to="/modular-ot" onClick={() => setHealthEngOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                    Modular Operation Theatres
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-mclRed font-bold uppercase tracking-widest text-xs mb-3">Clinical Systems</p>
                              <ul className="space-y-2.5">
                                <li>
                                  <Link to="/clinical-systems" onClick={() => setHealthEngOpen(false)} className="text-sm text-gray-700 hover:text-mclRed transition-colors">
                                    Diagnostic & Critical Care Equipment
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center text-sm font-medium transition-colors duration-200 pb-1 border-b-2 focus:ring-2 focus:ring-mclRed focus:outline-none rounded px-1 ${
                      active
                        ? 'border-mclRed text-gray-900'
                        : 'border-transparent text-gray-600 hover:text-mclRed hover:border-mclRed'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Quote button */}
            <div>
              <button onClick={handleQuoteClick} className="bg-mclRed text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-red-800 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none">
                Request Quote
              </button>
            </div>
          </div>

          {/* Mobile btn */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-gray-700 hover:text-mclRed focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            
            if (link.name === 'About Us') {
              return (
                <div key={link.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium ${
                      active ? 'text-mclRed bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div className="pl-4 pb-2 space-y-1">
                      {aboutLinks.map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => { setIsOpen(false); setMobileAboutOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.name === 'Gases') {
              return (
                <div key={link.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setMobileGasesOpen(!mobileGasesOpen)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium ${
                      active ? 'text-mclRed bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform ${mobileGasesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileGasesOpen && (
                    <div className="pl-4 pb-2 space-y-1">
                      <p className="text-[10px] font-bold text-mclRed uppercase tracking-wider px-3 pt-2">Medical Gases</p>
                      {medicalGases.map((p) => (
                        <Link key={p.title} to={`/gases#${slugify(p.title)}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                          {p.title}
                        </Link>
                      ))}
                      <p className="text-[10px] font-bold text-mclRed uppercase tracking-wider px-3 pt-2">Industrial Gases</p>
                      {[...industrialGases, ...lpgGases].map((p) => (
                        <Link key={p.title} to={`/gases#${slugify(p.title)}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                          {p.title}
                        </Link>
                      ))}
                      <p className="text-[10px] font-bold text-mclRed uppercase tracking-wider px-3 pt-2">Specialty Gases</p>
                      {specialtyGases.map((p) => (
                        <Link key={p.title} to={`/gases#${slugify(p.title)}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                          {p.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.name === 'Health Engineering') {
              return (
                <div key={link.name} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setMobileHealthEngOpen(!mobileHealthEngOpen)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-base font-medium ${
                      active ? 'text-mclRed bg-red-50' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform ${mobileHealthEngOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileHealthEngOpen && (
                    <div className="pl-4 pb-2 space-y-1">
                      <Link to="/mgps-solutions" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                        MGPS Solutions
                      </Link>
                      <Link to="/modular-ot" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                        Modular OT
                      </Link>
                      <Link to="/clinical-systems" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-mclRed">
                        Clinical Systems
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium border-b border-gray-100 last:border-b-0 ${
                  active ? 'text-mclRed bg-red-50' : 'text-gray-700 hover:bg-gray-50 hover:text-mclRed'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <button onClick={() => { handleQuoteClick(); setIsOpen(false); }} className="w-full mt-4 bg-mclRed text-white px-4 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-red-800 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none rounded-md">
            Request Quote
          </button>
        </div>
      )}
    </nav>
  );
}
