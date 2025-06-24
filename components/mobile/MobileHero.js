'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Code2 } from 'lucide-react';

export default function MobileHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const floatingIcons = [
    { Icon: Code2, color: 'text-blue-500', delay: 0 },
    { Icon: Sparkles, color: 'text-purple-500', delay: 0.5 },
    { Icon: Zap, color: 'text-yellow-500', delay: 1 }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAPress = () => {
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{ 
              y: [null, -20, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Floating Icon Animation */}
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                {floatingIcons.map((item, index) => (
                  index === currentIcon && (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl bg-card border-2 border-border flex items-center justify-center shadow-lg ${item.color}`}
                    >
                      <item.Icon className="w-8 h-8" />
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Main Heading with Staggered Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="block"
              >
                Digital
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="block text-muted-foreground"
              >
                Experiences
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="block text-primary"
              >
                Reimagined
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            We craft innovative web solutions that push boundaries and create lasting impressions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col gap-4 max-w-xs mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link 
                href="/contact"
                onClick={handleCTAPress}
                className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 active:shadow-md"
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  Start Project
                </motion.span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                href="/projects" 
                className="w-full px-8 py-4 bg-card border-2 border-border text-foreground rounded-2xl font-semibold hover:bg-muted/50 transition-all duration-300 active:bg-muted"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}