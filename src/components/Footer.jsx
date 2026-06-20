import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';
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

  const companyDesc = contentMap['company-description']?.title || 'Powering industry and healthcare with advanced gas technologies, engineering excellence and unwavering commitment to safety and quality.';
  const address = contentMap['address']?.title || 'Multan A-C, Industrial Estate Multan - Pakistan';
  const phone = contentMap['phone']?.title || '061-6510200-6';
  const email = contentMap['email']?.title || 'info@mcl-gases.com';
  const website = contentMap['website']?.title || 'www.mcl-gases.com';
  const newsletterText = contentMap['newsletter-text']?.title || 'Stay updated with our latest news and updates.';
  const copyright = contentMap['copyright']?.title || '© 2024 Multan Chemicals Limited. All Rights Reserved.';

  const handleQuickLinkClick = (link) => {
    switch(link) {
      case 'Home': navigate('/'); break;
      case 'About Us': navigate('/about'); break;
      case 'Products': navigate('/products'); break;
      case 'Infrastructure': navigate('/infrastructure'); break;
      case 'Quality & Safety': navigate('/quality-safety'); break;
      case 'Contact Us': navigate('/contact'); break;
      case 'Certifications': navigate('/certifications'); break;
      case 'Careers': navigate('/careers'); break;
    }
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
      setNlMsg('Thank you for subscribing!');
      setNewsletter('');
    } catch {
      setNlMsg('Subscription failed. Please try again.');
    }
    setTimeout(() => setNlMsg(''), 4000);
  };

  return (
    <>
      <footer className="bg-mclRed text-white pt-16 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="border-r-0 lg:border-r border-white/20 pr-0 lg:pr-4">
            <img src={MclLogo} alt="MCL Multan Chemicals Limited" className="h-12 mb-6 brightness-0 invert" />
            <p className="text-xs leading-relaxed opacity-90 tracking-wide">{companyDesc}</p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs opacity-90">
              <div className="flex flex-col space-y-2">
                {['Home', 'About Us', 'Products'].map((link) => (
                  <button key={link} onClick={() => handleQuickLinkClick(link)} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{link}</button>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                {['Infrastructure', 'Quality & Safety', 'Careers', 'Contact Us'].map((link) => (
                  <button key={link} onClick={() => handleQuickLinkClick(link)} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{link}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-r-0 lg:border-r border-white/20 pr-0 lg:pr-4">
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Products</h4>
            <div className="flex flex-col space-y-2.5 text-xs opacity-90">
              {Object.keys(productCategoryMap).map((product) => (
                <button key={product} onClick={() => navigate(`/products?category=${productCategoryMap[product]}`)} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{product}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Reach Us</h4>
            <div className="flex flex-col space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5"><FaMapMarkerAlt size={10} /></div>
                <span className="opacity-90">{address}</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5"><FaPhone size={10} /></div>
                <span className="opacity-90">{phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5"><FaEnvelope size={10} /></div>
                <span className="opacity-90">{email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5"><FaGlobe size={10} /></div>
                <span className="opacity-90">{website}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Newsletter</h4>
            <p className="text-xs opacity-90 mb-4">{newsletterText}</p>
            {nlMsg && <p className="text-xs text-green-200 mb-2">{nlMsg}</p>}
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm rounded-lg overflow-hidden">
              <input type="email" placeholder="Your email address" value={newsletter} onChange={(e) => setNewsletter(e.target.value)} required className="bg-white text-gray-800 placeholder-gray-400 px-4 py-2.5 text-xs flex-1 outline-none" />
              <button type="submit" className="bg-red-900/40 hover:bg-black/20 p-2.5 px-4 transition-colors flex items-center justify-center focus:ring-2 focus:ring-white focus:outline-none">
                <span className="text-white text-sm">&rarr;</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 mt-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-80">
            <span>{copyright}</span>
            <div className="flex space-x-2">
              <button onClick={() => navigate('/privacy-policy')} className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded px-1">Privacy Policy</button>
              <span>|</span>
              <button onClick={() => navigate('/terms')} className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded px-1">Terms &amp; Conditions</button>
            </div>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none"><FaFacebook size={12} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none"><FaLinkedinIn size={12} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none"><FaYoutube size={12} /></a>
            </div>
          </div>
        </div>
      </footer>

      <a href="https://wa.me/923016510200" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform focus:ring-2 focus:ring-white focus:outline-none block">
        <FaWhatsapp size={24} className="text-white" />
      </a>
    </>
  );
}
