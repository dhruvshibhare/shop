'use client';

import { motion } from 'framer-motion';

export default function SkeletonLoader({ type = 'card', count = 1 }) {
  const shimmer = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  const CardSkeleton = () => (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="relative h-48 bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
          {...shimmer}
        />
      </div>
      <div className="p-6 space-y-3">
        <div className="relative h-4 bg-muted rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
          />
        </div>
        <div className="relative h-3 bg-muted rounded w-3/4 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
          />
        </div>
        <div className="relative h-3 bg-muted rounded w-1/2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
          />
        </div>
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="flex items-center space-x-4 p-4">
      <div className="relative w-12 h-12 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
          {...shimmer}
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="relative h-4 bg-muted rounded overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
          />
        </div>
        <div className="relative h-3 bg-muted rounded w-2/3 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
          />
        </div>
      </div>
    </div>
  );

  const TextSkeleton = () => (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`relative h-4 bg-muted rounded overflow-hidden ${
          i === 3 ? 'w-2/3' : 'w-full'
        }`}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
            {...shimmer}
            transition={{ ...shimmer.transition, delay: i * 0.1 }}
          />
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'text':
        return <TextSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
}