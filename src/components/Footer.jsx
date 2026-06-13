import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MclLogo from '../assets/MCL_Logo.jpeg';

export default function Footer() {
  const navigate = useNavigate();
  const [newsletter, setNewsletter] = useState('');

  const handleQuickLinkClick = (link) => {
    switch(link) {
      case 'Home':
        navigate('/');
        break;
      case 'About Us':
        navigate('/about');
        break;
      case 'Products':
        navigate('/#business-divisions');
        break;
      case 'Healthcare Engineering':
        navigate('/mgps-solutions');
        break;
      case 'Infrastructure':
        navigate('/infrastructure');
        break;
      case 'Contact Us':
        navigate('/contact');
        break;
      case 'Certifications':
      case 'Careers':
        // These pages don't exist yet, could navigate to about or contact
        navigate('/contact');
        break;
      default:
        break;
    }
  };

  const handleProductClick = () => {
    navigate('/#business-divisions');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletter.trim()) {
      console.log('Newsletter signup:', newsletter);
      setNewsletter('');
      alert('Thank you for subscribing!');
    }
  };

  return (
    <>
      <footer className="bg-mclRed text-white pt-16 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Company Profile & Branding */}
          <div className="border-r-0 lg:border-r border-white/20 pr-0 lg:pr-4">
            <img src={MclLogo} alt="MCL Multan Chemicals Limited" className="h-12 mb-6 brightness-0 invert" />
            <p className="text-xs leading-relaxed opacity-90 tracking-wide">
              Powering industry and healthcare with advanced gas technologies, engineering excellence and unwavering commitment to safety and quality.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs opacity-90">
              <div className="flex flex-col space-y-2">
                {['Home', 'About Us', 'Products', 'Healthcare Engineering'].map((link) => (
                  <button key={link} onClick={() => handleQuickLinkClick(link)} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{link}</button>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                {['Infrastructure', 'Certifications', 'Careers', 'Contact Us'].map((link) => (
                  <button key={link} onClick={() => handleQuickLinkClick(link)} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{link}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Products */}
          <div className="border-r-0 lg:border-r border-white/20 pr-0 lg:pr-4">
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Products</h4>
            <div className="flex flex-col space-y-2.5 text-xs opacity-90">
              {['Industrial Gases', 'Medical Gases', 'Specialty Gases', 'LPG', 'Mixture Gases'].map((product) => (
                <button key={product} onClick={handleProductClick} className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5 text-left focus:outline-none focus:ring-2 focus:ring-white rounded px-1">{product}</button>
              ))}
            </div>
          </div>

          {/* Column 4: Reach Us */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Reach Us</h4>
            <div className="flex flex-col space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaMapMarkerAlt size={10} />
                </div>
                <span className="opacity-90">Multan A-C, Industrial Estate Multan - Pakistan</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaPhone size={10} />
                </div>
                <span className="opacity-90">061-6510200-6</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaEnvelope size={10} />
                </div>
                <span className="opacity-90">info@mcl-gases.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaGlobe size={10} />
                </div>
                <span className="opacity-90">www.mcl-gases.com</span>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Newsletter</h4>
            <p className="text-xs opacity-90 mb-4">Stay updated with our latest news and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex max-w-sm rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                required
                className="bg-white text-gray-800 placeholder-gray-400 px-4 py-2.5 text-xs flex-1 outline-none"
              />
              <button type="submit" className="bg-red-900/40 hover:bg-black/20 p-2.5 px-4 transition-colors flex items-center justify-center focus:ring-2 focus:ring-white focus:outline-none">
                <span className="text-white text-sm">&rarr;</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 mt-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-80">
            <span>&copy; 2024 Multan Chemicals Limited. All Rights Reserved.</span>
            <div className="flex space-x-2">
              <span>Privacy Policy</span>
              <span>|</span>
              <span>Terms &amp; Conditions</span>
            </div>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none">
                <FaFacebook size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none">
                <FaLinkedinIn size={12} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors focus:ring-2 focus:ring-white focus:outline-none">
                <FaYoutube size={12} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <a href="https://wa.me/923016510200" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp" className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform focus:ring-2 focus:ring-white focus:outline-none block">
        <FaWhatsapp size={24} className="text-white" />
      </a>
    </>
  );
}
