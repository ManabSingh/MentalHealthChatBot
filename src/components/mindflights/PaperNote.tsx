import React from 'react';
import { motion } from 'framer-motion';

interface PaperNoteProps {
  value: string;
  onChange: (value: string) => void;
  onFold: () => void;
  disabled?: boolean;
  maxLength?: number;
}

const PaperNote: React.FC<PaperNoteProps> = ({ 
  value, 
  onChange, 
  onFold, 
  disabled = false, 
  maxLength = 500 
}) => {
  const remaining = maxLength - value.length;
  const isTooLong = remaining < 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      className="relative"
    >
      {/* Paper shadow */}
      <div className="absolute inset-0 bg-gray-400 rounded-lg transform translate-x-1 translate-y-1 opacity-20" />
      
      {/* Main paper */}
      <div className="relative bg-white paper-texture rounded-lg border border-gray-200 p-6 max-w-md mx-auto">
        {/* Paper holes (like notebook paper) */}
        <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-start pt-8 space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-200 border border-gray-300" />
          ))}
        </div>
        
        {/* Red margin line */}
        <div className="absolute left-12 top-0 bottom-0 w-px bg-red-200" />
        
        {/* Writing area */}
        <div className="pl-8">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Share what's on your mind..."
            className="w-full h-40 bg-transparent border-none outline-none resize-none text-gray-800 text-sm leading-6 font-handwriting placeholder-gray-400"
            style={{
              fontFamily: "'Kalam', cursive",
              lineHeight: '24px', // Match paper line spacing
            }}
            disabled={disabled}
            maxLength={maxLength * 2} // Allow over-typing for UI feedback
          />
          
          {/* Character count */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
            <span className={`text-xs ${isTooLong ? 'text-red-500' : 'text-gray-500'}`}>
              {remaining >= 0 ? `${remaining} characters left` : `Over by ${-remaining}`}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFold}
              disabled={disabled || value.trim().length === 0 || isTooLong}
              className="px-4 py-2 bg-calm-blue-500 text-white text-sm rounded-md hover:bg-calm-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Fold into Plane ✈️
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperNote;
