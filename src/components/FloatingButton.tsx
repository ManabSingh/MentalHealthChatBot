import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FloatingButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  color: 'blue' | 'green' | 'purple';
  label: string;
  isVisible?: boolean;
  delay?: number;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-200',
    hover: 'hover:bg-blue-300',
    shadow: 'shadow-blue-200',
    text: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-200',
    hover: 'hover:bg-green-300',
    shadow: 'shadow-green-200',
    text: 'text-green-700'
  },
  purple: {
    bg: 'bg-purple-200',
    hover: 'hover:bg-purple-300',
    shadow: 'shadow-purple-200',
    text: 'text-purple-700'
  }
};

const FloatingButton: React.FC<FloatingButtonProps> = ({
  icon: Icon,
  onClick,
  color,
  label,
  isVisible = true,
  delay = 0
}) => {
  const colors = colorVariants[color];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      exit={{ opacity: 0, scale: 0, y: 20 }}
      transition={{
        duration: 0.3,
        delay: delay,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-14 h-14 rounded-full ${colors.bg} ${colors.hover} ${colors.text}
        shadow-lg transition-all duration-300 ease-out
        flex items-center justify-center
        group relative overflow-hidden
      `}
      aria-label={label}
    >
      <Icon size={24} className="z-10" />
      
      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${colors.bg} opacity-0 group-hover:opacity-50`}
        initial={false}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className={`
          absolute right-full mr-3 px-3 py-1 
          bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap
          pointer-events-none z-20
        `}
      >
        {label}
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-2 border-b-2 border-l-gray-800 border-t-transparent border-b-transparent" />
      </motion.div>
    </motion.button>
  );
};

export default FloatingButton;
