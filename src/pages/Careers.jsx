import { useState, useEffect } from 'react';
import { FaHeartbeat, FaUsers, FaBullseye, FaRocket, FaMapMarkerAlt, FaBriefcase, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchCareers } from '../services/api';
import useContent from '../hooks/useContent';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const defaultJobs = [
  {
    id: 1, title: 'Senior Gas Engineer', department: 'Operations', location: 'Multan, Pakistan',
    type: 'Full-time', experience: '5+ years',
    description: 'Looking for an experienced gas engineer to lead our operations team. Must have expertise in industrial gas systems and safety protocols.',
    responsibilities: ['Manage daily operations of gas production facilities', 'Oversee safety compliance and quality standards', 'Lead a team of 8-10 technicians', 'Implement process improvements and efficiency initiatives'],
    requirements: ['5+ years experience in gas/chemical industry', 'Strong leadership skills', 'Knowledge of ISO and safety standards', 'Engineering degree or equivalent certification'],
  },
  {
    id: 2, title: 'Medical Gas Specialist', department: 'Healthcare Solutions', location: 'Karachi, Pakistan',
    type: 'Full-time', experience: '3+ years',
    description: 'Join our healthcare solutions team to support medical gas pipeline installations and maintenance across hospitals.',
    responsibilities: ['Design and install medical gas pipeline systems', 'Conduct regular maintenance and safety inspections', 'Train hospital staff on gas system operations', 'Troubleshoot and resolve technical issues'],
    requirements: ['3+ years in medical gas or healthcare technology', 'Knowledge of hospital standards and regulations', 'Technical certification required', 'Excellent customer service skills'],
  },
  {
    id: 3, title: 'Sales Executive', department: 'Sales & Business Development', location: 'Islamabad, Pakistan',
    type: 'Full-time', experience: '2+ years',
    description: 'Drive sales growth for our industrial and medical gas products across Pakistan. Build and maintain client relationships.',
    responsibilities: ['Identify and pursue new business opportunities', 'Manage relationships with key accounts', 'Prepare and present sales proposals', 'Achieve monthly and quarterly sales targets'],
    requirements: ['2+ years of B2B sales experience', 'Strong communication and negotiation skills', 'Knowledge of industrial/medical gases preferred', 'Valid driving license'],
  },
  {
    id: 4, title: 'Quality Assurance Officer', department: 'Quality & Compliance', location: 'Multan, Pakistan',
    type: 'Full-time', experience: '2+ years',
    description: 'Ensure our products and services meet the highest quality and safety standards.',
    responsibilities: ['Conduct quality inspections and audits', 'Document and investigate non-conformances', 'Maintain quality management system', 'Coordinate with regulatory bodies'],
    requirements: ['2+ years in quality assurance', 'Knowledge of ISO standards', 'Attention to detail', 'Certification in QA preferred'],
  },
];

function CultureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="w-14 h-14 rounded-full bg-mclRed/10 flex items-center justify-center mb-4">
        <Icon className="text-mclRed" size={28} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
      <div className="bg-gradient-to-r from-mclRed to-red-700 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          <div className="flex items-center gap-1"><FaBriefcase size={14} /> {job.department}</div>
          <div className="flex items-center gap-1"><FaMapMarkerAlt size={14} /> {job.location}</div>
          <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">{job.type}</div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-6">{job.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Responsibilities</h4>
            <ul className="space-y-2">
              {(job.responsibilities || []).slice(0, 2).map((item, i) => (
                <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                  <span className="text-mclRed mt-1">•</span><span>{item}</span>
                </li>
              ))}
              {(job.responsibilities || []).length > 2 && (
                <li className="text-mclRed text-xs font-semibold">+{(job.responsibilities || []).length - 2} more</li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Requirements</h4>
            <ul className="space-y-2">
              {(job.requirements || []).slice(0, 2).map((item, i) => (
                <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                  <span className="text-mclRed mt-1">•</span><span>{item}</span>
                </li>
              ))}
              {(job.requirements || []).length > 2 && (
                <li className="text-mclRed text-xs font-semibold">+{(job.requirements || []).length - 2} more</li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-semibold">Experience: {job.experience || 'N/A'}</span>
          <button
            onClick={() => onApply(job)}
            className="bg-mclRed hover:bg-red-800 text-white px-6 py-2 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 focus:ring-2 focus:ring-red-500 focus:outline-none rounded"
          >
            Apply Now <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Careers() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(defaultJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyError, setApplyError] = useState('');
  const [applied, setApplied] = useState(false);
  const { contentMap } = useContent('careers');

  useEffect(() => {
    fetchCareers()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data.map((c, i) => ({
            id: c._id || i + 1,
            title: c.position,
            department: c.department || '',
            location: c.location || '',
            type: c.type || 'Full-time',
            experience: c.salary || 'N/A',
            description: c.description || '',
            responsibilities: c.responsibilities || [],
            requirements: c.requirements || [],
          })));
        }
      })
      .catch(() => {});
  }, []);

  const [form, setForm] = useState({ fullname: '', email: '', phone: '', experience: '', message: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const isRealJobId = (id) => /^[0-9a-fA-F]{24}$/.test(String(id));

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setApplied(false);
    setApplyError('');
    setForm({ fullname: '', email: '', phone: '', experience: '', message: '' });
    setResumeFile(null);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setApplied(false);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (!isRealJobId(selectedJob.id)) {
      setApplyError('Applications for this listing are not open yet. Please check back soon or contact us directly.');
      return;
    }

    setLoading(true);
    setApplyError('');

    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob.id);
      formData.append('fullname', form.fullname);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('experience', form.experience);
      formData.append('message', form.message);
      if (resumeFile) formData.append('resume', resumeFile);

      const res = await fetch(`${API_URL}/api/careers/apply`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setApplied(true);
        setTimeout(() => closeModal(), 2000);
      } else {
        const data = await res.json();
        setApplyError(data.message || 'Failed to submit application');
      }
    } catch {
      setApplyError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cultureValues = [
    { icon: FaHeartbeat, title: 'Safety First', description: 'We prioritize the safety and well-being of our employees, customers, and communities.' },
    { icon: FaUsers, title: 'Team Collaboration', description: 'Our collaborative culture fosters innovation, mutual respect, and shared success.' },
    { icon: FaBullseye, title: 'Excellence & Quality', description: 'Continuous improvement and attention to detail define our work culture.' },
    { icon: FaRocket, title: 'Innovation', description: 'We embrace new technologies and methodologies to stay ahead in the industry.' },
  ];

  const heroTitle = contentMap['hero-title']?.title || 'Join Our Growing Team';
  const heroDesc = contentMap['hero-description']?.title || 'Discover exciting career opportunities and be part of Pakistan\'s leading chemical and gas solutions company.';

  return (
    <div className="pt-24">
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Build Your Career</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">{heroTitle}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{heroDesc}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Culture</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Work at MCL?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">At Multan Chemicals Limited, we're more than just a company – we're a community of innovators, professionals, and dedicated individuals committed to excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, i) => (
              <CultureCard key={i} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Development</h3>
              <p className="text-gray-600 mb-6">We invest in our people. Regular training programs, workshops, and mentorship opportunities help you grow professionally.</p>
              <ul className="space-y-3">
                {['Continuous learning and skill development', 'Leadership training programs', 'Industry certifications and courses', 'Career advancement opportunities'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-mclRed flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Employee Benefits</h3>
              <p className="text-gray-600 mb-6">We care about your well-being. We offer a comprehensive benefits package designed to support you and your family.</p>
              <ul className="space-y-3">
                {['Competitive salary and performance bonuses', 'Health and medical insurance', 'Paid leave and flexible working', 'Team building and social events'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-mclRed flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Opportunities</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Current Job Openings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're currently hiring for {jobs.length} exciting positions. Check out the roles below and apply today!</p>
          </div>
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={handleApplyClick} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg">No job openings at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">Send us your resume and let us know your interests. We're always looking for talented individuals.</p>
          <button onClick={() => navigate('/contact')} className="bg-white hover:bg-gray-100 text-mclRed px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 focus:ring-2 focus:ring-white focus:outline-none rounded">
            <FaEnvelope /> Send Your Resume
          </button>
        </div>
      </section>

      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-mclRed to-red-700 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <p className="text-white/80 text-sm mt-1">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button onClick={closeModal} className="text-2xl font-bold hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded" aria-label="Close modal">×</button>
            </div>
            <div className="p-6">
              {applied ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <h3 className="text-green-800 font-bold text-lg mb-1">Application Submitted!</h3>
                  <p className="text-green-600 text-sm">Thank you for applying. We'll review your application.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">About this position</h4>
                    <p className="text-gray-600 mb-4">{selectedJob.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {(selectedJob.responsibilities || []).map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-mclRed mt-1 flex-shrink-0">✓</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Requirements</h4>
                      <ul className="space-y-2">
                        {(selectedJob.requirements || []).map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-mclRed mt-1 flex-shrink-0">✓</span><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-900 mb-4">Submit Your Application</h4>
                    {applyError && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"><p className="text-red-700 text-sm">{applyError}</p></div>}
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullname" className="block text-xs font-semibold text-gray-700 mb-2"><span className="text-mclRed">*</span> Full Name</label>
                          <input id="fullname" type="text" required value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2"><span className="text-mclRed">*</span> Email</label>
                          <input id="email" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-2">Phone</label>
                          <input id="phone" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+92 300 1234567" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed" />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-xs font-semibold text-gray-700 mb-2">Years of Experience</label>
                          <input id="experience" type="number" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} placeholder="e.g., 5" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-2"><span className="text-mclRed">*</span> Cover Letter</label>
                        <textarea id="message" required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us why you're a great fit..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed resize-none" />
                      </div>
                      <div>
                        <label htmlFor="resume" className="block text-xs font-semibold text-gray-700 mb-2">Resume / CV (PDF or Word, max 5MB)</label>
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={e => setResumeFile(e.target.files?.[0] || null)}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 file:text-xs"
                        />
                      </div>
                      <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                        <button type="button" onClick={closeModal} className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-mclRed">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-mclRed hover:bg-red-800 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">{loading ? 'Submitting...' : 'Submit Application'}</button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
