import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedinIn, FaYoutube, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MclLogo from '../assets/MCL_Logo.jpeg';
import useContent from '../hooks/useContent';
import { subscribeNewsletter } from '../services/api';

export default function Footer() {
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState('');
  const [nlMsg, setNlMsg] = useState('');
  const { contentMap } = useContent('footer');

  const companyDesc = contentMap['company-description']?.title || 'Powering industry and healthcare with advanced gas technologies, engineering excellence and an unwavering commitment to safety and quality.';
  const address = contentMap['address']?.title || 'Industrial Estate, Multan, Pakistan';
  const phone = contentMap['phone']?.title || '061-6510200-6';
  const email = contentMap['email']?.title || 'info@mcl-gases.com';
  const website = contentMap['website']?.title || 'www.mcl-gases.com';
  const newsletterText = contentMap['newsletter-text']?.title || 'Stay updated with our latest news and announcements.';
  const copyright = contentMap['copyright']?.title || '© 2024 Multan Chemicals Limited. All rights reserved.';

  const handleQuickLinkClick = (link) => {
    const map = {
      'Home': '/', 'About Us': '/about', 'Gases': '/gases', 'Health Engineering': '/health-engineering',
      'Infrastructure': '/infrastructure', 'Quality & Safety': '/quality-safety', 'Contact Us': '/contact',
      'Certifications': '/certifications', 'Careers': '/careers',
    };
    if (map[link]) navigate(map[link]);
  };

  const productCategoryMap = {
    'Industrial Gases': 'industrial',
    'Medical Gases': 'medical',
    'Specialty Gases': 'specialty',
    'LPG': 'lpg',
    'Mixture Gases': 'specialty',
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletter.trim()) return;
    try {
      await subscribeNewsletter(newsletter.trim());
      setNlMsg('Thank you for subscribing.');
      setNewsletter('');
    } catch {
      setNlMsg('Subscription failed. Please try again.');
    }
    setTimeout(() => setNlMsg(''), 4000);
  };

  const colLink = 'text-left text-sm text-on-dark-soft transition-colors duration-150 hover:text-white';

  return (
    <footer className="bg-ink-deep px-6 pb-10 pt-20 text-white sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
        <div className="lg:pr-6">
          <span className="mb-6 inline-flex items-center rounded-md bg-white px-3 py-2">
            <img src={MclLogo} alt="Multan Chemicals Limited" className="h-8 w-auto" />
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-on-dark-soft">{companyDesc}</p>
        </div>

        <div>
          <h4 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">Quick links</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {['Home', 'About Us', 'Gases', 'Health Engineering', 'Infrastructure', 'Quality & Safety', 'Careers', 'Contact Us'].map((link) => (
              <button key={link} onClick={() => handleQuickLinkClick(link)} className={colLink}>{link}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">Gases</h4>
          <div className="flex flex-col gap-2.5">
            {Object.keys(productCategoryMap).map((product) => (
              <button key={product} onClick={() => navigate(`/gases?category=${productCategoryMap[product]}`)} className={colLink}>{product}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">Reach us</h4>
          <div className="flex flex-col gap-3 text-sm text-on-dark-soft">
            {[
              { icon: FaMapMarkerAlt, value: address },
              { icon: FaPhone, value: phone },
              { icon: FaEnvelope, value: email },
              { icon: FaGlobe, value: website },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-start gap-3">
                <Icon className="mt-0.5 flex-shrink-0 text-on-ink-accent" size={13} />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">Newsletter</h4>
          <p className="mb-4 text-sm text-on-dark-soft">{newsletterText}</p>
          {nlMsg && <p className="mb-2 text-xs text-emerald-300">{nlMsg}</p>}
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm overflow-hidden rounded-full border border-white/15 bg-white/[0.06] focus-within:border-white/40">
            <input
              type="email"
              placeholder="Your email address"
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              required
              aria-label="Email address"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none"
            />
            <button type="submit" aria-label="Subscribe" className="flex items-center justify-center bg-accent px-4 text-white transition-colors duration-150 hover:bg-accent-strong">
              <FaArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] border-t border-white/10 pt-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-on-dark-soft md:flex-row">
          <span>{copyright}</span>
          <div className="flex gap-4">
            <button onClick={() => navigate('/privacy-policy')} className="transition-colors hover:text-white">Privacy Policy</button>
            <button onClick={() => navigate('/terms')} className="transition-colors hover:text-white">Terms &amp; Conditions</button>
          </div>
          <div className="flex gap-2">
            {[
              { icon: FaFacebook, label: 'Facebook', href: 'https://facebook.com' },
              { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: FaYoutube, label: 'YouTube', href: 'https://youtube.com' },
            ].map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-150 hover:bg-white/20">
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
