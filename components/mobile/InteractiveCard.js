'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function InteractiveCard({ 
  title, 
  description, 
  image, 
  category,
  onPress,
  className = "" 
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // Haptic feedback
    if (isMounted && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(isLiked ? 30 : 50);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Haptic feedback
    if (isMounted && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Don't render during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${className}`}
      style={{ 
        rotateX, 
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onPress}
    >
      <motion.div
        className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
        animate={{
          boxShadow: isPressed 
            ? "0 4px 20px rgba(0,0,0,0.1)" 
            : "0 10px 40px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.div className="w-full h-full">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              style={{ objectPosition: 'top' }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </motion.div>
          
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium border border-border"
          >
            {category}
          </motion.div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <motion.button
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm border border-border transition-all ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-background/90 hover:bg-background'
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="p-2 rounded-full bg-background/90 backdrop-blur-sm border border-border hover:bg-background transition-colors"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="bg-background text-foreground rounded-full p-3"
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowUpRight className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <motion.h3 
            className="text-lg font-bold mb-2 line-clamp-2"
            layoutId={`title-${title}`}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-sm line-clamp-3"
            layoutId={`description-${title}`}
          >
            {description}
          </motion.p>

          {/* Progress Indicator */}
          <motion.div
            className="mt-4 h-1 bg-muted rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "70%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/10 rounded-2xl -z-10"
        style={{
          translateZ: -50,
          rotateX,
          rotateY
        }}
        animate={{
          opacity: isPressed ? 0.3 : 0.1
        }}
      />
    </motion.div>
  );
}