import { Link } from 'react-router-dom';
import { FaIndustry, FaMedkit, FaNetworkWired, FaHeartbeat, FaAtom, FaFire, FaArrowRight } from 'react-icons/fa';
import useContent from '../hooks/useContent';
import useInView from '../hooks/useInView';
import cylinderYard from '../assets/infra02.JPG';
import mgpsWard from '../assets/products/mgps-ward-hero.jpeg';
import mgpsEquipment from '../assets/products/medical-gas-manifolds.jpeg';
import modularOtPhoto from '../assets/products/modular-ot-hero.jpeg';
import specialtyPlant from '../assets/main125tdplant.png';
import lpgTruck from '../assets/trucks1.JPG';

function DivisionCard({ div, index }) {
  const [ref, inView] = useInView();
  const Icon = div.icon;

  return (
    <Link
      to={div.link}
      ref={ref}
      style={{ animationDelay: `${index * 70}ms` }}
      className={`group relative flex flex-col overflow-hidden rounded-lg border border-line bg-canvas transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lg)] ${
        inView ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={div.img}
          alt={div.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101b]/55 to-transparent" />
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white/15 text-white backdrop-blur-sm">
          <Icon size={14} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
          {div.title}
        </h3>
        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted line-clamp-3">
          {div.desc}
        </p>
        <span aria-hidden="true" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
          Explore
          <FaArrowRight size={10} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

const defaultDivisions = [
  { id: 1, icon: FaIndustry, img: cylinderYard, link: '/gases#industrial' },
  { id: 2, icon: FaMedkit, img: mgpsWard, link: '/gases#medical' },
  { id: 3, icon: FaNetworkWired, img: mgpsEquipment, link: '/mgps-solutions' },
  { id: 4, icon: FaHeartbeat, img: modularOtPhoto, link: '/modular-ot' },
  { id: 5, icon: FaAtom, img: specialtyPlant, link: '/gases#specialty' },
  { id: 6, icon: FaFire, img: lpgTruck, link: '/gases#lpg' },
];

export default function BusinessDivisions() {
  const { contentMap } = useContent('divisions');

  const divisions = defaultDivisions.map((d, i) => {
    const c = contentMap[`div-${d.id}`];
    return {
      ...d,
      title: c?.title || ['Industrial Gases', 'Medical Gases', 'MGPS Solutions', 'Biomedical Engineering', 'Specialty Gases', 'LPG Division'][i],
      desc: c?.description || ['Complete range of industrial gases for diverse applications across industries.', 'High-purity medical gases ensuring safety, reliability and patient care.', 'Design, supply, installation and maintenance of Medical Gas Pipeline Systems.', 'Modular OT, hospital infrastructure and biomedical engineering solutions.', 'Special and calibration gases for research, laboratories and precision applications.', 'Safe, efficient and reliable LPG supply for domestic and commercial needs.'][i],
    };
  });

  return (
    <section id="business-divisions" className="bg-surface px-6 py-24 sm:px-8 lg:px-12 scroll-mt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow mb-4">What we do</p>
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.75rem] md:leading-[1.08]">
            Six divisions. One standard of reliability.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {divisions.map((div, index) => (
            <DivisionCard key={div.id} div={div} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
