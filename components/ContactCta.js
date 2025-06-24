'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ContactCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="bg-muted/50 border rounded-3xl p-10 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your digital presence?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's discuss how we can help you achieve your goals with custom web development and innovative design solutions.
          </p>
          <Link 
            href="/contact"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium inline-flex items-center hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}