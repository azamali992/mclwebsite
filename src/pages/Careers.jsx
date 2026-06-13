import { useState } from 'react';
import { FaHeartbeat, FaUsers, FaBullseye, FaRocket, FaMapMarkerAlt, FaBriefcase, FaArrowRight, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Job openings data - can be easily replaced with backend API later
const initialJobOpenings = [
  {
    id: 1,
    title: "Senior Gas Engineer",
    department: "Operations",
    location: "Multan, Pakistan",
    type: "Full-time",
    experience: "5+ years",
    description: "Looking for an experienced gas engineer to lead our operations team. Must have expertise in industrial gas systems and safety protocols.",
    responsibilities: [
      "Manage daily operations of gas production facilities",
      "Oversee safety compliance and quality standards",
      "Lead a team of 8-10 technicians",
      "Implement process improvements and efficiency initiatives"
    ],
    requirements: [
      "5+ years experience in gas/chemical industry",
      "Strong leadership skills",
      "Knowledge of ISO and safety standards",
      "Engineering degree or equivalent certification"
    ]
  },
  {
    id: 2,
    title: "Medical Gas Specialist",
    department: "Healthcare Solutions",
    location: "Karachi, Pakistan",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our healthcare solutions team to support medical gas pipeline installations and maintenance across hospitals.",
    responsibilities: [
      "Design and install medical gas pipeline systems",
      "Conduct regular maintenance and safety inspections",
      "Train hospital staff on gas system operations",
      "Troubleshoot and resolve technical issues"
    ],
    requirements: [
      "3+ years in medical gas or healthcare technology",
      "Knowledge of hospital standards and regulations",
      "Technical certification required",
      "Excellent customer service skills"
    ]
  },
  {
    id: 3,
    title: "Sales Executive",
    department: "Sales & Business Development",
    location: "Islamabad, Pakistan",
    type: "Full-time",
    experience: "2+ years",
    description: "Drive sales growth for our industrial and medical gas products across Pakistan. Build and maintain client relationships.",
    responsibilities: [
      "Identify and pursue new business opportunities",
      "Manage relationships with key accounts",
      "Prepare and present sales proposals",
      "Achieve monthly and quarterly sales targets"
    ],
    requirements: [
      "2+ years of B2B sales experience",
      "Strong communication and negotiation skills",
      "Knowledge of industrial/medical gases preferred",
      "Valid driving license"
    ]
  },
  {
    id: 4,
    title: "Quality Assurance Officer",
    department: "Quality & Compliance",
    location: "Multan, Pakistan",
    type: "Full-time",
    experience: "2+ years",
    description: "Ensure our products and services meet the highest quality and safety standards.",
    responsibilities: [
      "Conduct quality inspections and audits",
      "Document and investigate non-conformances",
      "Maintain quality management system",
      "Coordinate with regulatory bodies"
    ],
    requirements: [
      "2+ years in quality assurance",
      "Knowledge of ISO standards",
      "Attention to detail",
      "Certification in QA preferred"
    ]
  }
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
          <div className="flex items-center gap-1">
            <FaBriefcase size={14} /> {job.department}
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt size={14} /> {job.location}
          </div>
          <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">{job.type}</div>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-600 text-sm mb-6">{job.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Responsibilities</h4>
            <ul className="space-y-2">
              {job.responsibilities.slice(0, 2).map((item, i) => (
                <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                  <span className="text-mclRed mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {job.responsibilities.length > 2 && (
                <li className="text-mclRed text-xs font-semibold">+{job.responsibilities.length - 2} more</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Requirements</h4>
            <ul className="space-y-2">
              {job.requirements.slice(0, 2).map((item, i) => (
                <li key={i} className="text-gray-600 text-xs flex items-start gap-2">
                  <span className="text-mclRed mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
              {job.requirements.length > 2 && (
                <li className="text-mclRed text-xs font-semibold">+{job.requirements.length - 2} more</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 font-semibold">Experience: {job.experience}</span>
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
  const [jobs] = useState(initialJobOpenings);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    // In future, this will submit to admin backend
    console.log('Application submitted for:', selectedJob.title);
    alert(`Thank you for applying for ${selectedJob.title}! We'll review your application and get back to you soon.`);
    closeModal();
  };

  const cultureValues = [
    {
      icon: FaHeartbeat,
      title: "Safety First",
      description: "We prioritize the safety and well-being of our employees, customers, and communities. Every decision is guided by our commitment to excellence in safety protocols."
    },
    {
      icon: FaUsers,
      title: "Team Collaboration",
      description: "We believe in the power of teamwork. Our collaborative culture fosters innovation, mutual respect, and shared success across all levels."
    },
    {
      icon: FaBullseye,
      title: "Excellence & Quality",
      description: "We're dedicated to delivering the highest quality products and services. Continuous improvement and attention to detail define our work culture."
    },
    {
      icon: FaRocket,
      title: "Innovation",
      description: "We encourage creative thinking and forward-looking solutions. Our team embraces new technologies and methodologies to stay ahead in the industry."
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Build Your Career</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight mb-4">
            Join Our Growing Team
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover exciting career opportunities and be part of Pakistan's leading chemical and gas solutions company. Grow with us and make an impact.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gray-50 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Our Culture</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why Work at MCL?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Multan Chemicals Limited, we're more than just a company – we're a community of innovators, professionals, and dedicated individuals committed to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, i) => (
              <CultureCard key={i} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>

          {/* Culture Details */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Development</h3>
              <p className="text-gray-600 mb-6">
                We invest in our people. Regular training programs, workshops, and mentorship opportunities help you grow professionally and reach your career goals.
              </p>
              <ul className="space-y-3">
                {[
                  "Continuous learning and skill development",
                  "Leadership training programs",
                  "Industry certifications and courses",
                  "Career advancement opportunities"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-mclRed flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Employee Benefits</h3>
              <p className="text-gray-600 mb-6">
                We care about your well-being. We offer a comprehensive benefits package designed to support you and your family.
              </p>
              <ul className="space-y-3">
                {[
                  "Competitive salary and performance bonuses",
                  "Health and medical insurance",
                  "Paid leave and flexible working",
                  "Team building and social events"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-mclRed flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-3">Opportunities</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Current Job Openings</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're currently hiring for {jobs.length} exciting positions. Check out the roles below and apply today!
            </p>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-mclRed to-red-700 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Send us your resume and let us know your interests. We're always looking for talented individuals to join our team.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white hover:bg-gray-100 text-mclRed px-8 py-3.5 text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 focus:ring-2 focus:ring-white focus:outline-none rounded"
          >
            <FaEnvelope /> Send Your Resume
          </button>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-mclRed to-red-700 p-6 text-white flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
                <p className="text-white/80 text-sm mt-1">{selectedJob.department} • {selectedJob.location}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-2xl font-bold hover:text-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">About this position</h4>
                <p className="text-gray-600 mb-4">{selectedJob.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-mclRed mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3 uppercase text-xs tracking-wide">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((item, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-mclRed mt-1 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Form */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4">Submit Your Application</h4>
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullname" className="block text-xs font-semibold text-gray-700 mb-2">
                        <span className="text-mclRed">*</span> Full Name
                      </label>
                      <input
                        id="fullname"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2">
                        <span className="text-mclRed">*</span> Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+92 300 1234567"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed"
                      />
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-xs font-semibold text-gray-700 mb-2">Years of Experience</label>
                      <input
                        id="experience"
                        type="number"
                        placeholder="e.g., 5"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-2">
                      <span className="text-mclRed">*</span> Cover Letter
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell us why you're a great fit for this role..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed resize-none"
                    />
                  </div>

                  <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-mclRed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-mclRed hover:bg-red-800 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
