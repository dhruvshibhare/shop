'use client';

import { useRef, useEffect } from 'react';

export default function GestureHandler({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  onPinch,
  threshold = 50 
}) {
  const elementRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchesRef = useRef([]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
      touchesRef.current = Array.from(e.touches);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && onPinch) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (touchesRef.current.length === 2) {
          const prevTouch1 = touchesRef.current[0];
          const prevTouch2 = touchesRef.current[1];
          const prevDistance = Math.sqrt(
            Math.pow(prevTouch2.clientX - prevTouch1.clientX, 2) +
            Math.pow(prevTouch2.clientY - prevTouch1.clientY, 2)
          );
          
          const scale = distance / prevDistance;
          onPinch(scale);
        }
      }
      touchesRef.current = Array.from(e.touches);
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        const deltaTime = Date.now() - touchStartRef.current.time;
        
        // Only consider it a swipe if it's fast enough and far enough
        if (deltaTime < 300 && (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold)) {
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0 && onSwipeRight) {
              onSwipeRight();
            } else if (deltaX < 0 && onSwipeLeft) {
              onSwipeLeft();
            }
          } else {
            // Vertical swipe
            if (deltaY > 0 && onSwipeDown) {
              onSwipeDown();
            } else if (deltaY < 0 && onSwipeUp) {
              onSwipeUp();
            }
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinch, threshold]);

  return (
    <div ref={elementRef} className="w-full h-full">
      {children}
    </div>
  );
}