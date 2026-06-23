import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { submitContact } from '../services/api';
import useContent from '../hooks/useContent';

const offices = [
  {
    type: 'Head Office',
    city: 'Multan',
    address: '4-C-II Industrial Estate, Multan Cantt, Sher Shah Town',
    contacts: [
      { label: 'Tel', value: '+92 61 6538206-8' },
      { label: 'Mail', value: 'info@mcl-gases.com' },
    ],
  },
  {
    type: 'Production Office',
    city: 'Faisalabad',
    address: 'Plot A-6, 7, 8, FIEDMC Industrial Estate, Sahianwala, Faisalabad',
    contacts: [
      { label: 'Tel', value: '+92 41 89000111-12' },
      { label: 'Mob', value: '+92 305 5550120' },
      { label: 'Mail', value: 'Salesdept.fsd@mcl-gases.com' },
    ],
  },
  {
    type: 'Regional Office',
    city: 'Islamabad',
    address: 'Plot # 3, Sector D-16, near Dhok Paracha, Islamabad',
    contacts: [
      { label: 'Tel 1', value: '+92 61 6538206-8' },
      { label: 'Tel 2', value: '+92 41 89000111-12' },
      { label: 'Mail', value: 'mcl.gases@gmail.com' },
    ],
  },
  {
    type: 'Regional Office',
    city: 'Lahore',
    address: 'Mehmood Booti Chowk, Tehsil Shalimar, Lahore',
    contacts: [
      { label: 'Tel 1', value: '+92 61 6538206-8' },
      { label: 'Tel 2', value: '+92 41 89000111-12' },
      { label: 'Mail', value: 'mcl.gases@gmail.com' },
    ],
  },
  {
    type: 'Regional Office',
    city: 'Peshawar',
    address: 'Jamil Chowk, Ring Road, Peshawar',
    contacts: [
      { label: 'Tel 1', value: '+92 61 6538206-8' },
      { label: 'Tel 2', value: '+92 41 89000111-12' },
      { label: 'Mail', value: 'mcl.gases@gmail.com' },
    ],
  },
  {
    type: 'Regional Office',
    city: 'Karachi',
    address: 'Plot 13-14, Grax Village, Hoxbay Road, Maripur, Karachi',
    contacts: [
      { label: 'Tel 1', value: '+92 61 6538206-8' },
      { label: 'Tel 2', value: '+92 41 89000111-12' },
      { label: 'Mail', value: 'mcl.gases@gmail.com' },
    ],
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { contentMap } = useContent('contact');

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: 'Address', value: contentMap['address']?.title || 'Multan A-C, Industrial Estate, Multan - Pakistan' },
    { icon: FaPhone, title: 'Phone', value: contentMap['phone']?.title || '061-6510200-6' },
    { icon: FaEnvelope, title: 'Email', value: contentMap['email']?.title || 'info@mcl-gases.com' },
    { icon: FaClock, title: 'Working Hours', value: contentMap['hours']?.title || 'Mon – Sat: 8:00 AM – 6:00 PM' },
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const result = await submitContact(form);

      if (result) {
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="bg-slate-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">GET IN TOUCH</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight">Contact Us</h1>
          <p className="text-gray-300 mt-4 max-w-xl">Have a question, need a quote, or want to discuss a project? Our team is ready to help.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-3">
              <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <FaCheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                  <h3 className="text-green-800 font-bold text-lg mb-1">Message Sent!</h3>
                  <p className="text-green-600 text-sm">Thank you for reaching out. We'll contact you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' }); }}
                    className="mt-6 text-sm text-mclRed font-semibold underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-mclRed rounded px-2 py-1"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5"><span className="text-mclRed">*</span> Full Name</label>
                      <input id="name" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed transition-colors bg-white" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5"><span className="text-mclRed">*</span> Email Address</label>
                      <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed transition-colors bg-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 1234567" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed transition-colors bg-white" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                      <select id="subject" name="subject" value={form.subject} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed transition-colors bg-white text-gray-700">
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Product Quote">Product Quote</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5"><span className="text-mclRed">*</span> Message</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your requirement..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed focus:ring-1 focus:ring-mclRed transition-colors bg-white resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="bg-mclRed hover:bg-red-800 disabled:bg-gray-400 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95 inline-flex items-center gap-2 shadow-md focus:ring-2 focus:ring-red-500 focus:outline-none rounded">
                    <FaPaperPlane /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl mb-2">Contact Information</h2>
              <p className="text-gray-500 text-sm mb-8">Reach us through any of the channels below.</p>
              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-mclRed/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-mclRed" size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-sm mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-mclRed" />
              <p className="text-mclRed font-semibold uppercase tracking-[0.25em] text-xs">Offices</p>
            </div>
            <h2 className="text-gray-900 font-serif text-4xl lg:text-5xl">Six cities. One team.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-200">
            {offices.map((office) => (
              <div key={office.city} className="border-b border-r border-gray-200 p-7 lg:p-9">
                <p className="text-mclRed font-semibold uppercase tracking-[0.2em] text-[11px] mb-3">{office.type}</p>
                <h3 className="text-gray-900 font-serif text-2xl lg:text-3xl mb-4">{office.city}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{office.address}</p>
                <div className="space-y-2">
                  {office.contacts.map((c, i) => (
                    <div key={i} className="flex items-baseline gap-3 text-sm">
                      <span className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold w-12 flex-shrink-0">{c.label}</span>
                      <span className="text-gray-800">{c.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl overflow-hidden shadow-lg border border-gray-200 h-[360px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.731768354844!2d71.5246787!3d30.2714995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b6f5e5c5f5c5f%3A0x5c5f5c5f5c5f5c5f!2sMultan%20Industrial%20Estate!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Multan Chemicals Limited - Head Office"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
