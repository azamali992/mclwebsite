import useInView from '../hooks/useInView';
import { FaGasPump, FaUsers, FaShieldAlt, FaClock, FaCog, FaMapMarkerAlt, FaCheck, FaCheckCircle } from 'react-icons/fa';
import heroBg from '../assets/infra01.JPG';
import stationImg from '../assets/stationimg.jpg';
import plantImg1 from '../assets/infra02.JPG';
import plantImg2 from '../assets/infra03.JPG';
import plantImg3 from '../assets/infra04.JPG';
import hero01 from '../assets/hero01.JPG';
import hero02 from '../assets/hero02.JPG';
import pagedemo1 from '../assets/pagedemo1.jpeg';
import pagedemo2 from '../assets/pagedemo2.jpeg';
import pagedemo3 from '../assets/pagedemo3.jpeg';

const stats = [
  { icon: FaGasPump, value: "35+", label: "Filling Stations", sublabel: "Nationwide" },
  { icon: FaUsers, value: "100%", label: "Nationwide", sublabel: "Coverage" },
  { icon: FaShieldAlt, value: "Safety First", label: "Strict Safety", sublabel: "Protocols" },
  { icon: FaClock, value: "24/7", label: "Reliable Supply", sublabel: "Network" },
  { icon: FaCog, value: "Expert Team", label: "Trained & Certified", sublabel: "Professionals" },
];

const stations = [
  { city: "Multan", province: "Punjab", imagePlaceholder: stationImg },
  { city: "Lahore", province: "Punjab", imagePlaceholder: stationImg },
  { city: "Faisalabad", province: "Punjab", imagePlaceholder: stationImg },
  { city: "Rawalpindi", province: "Punjab", imagePlaceholder: stationImg },
  { city: "Sialkot", province: "Punjab", imagePlaceholder: stationImg },
  { city: "Peshawar", province: "KPK", imagePlaceholder: stationImg },
  { city: "Karachi", province: "Sindh", imagePlaceholder: stationImg },
  { city: "Hyderabad", province: "Sindh", imagePlaceholder: stationImg },
  { city: "Quetta", province: "Balochistan", imagePlaceholder: stationImg },
  { city: "Sukkur", province: "Sindh", imagePlaceholder: stationImg },
];

const plants = [
  { capacity: "125 TPD", type: "Oxygen Plant", location: "Multan", imagePlaceholder: plantImg1 },
  { capacity: "100 TPD", type: "Oxygen Plant", location: "Khewra", imagePlaceholder: plantImg2 },
  { capacity: "50 TPD", type: "Oxygen Plant", location: "Sahiwal", imagePlaceholder: plantImg3 },
];

const oxygenChecklist = [
  "High pressure cylinder filling up to 200 Bar",
  "Automatic filling manifolds",
  "Online purity & pressure monitoring",
  "Strict safety & quality control",
  "Trained and certified operators",
];

const logisticsStats = [
  { value: "65+", label: "Delivery Trucks" },
  { value: "20+", label: "Tanker Trucks" },
  { value: "100+", label: "Dedicated Staff" },
  { value: "Real-time", label: "Tracking System" },
];

const qualityCerts = [
  { color: "blue", title: "ISO 9001:2015", desc: "Quality Management" },
  { color: "green", title: "ISO 14001:2015", desc: "Environmental Management" },
  { color: "red", title: "ISO 45001:2018", desc: "Occupational Health & Safety" },
  { color: "blue", title: "HTM 02-01", desc: "Medical Gas Pipeline Systems" },
  { color: "yellow", title: "GMP", desc: "Good Manufacturing Practice" },
];

const galleryImages = [stationImg, pagedemo1, pagedemo2, pagedemo3];

const certColors = {
  blue: { border: "border-blue-200", text: "text-blue-600" },
  green: { border: "border-green-200", text: "text-green-600" },
  red: { border: "border-red-200", text: "text-red-600" },
  yellow: { border: "border-yellow-200", text: "text-yellow-600" },
};

const SectionWrap = ({ children, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
};

export default function Infrastructure() {
  return (
    <>
      <section className="w-full relative bg-gray-900 h-[500px] lg:h-[600px]">
        <img
          src={heroBg}
          alt="Filling station canopy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto z-10 w-full lg:w-1/2">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-4">
            OUR INFRASTRUCTURE
          </p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-6">
            Nationwide Filling Stations For Uninterrupted Supply
          </h1>
          <p className="text-gray-200 text-base leading-relaxed">
            MCL operates 35+ company owned filling stations across Pakistan to ensure availability, safety and reliable distribution of medical and industrial gases.
          </p>
        </div>
      </section>

      <div className="relative z-20 -mt-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-xl shadow-xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100 p-2">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1 flex items-center justify-center p-4 gap-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-full">
                <stat.icon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-lg">{stat.value}</span>
                <span className="text-gray-800 text-sm font-semibold">{stat.label}</span>
                <span className="text-gray-500 text-xs">{stat.sublabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 bg-white max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-center text-red-600 font-bold uppercase tracking-widest text-sm mb-12">
          OUR FILLING STATIONS ACROSS PAKISTAN
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stations.map((station, i) => (
            <div key={i} className="flex flex-col group cursor-pointer">
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-3">
                <img
                  src={station.imagePlaceholder}
                  alt={station.city}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-gray-900 font-bold text-base">{station.city}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <FaMapMarkerAlt size={10} />
                <span>{station.province}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="border border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95">
            VIEW ALL FILLING STATIONS &rarr;
          </button>
        </div>
      </section>

      <section className="bg-[#0B1A28] py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">
              OUR PRODUCTION PLANTS
            </p>
            <h2 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-6">
              Built for Capacity. Engineered for Excellence.
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              State-of-the-art production facilities with advanced technology ensure consistent quality, high purity and uninterrupted supply.
            </p>
            <button className="border border-white/30 text-white hover:bg-white/10 font-bold text-xs uppercase px-8 py-3 inline-flex items-center gap-2 transition-all active:scale-95">
              OUR PLANTS &rarr;
            </button>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plants.map((plant, i) => (
                <div key={i} className="relative h-[300px] lg:h-[350px] w-full rounded-xl overflow-hidden group">
                  <img
                    src={plant.imagePlaceholder}
                    alt={plant.location}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A28]/90 via-[#0B1A28]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 flex flex-col">
                    <span className="text-white font-bold text-xl mb-1">{plant.capacity}</span>
                    <span className="text-gray-300 text-sm">{plant.type}</span>
                    <span className="text-gray-400 text-xs mt-1">{plant.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">
              OXYGEN FILLING STATIONS
            </p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">
              Safe. Precise. Reliable.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Our oxygen filling stations are equipped with advanced filling manifolds, precision controls and safety systems to deliver high purity oxygen for medical and industrial applications.
            </p>
            <ul className="space-y-2 mb-8">
              {oxygenChecklist.map((item, i) => (
                <li key={i} className="flex items-start group">
                  <FaCheck className="text-red-600 mt-0.5 mr-2 flex-shrink-0 group-hover:scale-110 transition-transform" size={12} />
                  <span className="text-gray-800 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95">
              REQUEST SUPPLY &rarr;
            </button>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-md">
              <img src={hero01} alt="Oxygen filling station" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Oxygen station gallery ${i + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </SectionWrap>

      <hr className="border-gray-100 max-w-[1400px] mx-auto" />

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">
              LOGISTICS & DISTRIBUTION
            </p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">
              Strong Fleet. On-Time Delivery.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Our modern fleet of tankers and cylinder delivery vehicles ensures safe and timely delivery of gases to every corner of Pakistan.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {logisticsStats.map((stat, i) => (
                <div key={i} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-center hover:shadow-md hover:border-red-100 transition-all group">
                  <span className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{stat.value}</span>
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="w-full aspect-[4/3] lg:aspect-video rounded-xl overflow-hidden shadow-md">
              <img src={hero02} alt="Logistics fleet" className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 group">
              <img src={img} alt={`Logistics gallery ${i + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </SectionWrap>

      <hr className="border-gray-100 max-w-[1400px] mx-auto" />

      <SectionWrap className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-20 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-3">
              QUALITY ASSURANCE
            </p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight mb-4">
              Quality You Can Trust.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              We follow international standards and strict quality control at every step to ensure safety and reliability.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-3 inline-flex items-center gap-2 transition-all hover:shadow-lg active:scale-95">
              OUR CERTIFICATIONS &rarr;
            </button>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {qualityCerts.map((cert, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-full border-2 ${certColors[cert.color].border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <FaCheckCircle className={certColors[cert.color].text} size={22} />
                  </div>
                  <span className="font-bold text-gray-900 text-xs mb-1">{cert.title}</span>
                  <span className="text-[10px] text-gray-500 leading-tight">{cert.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
