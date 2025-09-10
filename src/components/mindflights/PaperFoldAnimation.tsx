import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PaperFoldAnimationProps {
  text: string;
  onComplete: () => void;
}

const PaperFoldAnimation: React.FC<PaperFoldAnimationProps> = ({ text, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000); // Total animation time
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
      {/* Paper folding into airplane */}
      <motion.div
        className="relative"
        initial={{ scale: 1, rotate: 0 }}
        animate={{ 
          scale: [1, 0.8, 0.6, 0.3],
          rotate: [0, 15, 45, 90],
          x: [0, 20, 40, 80],
          y: [0, -10, -20, -40]
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Initial paper state */}
        <motion.div
          className="bg-white paper-texture rounded-lg border border-gray-200 p-4 w-64 h-48 shadow-lg"
          animate={{ 
            rotateX: [0, 30, 60, 90],
            rotateY: [0, 15, 30, 45]
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div className="text-xs text-gray-600 leading-relaxed overflow-hidden">
            {text.substring(0, 100)}...
          </div>
        </motion.div>
      </motion.div>

      {/* Airplane formation and flight */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0, x: 80, y: -40, rotate: 90, scale: 0.3 }}
        animate={{ 
          opacity: [0, 1, 1],
          x: [80, 200, 400, 800],
          y: [-40, -60, -80, -120],
          rotate: [90, 45, 20, 0],
          scale: [0.3, 0.6, 0.8, 1]
        }}
        transition={{ 
          delay: 1.5,
          duration: 1.5, 
          ease: "easeOut" 
        }}
      >
        {/* Paper airplane SVG */}
        <svg width="60" height="40" viewBox="0 0 60 40" className="text-calm-blue-600">
          <path
            d="M2 20 L20 8 L40 12 L58 20 L40 28 L20 32 Z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M2 20 L20 8 L30 20 L20 32 Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
        
        {/* Message preview bubble */}
        <motion.div
          className="absolute -top-8 left-12 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 shadow-sm border"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
          transition={{ delay: 2, duration: 1 }}
        >
          {text.substring(0, 30)}...
        </motion.div>
      </motion.div>

      {/* Sparkle trail */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          initial={{ 
            opacity: 0,
            x: 80 + i * 15,
            y: -40 + i * 3
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: -40 + i * 3 - 20
          }}
          transition={{
            delay: 1.8 + i * 0.1,
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default PaperFoldAnimation;
