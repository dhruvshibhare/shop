'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    package: ''
  });
  
  const [formStatus, setFormStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Place your Google Apps Script Web App URL here
  const GOOGLE_SCRIPT_URL = 'https://sheetdb.io/api/v1/izopzypfwgzkz';

  const pricingPlans = [
    {
      name: 'Static',
      price: '₹5,999',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'Basic SEO',
        '1 year hosting',
      ],
    },
    {
      name: 'Basic',
      price: '₹11,999',
      features: [
        'Up to 10 pages',
        'All Static features',
        'Blog/News section',
        'Google Analytics setup',
        'Priority support',
      ],
    },
    {
      name: 'Ecommerce',
      price: '₹19,999',
      features: [
        'All Basic features',
        'Product catalog',
        'Shopping cart',
        'Payment gateway integration',
        'Order management',
      ],
    },
    {
      name: 'Custom',
      price: 'Contact Us',
      features: [
        'Fully custom solution',
        'Advanced integrations',
        'Custom design & features',
        'Dedicated project manager',
        'Quote on request',
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ data: formData }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          service: '',
          package: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Remove colored blobs for a clean black/white look */}
      </div>
      <main className="flex-1 flex items-center justify-center w-full">
        <div className="container mx-auto px-4 py-16 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s talk about how we can bring your vision to life.
            </p>
          </motion.div>
          {/* Pricing Packages Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
              Choose Your Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.name}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:border-white/40 transition-all duration-300 hover:scale-105"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold text-cyan-400 mb-4">{plan.price}</div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, package: plan.name }))}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      formData.package === plan.name
                        ? 'bg-cyan-400 text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {formData.package === plan.name ? 'Selected' : 'Select Package'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col gap-8 justify-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-black">Contact Information</h2>
              <div className="space-y-6 mb-2">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 text-black rounded-full p-4">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-black">Email</h3>
                    <p className="text-gray-600">hello@shopvix.co</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 text-black rounded-full p-4">
                    <Phone className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-black">Phone</h3>
                    <p className="text-gray-600">+91 9329990175</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-black">Business Hours</h4>
                <p className="text-gray-600">Mon - Fri: 9:00 AM - 7:00 PM</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-black">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-black">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-black">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium text-black">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block mb-2 font-medium text-black">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Development</option>
                    <option value="ecommerce">E-commerce Development</option>
                    <option value="interactive">Interactive Experiences</option>
                    <option value="design">UX/UI Design</option>
                    <option value="performance">Performance Optimization</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="seo">SEO Services</option>
                  </select>
                </div>
                {formData.package && (
                  <div>
                    <label className="block mb-2 font-medium text-black">Selected Package</label>
                    <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-black">
                      <span className="font-semibold">{formData.package}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, package: '' }))}
                        className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-black">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 px-6 bg-black text-white rounded-lg font-semibold shadow-lg hover:bg-gray-900 transition-all disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center"
                  >
                    Thanks for your message! We&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
