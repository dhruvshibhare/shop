'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Only use custom cursor on desktop
    if (window.innerWidth < 1024) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-transparent border-2 border-primary z-50 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isActive ? 0.8 : 1
        }}
        transition={{ type: 'spring', damping: 10, stiffness: 100, mass: 0.1 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-50 pointer-events-none hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.1 }}
      />
    </>
  );
}