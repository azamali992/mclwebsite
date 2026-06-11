import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      {/* Hero strip */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">GET IN TOUCH</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight">Contact Us</h1>
          <p className="text-gray-300 mt-4 max-w-xl">
            Have a question, need a quote, or want to discuss a project? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Left – form */}
            <div className="lg:col-span-3">
              <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <FaCheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                  <h3 className="text-green-800 font-bold text-lg mb-1">Message Sent!</h3>
                  <p className="text-green-600 text-sm">Thank you for reaching out. We'll contact you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    className="mt-6 text-sm text-mclRed font-semibold underline hover:no-underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed transition-colors bg-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                      <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed transition-colors bg-white text-gray-500">
                        <option>General Inquiry</option>
                        <option>Product Quote</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your requirement..."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-mclRed transition-colors bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-mclRed hover:bg-red-800 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95 inline-flex items-center gap-2 shadow-md"
                  >
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Right – contact info */}
            <div className="lg:col-span-2">
              <h2 className="text-gray-900 font-extrabold text-2xl lg:text-3xl mb-2">Contact Information</h2>
              <p className="text-gray-500 text-sm mb-8">Reach us through any of the channels below.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mclRed/10 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-mclRed" size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Address</h4>
                    <p className="text-gray-500 text-sm mt-0.5">Multan A-C, Industrial Estate, Multan - Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mclRed/10 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-mclRed" size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Phone</h4>
                    <p className="text-gray-500 text-sm mt-0.5">061-6510200-6</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mclRed/10 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-mclRed" size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Email</h4>
                    <p className="text-gray-500 text-sm mt-0.5">info@mcl-gases.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mclRed/10 flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-mclRed" size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Working Hours</h4>
                    <p className="text-gray-500 text-sm mt-0.5">Mon – Sat: 8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
