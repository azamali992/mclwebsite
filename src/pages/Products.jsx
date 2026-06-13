import { useState } from 'react';
import {
  FaCheck, FaArrowRight, FaBoxOpen, FaWrench, FaHeartbeat, FaMicrochip,
  FaLungs, FaVial, FaFlask, FaLock, FaStethoscope, FaCircle,
  FaLightbulb, FaHospital, FaUsers, FaAward, FaFileAlt, FaPhone,
  FaTint, FaWind, FaRadiation, FaWindowMaximize, FaBed, FaPlug,
  FaSyringe, FaDoorOpen, FaBoxes, FaDesktop, FaToggleOn, FaPills
} from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { useNavigate } from 'react-router-dom';

function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </section>
  );
}

function ProductCard({ icon: Icon, title, description, features }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all cursor-pointer group hover:-translate-y-1"
    >
      <div className="bg-gradient-to-r from-mclRed to-red-700 p-6 text-white flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 ml-4 group-hover:bg-white/30 transition-colors">
          <Icon className="text-white" size={24} />
        </div>
      </div>

      {expanded && features && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Features:</h4>
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-mclRed mt-1 flex-shrink-0" size={12} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-6 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {expanded ? 'Click to collapse' : 'Click to expand'}
        </span>
        <FaArrowRight
          className={`text-mclRed transition-transform ${expanded ? 'rotate-90' : ''}`}
          size={14}
        />
      </div>
    </div>
  );
}

const mgpsProducts = [
  {
    icon: FaTint,
    title: 'Medical Gas Cylinders & Bulk Storage',
    description: 'High-pressure and bulk liquid storage systems',
    features: [
      'Multiple sizes for different hospital needs',
      'Compressed and liquefied gas forms available',
      'High-grade certified materials',
      'Safe and efficient storage solutions',
      'Compatible with all medical gases'
    ]
  },
  {
    icon: FaFlask,
    title: 'Medical Gas Manifolds',
    description: 'Advanced manifold systems for gas distribution',
    features: [
      'NFPA, ISO, and HTM compliant design',
      'Equipped with regulators and valves',
      'Automatic changeover capability',
      'Multiple gas compatibility',
      'Tested for safety and reliability'
    ]
  },
  {
    icon: FaWind,
    title: 'Medical Air Compressor Plants',
    description: 'Integrated compressed air systems',
    features: [
      'Factory-assembled and pre-tested',
      'Pre-piped and pre-wired configuration',
      'Multiple compressor combinations',
      'Suitable for high-demand environments',
      'Efficient centralized hospital supply'
    ]
  },
  {
    icon: FaLungs,
    title: 'Anesthetic Gas Scavenging (AGSS)',
    description: 'Safe waste anesthetic gas removal',
    features: [
      'Protects healthcare professionals',
      'Engineered safety standards',
      'Efficient gas capture and removal',
      'Operating room compliant',
      'Reduces environmental impact'
    ]
  },
  {
    icon: FaVial,
    title: 'Oxygen Generation Plants',
    description: 'On-site oxygen generation systems',
    features: [
      'Independent oxygen supply generation',
      'Reduces cylinder delivery dependency',
      'Continuous availability during peak demand',
      'Cost-effective long-term solution',
      'PSA technology based systems'
    ]
  },
  {
    icon: FaLock,
    title: 'Alarm & Safety Monitoring',
    description: 'Master and area alarm systems',
    features: [
      'Real-time visual and audible alerts',
      'Centralized monitoring capability',
      'Area-specific pressure monitoring',
      'Up to 6 different gas monitoring',
      'Immediate corrective action alerts'
    ]
  }
];

const terminalProducts = [
  {
    icon: FaCircle,
    title: 'Medical Gas Outlets',
    description: 'Safe point-of-use access to medical gases',
    features: [
      'Standardized connections',
      'Quick connect/disconnect capability',
      'Leak-free and secure design',
      'Color-coded for safety',
      'Multiple gas outlet options'
    ]
  },
  {
    icon: FaBed,
    title: 'Bed Head Units (BHUs)',
    description: 'Integrated patient-care systems',
    features: [
      'Combined gas outlets and power sockets',
      'Communication and data ports',
      'Optimized workflow design',
      'Patient bedside installation',
      'Improved accessibility for staff'
    ]
  },
  {
    icon: FaWrench,
    title: 'Zone Valve Boxes',
    description: 'Flexible gas supply control',
    features: [
      'Surface-mounted or flush-mounted',
      'Easy isolation during maintenance',
      'Emergency shut-off capability',
      'Zone-specific control',
      'Durable and reliable construction'
    ]
  }
];

const gasDeliveryProducts = [
  {
    icon: FaToggleOn,
    title: 'Vacuum Regulators',
    description: 'Pressure control for suction systems',
    features: ['Safe suction pressure levels', 'Stable vacuum control', 'Clinical precision', 'Medical procedure compliance']
  },
  {
    icon: FaWind,
    title: 'Air Venturi Systems',
    description: 'Controlled airflow generation',
    features: ['Respiratory therapy support', 'No external power needed', 'Precise air regulation', 'Medical applications']
  },
  {
    icon: FaDesktop,
    title: 'Air Flow Meters',
    description: 'Medical gas flow measurement',
    features: ['Accurate flow rate measurement', 'Precise dosage control', 'Safe patient administration', 'Clinical monitoring']
  },
  {
    icon: FaSyringe,
    title: 'Entonox Delivery Kits',
    description: 'Oxygen-nitrous oxide delivery',
    features: ['Pain management applications', 'Emergency use capability', 'Obstetric procedures', 'Specialized system design']
  },
  {
    icon: FaHeartbeat,
    title: 'Suction Machines',
    description: 'Fluid and secretion removal',
    features: ['Portable and fixed configurations', 'Surgical procedure support', 'Emergency care capability', 'Airway management']
  },
  {
    icon: FaLungs,
    title: 'Oxygen Concentrators',
    description: 'Ambient air oxygen extraction',
    features: ['Medical-grade purity output', 'Cost-effective operation', 'Continuous supply capability', 'Low-resource settings']
  }
];

const modulotProducts = [
  {
    icon: FaBoxOpen,
    title: 'Wall & Ceiling System',
    description: 'Modular structural framework',
    features: [
      'Steel or tempered glass panels',
      'Anti-microbial protective coating',
      'Rounded corners for hygiene',
      'Epoxy-sealed joints',
      'Integrated air duct provisions'
    ]
  },
  {
    icon: FaLightbulb,
    title: 'Surgical Lighting System',
    description: 'High-intensity LED surgical lights',
    features: [
      'Exceeds 1300 Lux illumination',
      'Shadow-free lighting',
      'Adjustable positioning',
      'Precision surgical procedures',
      'Energy-efficient operation'
    ]
  },
  {
    icon: FaPlug,
    title: 'Medical Pendants',
    description: 'Flexible ceiling-mounted systems',
    features: [
      'Medical gas outlets',
      'Electrical power supply',
      'Data and communication ports',
      'Equipment shelves and storage',
      'Adjustable height positioning'
    ]
  },
  {
    icon: FaToggleOn,
    title: 'OT Control Panel',
    description: 'Centralized operation theatre control',
    features: [
      'Medical gas monitoring',
      'HVAC and ventilation control',
      'Lighting system management',
      'Equipment and system alarms',
      'Environmental monitoring'
    ]
  },
  {
    icon: FaShield,
    title: 'Medical Grade Power System',
    description: 'IT power supply for critical environments',
    features: [
      'Medical-grade isolation transformer',
      'Automatic switching system',
      'Insulation monitoring device',
      'Line fault detection',
      'Complete circuit protection'
    ]
  },
  {
    icon: FaRadiation,
    title: 'Anti-Static Flooring',
    description: 'ESD protection for surgical safety',
    features: [
      'Electrostatic discharge prevention',
      'Sensitive equipment protection',
      'Enhanced safety standards',
      'Seamless and easy-to-clean',
      'Durable surgical-grade material'
    ]
  },
  {
    icon: FaBed,
    title: 'Operating Table',
    description: 'Multi-specialty surgical platform',
    features: [
      'Adjustable positioning',
      'High stability and load-bearing',
      'Ergonomic surgical design',
      'Multi-specialty compatibility',
      'Modular system integration'
    ]
  },
  {
    icon: FaWind,
    title: 'Laminar Air Flow',
    description: 'Ultra-clean air filtration system',
    features: [
      'Unidirectional airflow pattern',
      'HEPA filtration technology',
      'Airborne contamination control',
      'Reduced infection risk',
      'International compliance standards'
    ]
  },
  {
    icon: FaDoorOpen,
    title: 'Automatic Sliding Door',
    description: 'Touch-free access system',
    features: [
      'Hands-free operation',
      'Airtight sealing',
      'Silent and reliable performance',
      'High-traffic durability',
      'Infection control maintenance'
    ]
  },
  {
    icon: FaBoxes,
    title: 'Medical Cabinets',
    description: 'Hygienic surgical supply storage',
    features: [
      'Easy-to-clean surfaces',
      'Optimized instrument storage',
      'Corrosion-resistant construction',
      'Seamless integration',
      'Improved operational efficiency'
    ]
  },
  {
    icon: FaDesktop,
    title: 'X-Ray Viewer',
    description: 'Radiographic image visualization',
    features: [
      'High-brightness illumination',
      'Uniform light distribution',
      'Slim space-efficient design',
      'Energy-efficient operation',
      'Surgical environment suitable'
    ]
  },
  {
    icon: FaWrench,
    title: 'Sub Structure',
    description: 'Modular OT foundation system',
    features: [
      'High-strength structural framework',
      'Utility integration support',
      'Long-term durability',
      'Future modification capability',
      'Precise component alignment'
    ]
  }
];

const diagnosticProducts = [
  {
    icon: FaMicrochip,
    title: 'Ultrasound (USG) Systems',
    description: 'High-performance diagnostic imaging',
    features: [
      'High-resolution real-time imaging',
      'Advanced Doppler capabilities',
      'Portable and cart-based configs',
      'User-friendly clinical interface',
      'Reliable high-demand operation'
    ]
  },
  {
    icon: FaRadiation,
    title: 'X-Ray Systems',
    description: 'Digital radiography solutions',
    features: [
      'High-resolution digital output',
      'Reduced radiation exposure',
      'Rapid image acquisition',
      'PACS-ready integration',
      'Continuous clinical usage design'
    ]
  },
  {
    icon: FaCircle,
    title: 'C-Arm Systems',
    description: 'Real-time fluoroscopic imaging',
    features: [
      'Dynamic intraoperative imaging',
      'High-quality fluoroscopy',
      'Compact mobile design',
      'Surgical team positioning',
      'Modern surgical workflow compatible'
    ]
  }
];

const criticalCareProducts = [
  {
    icon: FaStethoscope,
    title: 'Anesthesia Workstation',
    description: 'Integrated anesthesia delivery system',
    features: [
      'Integrated heated breathing circuit',
      'Advanced ventilation modes',
      'Precise gas delivery and monitoring',
      'Multi-patient category support',
      'High-reliability surgical system'
    ]
  },
  {
    icon: FaHeartbeat,
    title: 'Multi-Parameter Patient Monitor',
    description: 'Continuous critical care monitoring',
    features: [
      '12.1" and 15" display options',
      'Multi-parameter ICU/NICU monitoring',
      '12-lead ECG acquisition',
      'ST segment and arrhythmia mapping',
      'Scalable clinical requirements'
    ]
  },
  {
    icon: FaLungs,
    title: 'ICU Medical Ventilator',
    description: 'Microprocessor-controlled life support',
    features: [
      'Invasive and non-invasive modes',
      'Neonatal to adult patient support',
      'Microprocessor precision control',
      'Advanced respiratory monitoring',
      'Transport-critical applications'
    ]
  },
  {
    icon: FaFileAlt,
    title: '12-Channel ECG System',
    description: 'Comprehensive cardiac diagnosis',
    features: [
      '8" high-resolution touch interface',
      '12-channel simultaneous recording',
      'Glasgow interpretation algorithm',
      'ST segment ischemia detection',
      '10-hour battery backup'
    ]
  }
];

const therapeuticProducts = [
  {
    icon: FaPills,
    title: 'Medical UV Phototherapy Cabin',
    description: 'Dermatological UV treatment system',
    features: [
      'High-intensity UV treatment booth',
      'UVA and Narrowband UVB support',
      'Vitiligo, psoriasis, eczema treatment',
      'Uniform radiation distribution',
      'Safety-controlled exposure system'
    ]
  }
];

export default function Products() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('mgps');

  const categories = [
    { id: 'mgps', label: 'Medical Gas Pipelines', icon: FaTint },
    { id: 'terminals', label: 'Terminal Units', icon: FaCircle },
    { id: 'delivery', label: 'Gas Delivery', icon: FaWind },
    { id: 'modular', label: 'Modular OT', icon: FaHospital },
    { id: 'diagnostic', label: 'Diagnostic Systems', icon: FaMicrochip },
    { id: 'critical', label: 'Critical Care', icon: FaHeartbeat },
    { id: 'therapeutic', label: 'Therapeutic', icon: FaPills }
  ];

  const getCategoryProducts = () => {
    switch (activeCategory) {
      case 'mgps':
        return mgpsProducts;
      case 'terminals':
        return terminalProducts;
      case 'delivery':
        return gasDeliveryProducts;
      case 'modular':
        return modulotProducts;
      case 'diagnostic':
        return diagnosticProducts;
      case 'critical':
        return criticalCareProducts;
      case 'therapeutic':
        return therapeuticProducts;
      default:
        return mgpsProducts;
    }
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Products & Solutions</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Advanced Healthcare Equipment & Systems
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Multan Chemicals Limited provides comprehensive healthcare solutions including Medical Gas Pipeline Systems, Modular Operation Theatres, diagnostic imaging, critical care systems, and specialized therapeutic equipment.
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <SectionWrap className="py-16 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">Product Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-4 rounded-lg font-semibold text-sm transition-all flex flex-col items-center gap-2 focus:ring-2 focus:ring-mclRed focus:outline-none ${
                    activeCategory === cat.id
                      ? 'bg-mclRed text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-mclRed'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs line-clamp-2">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      {/* Products Grid */}
      <SectionWrap className="py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCategoryProducts().map((product, i) => (
              <ProductCard key={i} {...product} />
            ))}
          </div>
        </div>
      </SectionWrap>

      {/* Features & Benefits */}
      <SectionWrap className="py-20 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-white text-3xl font-bold mb-12 text-center">Why Choose MCL Products?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaAward, title: 'International Standards', desc: 'HTM, NFPA, ISO compliant systems' },
              { icon: FaLock, title: 'Safety First', desc: 'Maximum protection for patients and staff' },
              { icon: FaUsers, title: 'Expert Support', desc: '24/7 technical support and maintenance' },
              { icon: FaFileAlt, title: 'Quality Assured', desc: 'Certified materials and rigorous testing' }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrap>

      {/* CTA Section */}
      <SectionWrap className="py-16 bg-white px-4 sm:px-8 lg:px-12 border-t-4 border-mclRed">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Healthcare Solutions?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our team for customized healthcare equipment and system consultations tailored to your facility needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none rounded"
            >
              <FaPhone /> Contact Us
            </button>
            <button
              onClick={() => navigate('/careers')}
              className="border-2 border-mclRed text-mclRed hover:bg-mclRed hover:text-white px-8 py-3.5 font-bold uppercase tracking-wider transition-all focus:ring-2 focus:ring-mclRed focus:outline-none rounded"
            >
              Join Our Team
            </button>
          </div>
        </div>
      </SectionWrap>

      {/* Compliance Section */}
      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Standards & Compliance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              'HTM 02-01 Medical Gas Pipelines',
              'NFPA 99 Healthcare Facilities Code',
              'ISO 7396-1 Medical Gas Systems',
              'ISO 9001:2015 Quality Management',
              'ISO 13485 Medical Devices QMS'
            ].map((cert, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-mclRed transition-all text-center">
                <FaCheck className="text-mclRed mx-auto mb-3" size={32} />
                <p className="font-semibold text-gray-900 text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>
    </div>
  );
}
