'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "ShopVix delivered our new website on time and exceeded our expectations. Their professionalism and technical skills are unmatched.",
      author: "Amit Sharma",
      role: "Head of Marketing, BharatTech Solutions"
    },
    {
      quote: "The team was proactive and creative throughout our app redesign. We saw a significant boost in user engagement.",
      author: "Priya Mehra",
      role: "Product Manager, HealthEase India"
    },
    {
      quote: "Excellent service and support! Our e-commerce platform is now faster and more reliable than ever.",
      author: "Rohit Verma",
      role: "CTO, ShopKart India"
    },
    {
      quote: "We loved the collaborative approach and attention to detail. Highly recommended for any digital project.",
      author: "Sneha Iyer",
      role: "Founder, EduSpark Academy"
    },
    {
      quote: "Their UI/UX expertise helped us stand out in a crowded market. The results speak for themselves.",
      author: "Vikram Singh",
      role: "CEO, FinEdge Pvt Ltd"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <section ref={ref} className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our clients have to say about working with us.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-8 md:p-12 rounded-xl border shadow-sm min-h-[300px] flex flex-col justify-center"
                  >
                    <div className="flex items-center mb-6">
                      <div>
                        <h3 className="font-bold text-lg">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-lg leading-relaxed text-center">
                      "{testimonial.quote}"
                    </blockquote>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-5 space-x-1 md:space-x-2">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`block w-4 h-0.5 md:w-6 md:h-0.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}