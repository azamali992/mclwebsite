import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useChatbot from '../hooks/useChatbot';
import heroImg from '../assets/heromcl.png';

export default function Hero() {
  const navigate = useNavigate();
  const { contentMap } = useContent('hero');
  const { setOpen: setChatOpen } = useChatbot();

  const title = contentMap['slide-1-title']?.title || 'Leading the Way in Industrial Chemical Manufacturing';
  const subtitle = contentMap['slide-1-subtitle']?.title || 'Providing high-quality chemical solutions, advanced healthcare engineering, and sustainable industrial infrastructure globally.';

  return (
    <div className="relative h-[calc(100vh-80px)] sm:h-[calc(100vh-96px)] w-full overflow-hidden bg-blue-950">
      <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {title}
            </h1>
            <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              {subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => navigate('/gases')}
                className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95"
              >
                Explore Products
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95"
              >
                Contact Us
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <FaCommentDots size={16} /> Ask Our Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
