'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw, ArrowDown } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children, threshold = 80 }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef(null);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, threshold], [0, 1]);
  const iconRotation = useTransform(pullProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        startY = e.touches[0].clientY;
        isDragging = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging || container.scrollTop > 0) return;

      currentY = e.touches[0].clientY;
      const deltaY = Math.max(0, currentY - startY);
      
      if (deltaY > 0) {
        e.preventDefault();
        setIsPulling(true);
        y.set(Math.min(deltaY * 0.5, threshold * 1.2));
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      
      isDragging = false;
      setIsPulling(false);

      if (y.get() >= threshold) {
        setIsRefreshing(true);
        // Haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate([50, 50, 50]);
        }
        
        onRefresh().finally(() => {
          setIsRefreshing(false);
          y.set(0);
        });
      } else {
        y.set(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, threshold, y]);

  return (
    <div ref={containerRef} className="relative overflow-auto h-full">
      {/* Pull Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-10"
        style={{ 
          y: useTransform(y, (value) => Math.max(0, value - 60)),
          opacity: useTransform(y, [0, 20, threshold], [0, 0.5, 1])
        }}
      >
        <motion.div
          className="bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border"
          animate={{
            scale: isPulling || isRefreshing ? 1 : 0.8,
          }}
        >
          {isRefreshing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-5 w-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div style={{ rotate: iconRotation }}>
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}