import { useState } from 'react';
import {
  FaEnvelope, FaUserTie, FaHandshake, FaCalculator, FaClipboardCheck,
  FaTools, FaUsers, FaTruck, FaChevronDown,
} from 'react-icons/fa';
import useInView from '../hooks/useInView';
import { leadership, departments } from '../data/team';

function SectionWrap({ children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

const departmentIcons = {
  Leadership: FaUserTie,
  Sales: FaHandshake,
  'Accounts & Finance': FaCalculator,
  Audit: FaClipboardCheck,
  'Engineering & Technical': FaTools,
  'Administration & HR': FaUsers,
  Operations: FaTruck,
};

export default function Team() {
  const [activeDept, setActiveDept] = useState(null);

  return (
    <div className="pt-24">
      <section className="bg-slate-900 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Team</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            The People Behind MCL
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Meet the leadership driving four decades of trust in industrial and medical gases, and find the right department to reach.
          </p>
        </div>
      </section>

      <SectionWrap className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Leadership</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Guiding Our Company Forward</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {leadership.map((person, i) => (
              <div
                key={person.name}
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img src={person.image} alt={person.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-gray-900 font-bold text-base">{person.name}</h3>
                  <p className="text-mclRed text-sm font-semibold mt-1">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrap>

      <SectionWrap className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Departments</p>
            <h2 className="text-gray-900 font-extrabold text-3xl lg:text-4xl leading-tight">Find The Right Department</h2>
            <p className="text-gray-500 text-sm mt-3">Click a department to see its team and email contacts.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => {
              const Icon = departmentIcons[dept.name];
              const active = activeDept === dept.name;
              return (
                <button
                  key={dept.name}
                  onClick={() => setActiveDept(active ? null : dept.name)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 focus:ring-2 focus:ring-mclRed focus:outline-none ${
                    active
                      ? 'bg-mclRed text-white shadow-lg shadow-red-900/20'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-mclRed hover:text-mclRed'
                  }`}
                >
                  <Icon size={14} />
                  {dept.name}
                  <FaChevronDown size={10} className={`transition-transform ${active ? 'rotate-180' : ''}`} />
                </button>
              );
            })}
          </div>

          {departments.map((dept) => {
            if (activeDept !== dept.name) return null;
            return (
              <div key={dept.name} className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
                {dept.members.map((m) => (
                  <a
                    key={m.email}
                    href={`mailto:${m.email}`}
                    className="flex items-center justify-between gap-4 p-4 hover:bg-red-50 transition-colors group"
                  >
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.title}</p>
                    </div>
                    <span className="flex items-center gap-2 text-mclRed text-xs font-semibold flex-shrink-0">
                      <FaEnvelope size={12} />
                      <span className="hidden sm:inline">{m.email}</span>
                    </span>
                  </a>
                ))}
              </div>
            );
          })}
        </div>
      </SectionWrap>
    </div>
  );
}
