import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import logo from '../assets/MCL_Logo.jpeg';
import { slugify, industrialGases, medicalGases, specialtyGases, lpgGases } from '../data/products';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gasesOpen, setGasesOpen] = useState(false);
  const [healthEngOpen, setHealthEngOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[820px]">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 grid grid-cols-4 gap-8">
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
                                <p className="text-2xl font-extrabold leading-none mb-1">125 TPD</p>
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px]">
                          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 grid grid-cols-3 gap-8">
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium ${
                  active ? 'text-mclRed bg-red-50' : 'text-gray-700 hover:bg-gray-50 hover:text-mclRed'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <button onClick={handleQuoteClick} className="w-full mt-4 bg-mclRed text-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-red-800 transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none">
            Request Quote
          </button>
        </div>
      )}
    </nav>
  );
}
