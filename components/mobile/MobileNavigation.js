'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Mail, Settings } from 'lucide-react';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'About', href: '/about', icon: User },
    { label: 'Projects', href: '/projects', icon: Briefcase },
    { label: 'Contact', href: '/contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <>
      {/* Header */}
      <motion.header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen 
            ? 'bg-background/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <motion.span 
              className="text-primary"
              whileTap={{ scale: 0.95 }}
            >
              Nexus
            </motion.span> Web Studio
          </Link>
          
          <motion.button 
            onClick={toggleMenu}
            className="p-2 rounded-xl bg-card border border-border shadow-sm active:scale-95 transition-transform"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-2xl z-50 overflow-hidden"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-6">
                <ul className="space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link 
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary text-primary-foreground shadow-md' 
                              : 'hover:bg-muted active:bg-muted/80'
                          }`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="mr-4"
                          >
                            <item.icon className="h-5 w-5" />
                          </motion.div>
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-muted/30">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">Ready to start?</p>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}