'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, GripHorizontal } from 'lucide-react';

export default function BottomSheet({ 
  isOpen, 
  onClose, 
  children, 
  title,
  snapPoints = [0.3, 0.6, 0.9],
  initialSnap = 0.6 
}) {
  const [currentSnap, setCurrentSnap] = useState(initialSnap);
  const [isDragging, setIsDragging] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    // Update window height on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    const velocity = info.velocity.y;
    const currentHeight = windowHeight * currentSnap;
    const newPosition = currentHeight - info.offset.y;
    const newSnapRatio = newPosition / windowHeight;

    // Find closest snap point
    let closestSnap = snapPoints.reduce((prev, curr) => 
      Math.abs(curr - newSnapRatio) < Math.abs(prev - newSnapRatio) ? curr : prev
    );

    // Handle velocity-based snapping
    if (Math.abs(velocity) > 500) {
      if (velocity > 0 && closestSnap > 0.1) {
        // Swipe down - go to lower snap point or close
        const lowerSnaps = snapPoints.filter(snap => snap < closestSnap);
        if (lowerSnaps.length > 0) {
          closestSnap = Math.max(...lowerSnaps);
        } else {
          onClose();
          return;
        }
      } else if (velocity < 0) {
        // Swipe up - go to higher snap point
        const higherSnaps = snapPoints.filter(snap => snap > closestSnap);
        if (higherSnaps.length > 0) {
          closestSnap = Math.min(...higherSnaps);
        }
      }
    }

    // Close if dragged below minimum
    if (closestSnap < 0.1) {
      onClose();
    } else {
      setCurrentSnap(closestSnap);
    }
  };

  // Don't render anything during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: `${100 - (currentSnap * 100)}%` }}
            exit={{ y: '100%' }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              duration: isDragging ? 0 : undefined
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: windowHeight * (1 - Math.max(...snapPoints)) }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <motion.div
                className="w-12 h-1.5 bg-muted-foreground/30 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-lg font-semibold">{title}</h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto" style={{ maxHeight: `${currentSnap * 90}vh` }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}