export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using this website, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our website or services.',
    },
    {
      title: 'Product & Service Information',
      content: 'We strive to provide accurate product descriptions, specifications, and pricing information. However, we do not warrant that product descriptions or other content on this site are complete, reliable, current, or error-free. All products and services are subject to availability.',
    },
    {
      title: 'Orders & Contracts',
      content: 'No contract for the supply of gases, equipment, or services shall exist between you and MCL until your order has been acknowledged and accepted by us in writing. We reserve the right to refuse any order.',
    },
    {
      title: 'Cylinder Ownership & Safety',
      content: 'All gas cylinders remain the property of Multan Chemicals Limited unless otherwise agreed in writing. Customers are responsible for the safe handling, storage, and use of cylinders in accordance with all applicable safety regulations and laws.',
    },
    {
      title: 'Intellectual Property',
      content: 'All content on this website — including text, graphics, logos, images, and software — is the property of Multan Chemicals Limited and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.',
    },
    {
      title: 'Limitation of Liability',
      content: 'MCL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of this website or our products and services.',
    },
    {
      title: 'Safety Compliance',
      content: 'Users of our products must comply with all applicable safety regulations, including those set by the Explosives Department of Pakistan and relevant international standards. MCL accepts no liability for misuse or non-compliance.',
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms and Conditions at any time. Changes become effective immediately upon posting. Continued use of the website after changes constitutes acceptance of the modified terms.',
    },
  ];

  return (
    <div className="pt-24">
      <section className="bg-slate-900 py-16 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-mclRed font-bold uppercase tracking-widest text-sm mb-2">Legal</p>
          <h1 className="text-white font-extrabold text-4xl lg:text-5xl leading-tight">Terms & Conditions</h1>
          <p className="text-gray-300 mt-4 max-w-xl text-sm">Last updated: June 2026</p>
        </div>
      </section>
      <section className="py-16 bg-white px-4 sm:px-8 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <p className="text-gray-600 text-sm leading-relaxed mb-10">
            Welcome to the Multan Chemicals Limited website. These Terms and Conditions govern your use of our website and the purchase of our products and services. By using this site, you agree to these terms.
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
            <h2 className="text-gray-900 font-bold text-lg mb-2">Contact Information</h2>
            <p className="text-gray-600 text-sm">
              For questions about these Terms & Conditions, please contact us:<br />
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
