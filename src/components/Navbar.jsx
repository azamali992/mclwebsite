import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars, FaTimes, FaChevronDown, FaArrowRight,
  FaBuilding, FaBullseye, FaHistory, FaUsers, FaMapMarkedAlt, FaIndustry, FaAward,
} from 'react-icons/fa';
import logo from '../assets/MCL_Logo.jpeg';
import { gasesBySection } from '../data/gasesData';
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

  const linkBase = 'relative text-[13px] font-medium transition-colors duration-200 py-1';
  const linkClass = (active) =>
    `${linkBase} flex items-center gap-1 ${active ? 'text-accent' : 'text-ink-soft hover:text-ink'}`;

  const panelClass = 'rounded-lg border border-line bg-canvas p-3 shadow-[var(--shadow-lg)]';
  const panelLink = 'block rounded-md px-3 py-2 text-sm text-ink-soft transition-colors duration-150 hover:bg-surface hover:text-accent';

  const handleQuoteClick = () => navigate('/contact');

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-b border-line bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent bg-canvas'
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-shrink-0 items-center">
            <img src={logo} alt="Multan Chemicals Limited" className="h-11 w-auto" style={{ height: '44px' }} />
            <span className="ml-3 flex flex-col border-l border-line pl-3 leading-none">
              <span className="text-xl font-semibold tracking-tight text-ink">Multan</span>
              <span className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">Chemicals Limited</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 lg:flex xl:gap-8">
            <div className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.path);

                if (link.name === 'About Us') {
                  return (
                    <div key={link.name} className="relative" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)}>
                      <Link to={link.path} aria-current={active ? 'page' : undefined} aria-expanded={aboutOpen} onFocus={() => setAboutOpen(true)} className={linkClass(active)}>
                        {link.name}
                        <FaChevronDown size={9} className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      {aboutOpen && (
                        <div className="absolute left-0 top-full w-[300px] pt-3">
                          <ul className={panelClass}>
                            {aboutLinks.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <li key={item.to}>
                                  <Link to={item.to} onClick={() => setAboutOpen(false)} className={`${panelLink} flex items-center gap-3`}>
                                    <ItemIcon className="flex-shrink-0 text-accent" size={14} />
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.name === 'Gases') {
                  return (
                    <div key={link.name} className="relative" onMouseEnter={() => setGasesOpen(true)} onMouseLeave={() => setGasesOpen(false)}>
                      <Link to={link.path} aria-current={active ? 'page' : undefined} aria-expanded={gasesOpen} onFocus={() => setGasesOpen(true)} className={linkClass(active)}>
                        {link.name}
                        <FaChevronDown size={9} className={`transition-transform duration-200 ${gasesOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      {gasesOpen && (
                        <div className="absolute left-0 top-full w-[95vw] max-w-[820px] pt-3 xl:left-1/2 xl:-translate-x-1/2">
                          <div className={`${panelClass} grid grid-cols-2 gap-6 p-6 lg:grid-cols-4`}>
                            <div>
                              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Medical</p>
                              <ul className="space-y-1">
                                {gasesBySection.medical.map((g) => (
                                  <li key={g.slug}><Link to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => setGasesOpen(false)} className={panelLink}>{g.cardTitle}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Industrial</p>
                              <ul className="space-y-1">
                                {[...gasesBySection.industrial, ...gasesBySection.lpg].map((g) => (
                                  <li key={g.slug}><Link to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => setGasesOpen(false)} className={panelLink}>{g.cardTitle}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">Specialty</p>
                              <ul className="space-y-1">
                                {gasesBySection.specialty.map((g) => (
                                  <li key={g.slug}><Link to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => setGasesOpen(false)} className={panelLink}>{g.cardTitle}</Link></li>
                                ))}
                              </ul>
                            </div>
                            <div className="rounded-md bg-ink-deep p-5">
                              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-on-dark-soft">Our capacity</p>
                              <p className="mt-2 font-mono text-2xl font-medium leading-none text-white">{resolveStat(statsMap, 'oxygen_plant_capacity').value}</p>
                              <p className="mt-2 text-xs leading-relaxed text-on-dark-soft">Largest single liquid oxygen plant in Pakistan.</p>
                              <Link to="/production" onClick={() => setGasesOpen(false)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                                View production <FaArrowRight size={10} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.name === 'Health Engineering') {
                  return (
                    <div key={link.name} className="relative" onMouseEnter={() => setHealthEngOpen(true)} onMouseLeave={() => setHealthEngOpen(false)}>
                      <Link to={link.path} aria-current={active ? 'page' : undefined} aria-expanded={healthEngOpen} onFocus={() => setHealthEngOpen(true)} className={linkClass(active)}>
                        {link.name}
                        <FaChevronDown size={9} className={`transition-transform duration-200 ${healthEngOpen ? 'rotate-180' : ''}`} />
                      </Link>
                      {healthEngOpen && (
                        <div className="absolute left-0 top-full w-[90vw] max-w-[560px] pt-3 xl:left-1/2 xl:-translate-x-1/2">
                          <div className={`${panelClass} grid grid-cols-1 gap-2 p-4 sm:grid-cols-3`}>
                            <Link to="/mgps-solutions" onClick={() => setHealthEngOpen(false)} className={panelLink}>
                              <span className="block font-semibold text-ink">MGPS Solutions</span>
                              <span className="mt-1 block text-xs text-muted">Medical gas pipeline systems</span>
                            </Link>
                            <Link to="/modular-ot" onClick={() => setHealthEngOpen(false)} className={panelLink}>
                              <span className="block font-semibold text-ink">Modular OT</span>
                              <span className="mt-1 block text-xs text-muted">Modular operation theatres</span>
                            </Link>
                            <Link to="/clinical-systems" onClick={() => setHealthEngOpen(false)} className={panelLink}>
                              <span className="block font-semibold text-ink">Clinical Systems</span>
                              <span className="mt-1 block text-xs text-muted">Diagnostic & critical care</span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link key={link.name} to={link.path} aria-current={active ? 'page' : undefined} className={linkClass(active)}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <button onClick={handleQuoteClick} className="btn btn-primary px-5 py-2.5 text-[13px]">
              Request quote
            </button>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="text-ink lg:hidden"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-line bg-canvas px-4 pb-5 pt-2 shadow-[var(--shadow-lg)] lg:hidden">
          {navLinks.map((link) => {
            const active = isActive(link.path);

            if (link.name === 'About Us') {
              return (
                <div key={link.name} className="border-b border-line last:border-b-0">
                  <button onClick={() => setMobileAboutOpen(!mobileAboutOpen)} className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium ${active ? 'text-accent' : 'text-ink'}`}>
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAboutOpen && (
                    <div className="space-y-1 pb-2 pl-4">
                      {aboutLinks.map((item) => (
                        <Link key={item.to} to={item.to} onClick={() => { setIsOpen(false); setMobileAboutOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">{item.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.name === 'Gases') {
              return (
                <div key={link.name} className="border-b border-line last:border-b-0">
                  <button onClick={() => setMobileGasesOpen(!mobileGasesOpen)} className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium ${active ? 'text-accent' : 'text-ink'}`}>
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform duration-200 ${mobileGasesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileGasesOpen && (
                    <div className="space-y-1 pb-2 pl-4">
                      <p className="px-3 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent">Medical</p>
                      {gasesBySection.medical.map((g) => (
                        <Link key={g.slug} to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">{g.cardTitle}</Link>
                      ))}
                      <p className="px-3 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent">Industrial</p>
                      {[...gasesBySection.industrial, ...gasesBySection.lpg].map((g) => (
                        <Link key={g.slug} to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">{g.cardTitle}</Link>
                      ))}
                      <p className="px-3 pt-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-accent">Specialty</p>
                      {gasesBySection.specialty.map((g) => (
                        <Link key={g.slug} to={`/gases/${g.categoryPath}/${g.slug}`} onClick={() => { setIsOpen(false); setMobileGasesOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">{g.cardTitle}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.name === 'Health Engineering') {
              return (
                <div key={link.name} className="border-b border-line last:border-b-0">
                  <button onClick={() => setMobileHealthEngOpen(!mobileHealthEngOpen)} className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium ${active ? 'text-accent' : 'text-ink'}`}>
                    {link.name}
                    <FaChevronDown size={10} className={`transition-transform duration-200 ${mobileHealthEngOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileHealthEngOpen && (
                    <div className="space-y-1 pb-2 pl-4">
                      <Link to="/mgps-solutions" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">MGPS Solutions</Link>
                      <Link to="/modular-ot" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">Modular OT</Link>
                      <Link to="/clinical-systems" onClick={() => { setIsOpen(false); setMobileHealthEngOpen(false); }} className="block px-3 py-1.5 text-sm text-muted hover:text-accent">Clinical Systems</Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link key={link.name} to={link.path} aria-current={active ? 'page' : undefined} className={`flex items-center justify-between border-b border-line px-3 py-3 text-base font-medium last:border-b-0 ${active ? 'text-accent' : 'text-ink hover:text-accent'}`} onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            );
          })}
          <button onClick={() => { handleQuoteClick(); setIsOpen(false); }} className="btn btn-primary mt-4 w-full">
            Request quote
          </button>
        </div>
      )}
    </nav>
  );
}
