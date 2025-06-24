'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const process = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by understanding your business goals, target audience, and unique challenges.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Based on our findings, we develop a comprehensive strategy tailored to your specific needs.'
    },
    {
      number: '03',
      title: 'Design & Development',
      description: 'Our team designs and builds your digital solution with a focus on aesthetics and functionality.'
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'We ensure a smooth launch and provide ongoing support to maintain optimal performance.'
    }
  ];
  
  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A streamlined approach to delivering exceptional digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary opacity-20">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 transform translate-x-1/2">
                  <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                    <path d="M0 10H90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <path d="M90 10L80 5V15L90 10Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}