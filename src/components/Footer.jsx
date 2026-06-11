import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaFacebook, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import MclLogo from '../assets/MCL_Logo.jpeg';

export default function Footer() {
  const quickLinks1 = ['Home', 'About Us', 'Products', 'Healthcare Engineering', 'Industries'];
  const quickLinks2 = ['Infrastructure', 'Clients', 'Certifications', 'Careers', 'Contact Us'];
  const products = ['Industrial Gases', 'Medical Gases', 'Specialty Gases', 'LPG', 'Mixture Gases'];

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
                {quickLinks1.map((link) => (
                  <a key={link} href="#" className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5">{link}</a>
                ))}
              </div>
              <div className="flex flex-col space-y-2">
                {quickLinks2.map((link) => (
                  <a key={link} href="#" className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5">{link}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Products */}
          <div className="border-r-0 lg:border-r border-white/20 pr-0 lg:pr-4">
            <h4 className="font-bold uppercase tracking-wide text-sm mb-4">Products</h4>
            <div className="flex flex-col space-y-2.5 text-xs opacity-90">
              {products.map((product) => (
                <a key={product} href="#" className="hover:opacity-100 transition-all opacity-80 hover:translate-x-0.5">{product}</a>
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
            <div className="flex max-w-sm rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white text-gray-800 placeholder-gray-400 px-4 py-2.5 text-xs flex-1 outline-none"
              />
              <button className="bg-red-900/40 hover:bg-black/20 p-2.5 px-4 transition-colors flex items-center justify-center">
                <span className="text-white text-sm">&rarr;</span>
              </button>
            </div>
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
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <FaFacebook size={12} />
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <FaLinkedinIn size={12} />
              </div>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <FaYoutube size={12} />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-3.5 rounded-full shadow-xl hover:scale-110 transition-transform cursor-pointer">
        <FaWhatsapp size={24} className="text-white" />
      </div>
    </>
  );
}
