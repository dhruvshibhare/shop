'use client';

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const plans = [
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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-zinc-900 to-black py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-white drop-shadow-[0_2px_24px_rgba(0,255,255,0.25)]">
          Our Pricing Plans
        </h1>
        <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your business needs. All plans include responsive design, fast delivery, and ongoing support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className="relative bg-white/5 border border-cyan-400/20 rounded-2xl shadow-xl flex flex-col items-center p-8 backdrop-blur-lg transition-transform duration-300 hover:scale-105 hover:border-cyan-400 group"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0,255,255,0.10)',
              }}
            >
              {/* Neon Glow Accent */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyan-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition" />
              <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
              <div className="text-3xl font-extrabold text-cyan-400 mb-4 drop-shadow-[0_2px_12px_rgba(0,255,255,0.25)]">{plan.price}</div>
              <ul className="mb-8 text-zinc-300 space-y-2 text-center">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href="/contact#form"
                  className="inline-block w-full px-6 py-3 bg-cyan-400 text-black rounded-lg font-semibold text-center hover:bg-cyan-300 transition-colors shadow"
                >
                  Get Started
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?phone=919329990175&text=${encodeURIComponent(`Hi, I want to get started with the ${plan.name} plan!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#20BA5A] transition-colors shadow"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 