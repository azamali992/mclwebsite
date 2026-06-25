import {
  FaUserTie, FaUsers, FaIndustry, FaCalculator, FaChartLine,
  FaClipboardList, FaPlusCircle, FaUserShield, FaGlobe, FaCog,
} from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { leadership } from '../data/team';

function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`transition-[opacity,transform] duration-500 ease-out ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}>
      {children}
    </section>
  );
}

// Real names stay in sync with the data; everyone below the named executives
// is shown by post title only.
const chairman = leadership.find((p) => p.title === 'Chairman');
const directors = leadership.filter((p) => p.title === 'Director');
const cfo = leadership.find((p) => p.title === 'Chief Financial Officer');
const gmSales = leadership.find((p) => p.title === 'GM Sales');

const columns = [
  {
    title: 'Production Head',
    icon: FaIndustry,
    posts: ['Plant Manager', 'Production Manager', 'Electrical Manager', 'Mechanical Manager', 'Shift Incharge', 'Process Engineer', 'HSE Manager', 'Maintenance Manager', 'Technical Executive'],
  },
  {
    title: 'Chief Financial Officer (CFO)',
    icon: FaCalculator,
    lead: cfo?.name,
    posts: ['Finance Manager', 'Accounts Manager', 'Taxation Officer', 'Costing Officer', 'Internal Audit Officer', 'Treasury Officer', 'Budget & MIS Officer'],
  },
  {
    title: 'GM Sales',
    icon: FaChartLine,
    lead: gmSales?.name,
    posts: ['Sales Manager - Industrial Gases', 'Sales Manager - Medical Gases', 'Regional Sales Managers', 'Sales Officers - Industrial Gases', 'Sales Officers - Medical Gases', 'Customer Support Executive'],
  },
  {
    title: 'Manager Human Resources',
    icon: FaUsers,
    posts: ['HR Executive', 'Recruitment Officer', 'Training & Development Officer', 'Payroll Officer', 'Compensation & Benefits Officer', 'HR Admin Officer'],
  },
  {
    title: 'Manager Administration',
    icon: FaClipboardList,
    posts: ['Admin Officer', 'Facilities Officer', 'Security Officer', 'Transport Officer', 'Purchase Officer', 'Store Officer', 'Front Desk Officer'],
  },
  {
    title: 'HOD MGPL',
    icon: FaPlusCircle,
    posts: ['Project Manager', 'Design Engineer', 'Biomedical Engineer', 'Site Engineer', 'Service Engineer', 'QA/QC Engineer', 'Draftsman / Technician'],
  },
];

const stats = [
  { icon: FaUserTie, value: '1', label: 'Chairman' },
  { icon: FaUsers, value: '3', label: 'Directors' },
  { icon: FaUserShield, value: '7', label: 'Senior Leadership Positions' },
  { icon: FaCog, value: '50+', label: 'Professionals & Engineers' },
  { icon: FaGlobe, value: 'Strong Team', label: 'Driving Excellence Across Pakistan' },
  { icon: FaUsers, value: '+1', label: 'One Team, United Goal' },
];

const VLine = () => <span className="hidden h-8 w-px bg-accent/40 xl:block" />;

function NodeBox({ children, className = '' }) {
  return (
    <div className={`rounded-xl bg-accent px-6 py-4 text-center text-white shadow-[var(--shadow-accent)] ${className}`}>
      {children}
    </div>
  );
}

export default function Team() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-ink-deep px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
            <FaUsers size={20} />
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Our leadership structure</h1>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-on-ink-accent">
            Strong leadership. Proven expertise. Sustainable future.
          </p>
        </div>
      </section>

      {/* Org chart */}
      <SectionWrap className="bg-surface px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center">
          {/* Chairman */}
          <NodeBox className="w-full max-w-xs">
            <span className="mb-1 flex items-center justify-center gap-2">
              <FaUserTie size={16} />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">Chairman</span>
            </span>
            <p className="text-lg font-semibold leading-tight">{chairman?.name || 'Chairman'}</p>
          </NodeBox>

          <VLine />

          {/* Directors */}
          <NodeBox className="w-full max-w-sm">
            <span className="mb-2 flex items-center justify-center gap-2">
              <FaUsers size={16} />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">Directors</span>
            </span>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {directors.map((d) => (
                <p key={d.name} className="text-sm font-semibold leading-tight">{d.name}</p>
              ))}
            </div>
          </NodeBox>

          <VLine />

          {/* Branch bus + columns */}
          <div className="relative w-full">
            <div className="absolute left-[8.333%] right-[8.333%] top-0 hidden h-px bg-accent/40 xl:block" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {columns.map((col) => {
                const Icon = col.icon;
                return (
                  <div key={col.title} className="flex flex-col">
                    <span className="mx-auto hidden h-6 w-px bg-accent/40 xl:block" />
                    {/* Head */}
                    <div className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-t-xl bg-accent px-4 py-4 text-center text-white">
                      <Icon size={18} />
                      <p className="text-sm font-semibold leading-tight">{col.title}</p>
                      {col.lead && <p className="text-xs text-white/80">{col.lead}</p>}
                    </div>
                    {/* Posts */}
                    <ul className="flex-1 space-y-2.5 rounded-b-xl border border-t-0 border-line bg-canvas p-5">
                      {col.posts.map((post) => (
                        <li key={post} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                          {post}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* Stats strip */}
      <SectionWrap className="bg-canvas px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex flex-col items-center gap-2 bg-canvas px-5 py-7 text-center">
                <Icon size={22} className="text-accent" />
                <p className="font-mono text-2xl font-medium leading-none text-ink">{s.value}</p>
                <p className="text-xs font-medium leading-tight text-muted">{s.label}</p>
              </div>
            );
          })}
        </div>
      </SectionWrap>
    </div>
  );
}
