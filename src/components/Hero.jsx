import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import hero01 from '../assets/hero01.JPG';
import hero02 from '../assets/hero02.JPG';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Leading the Way in Industrial Chemical Manufacturing",
      subtitle: "Providing high-quality chemical solutions, advanced healthcare engineering, and sustainable industrial infrastructure globally.",
      bgImage: hero01,
    },
    {
      title: "Innovating Healthcare Engineering Solutions",
      subtitle: "Equipping medical environments with state-of-the-art infrastructure and high-purity specialized chemicals.",
      bgImage: hero02,
    },
  ];

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % 2), []);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[calc(100vh-96px)] w-full overflow-hidden bg-gray-900">
      
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="absolute inset-0 flex items-center z-20">
              <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 w-full text-white">
                <div className="max-w-3xl space-y-6">
                  <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight transition-all duration-700 delay-200 ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.title}
                  </h1>
                  <p className={`text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-light transition-all duration-700 delay-300 ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {slide.subtitle}
                  </p>
                  
                  <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-[400ms] ${
                    index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <button className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-red-900/30 active:scale-95">
                      Explore Products
                    </button>
                    <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/60 text-white p-3 rounded-full transition-all hover:scale-110 hidden sm:block backdrop-blur-sm focus:ring-2 focus:ring-white focus:outline-none"
      >
        <FaChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/60 text-white p-3 rounded-full transition-all hover:scale-110 hidden sm:block backdrop-blur-sm focus:ring-2 focus:ring-white focus:outline-none"
      >
        <FaChevronRight size={20} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full focus:ring-2 focus:ring-mclRed focus:outline-none ${
              index === currentSlide ? 'w-10 bg-mclRed shadow-lg shadow-red-900/40' : 'w-3 bg-white/40 hover:bg-white/80'
            } h-3`}
          />
        ))}
      </div>
    </div>
  );
}