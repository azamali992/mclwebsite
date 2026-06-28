import Seo from '../components/Seo';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We may collect personal information including but not limited to your name, email address, phone number, company name, and message content when you fill out contact forms, subscribe to newsletters, or communicate with us directly.',
    },
    {
      title: 'How We Use Your Information',
      content: 'The information we collect is used to respond to your inquiries, provide requested products and services, send relevant communications about our offerings, improve our website and services, and comply with legal obligations.',
    },
    {
      title: 'Data Protection',
      content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our systems are regularly reviewed and updated to maintain security.',
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist in operating our website and conducting business, provided they agree to keep your information confidential.',
    },
    {
      title: 'Cookies',
      content: 'Our website may use cookies to enhance user experience. You can choose to disable cookies in your browser settings, though this may affect some functionality of the site.',
    },
    {
      title: 'Third-Party Links',
      content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.',
    },
    {
      title: 'Your Rights',
      content: 'You have the right to request access to, correction of, or deletion of your personal data held by us. You may also withdraw consent for communications at any time by contacting us.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We reserve the right to update this privacy policy at any time. Changes will be posted on this page with an updated effective date.',
    },
  ];

  return (
    <div className="pt-24">
      <Seo
        title="Privacy Policy"
        description="How Multan Chemicals Limited collects, uses and protects personal information submitted through contact forms, newsletter sign-ups and direct communication."
        path="/privacy-policy"
      />
      <section className="bg-slate-900 py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">Legal</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight">Privacy Policy</h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm">Last updated: June 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <p className="text-gray-600 text-sm leading-relaxed mb-10">
            Multan Chemicals Limited ("MCL," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-gray-900 font-bold text-xl mb-3">{section.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-gray-900 font-bold text-lg mb-2">Contact Us</h2>
            <p className="text-gray-600 text-sm">
              If you have questions about this Privacy Policy, please contact us at:<br />
              Email: info@mcl-gases.com<br />
              Phone: 061-6510200-6<br />
              Address: 4 C-II, Industrial Estate, Multan - Pakistan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
