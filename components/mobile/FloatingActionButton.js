'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, Phone, Mail, X } from 'lucide-react';

export default function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: MessageCircle, label: 'Chat', color: 'bg-blue-500', action: () => console.log('Chat') },
    { icon: Phone, label: 'Call', color: 'bg-green-500', action: () => console.log('Call') },
    { icon: Mail, label: 'Email', color: 'bg-purple-500', action: () => console.log('Email') },
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  const handleActionPress = (action) => {
    action();
    setIsExpanded(false);
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3"
          >
            {actions.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleActionPress(item.action)}
                className={`${item.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 min-w-max`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium pr-1">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={toggleExpanded}
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
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
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}