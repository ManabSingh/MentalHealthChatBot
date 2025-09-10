import React from 'react';
import { motion } from 'framer-motion';

interface VotingButtonsProps {
  votes: number;
  userVote?: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
  size?: 'sm' | 'md';
}

const VotingButtons: React.FC<VotingButtonsProps> = ({ 
  votes, 
  userVote, 
  onVote, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: { container: 'space-y-1', button: 'p-1', icon: 'w-4 h-4', text: 'text-xs' },
    md: { container: 'space-y-2', button: 'p-2', icon: 'w-5 h-5', text: 'text-sm' }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center ${classes.container}`}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onVote('up')}
        className={`
          ${classes.button} rounded-full transition-colors
          ${userVote === 'up' 
            ? 'bg-soft-green-100 text-soft-green-600' 
            : 'bg-gray-100 text-gray-500 hover:bg-soft-green-50 hover:text-soft-green-500'}
        `}
      >
        <svg 
          className={classes.icon} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </motion.button>

      <span className={`font-semibold ${classes.text} ${
        votes > 0 ? 'text-soft-green-600' : votes < 0 ? 'text-red-500' : 'text-gray-600'
      }`}>
        {votes > 0 ? `+${votes}` : votes}
      </span>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onVote('down')}
        className={`
          ${classes.button} rounded-full transition-colors
          ${userVote === 'down' 
            ? 'bg-red-100 text-red-600' 
            : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500'}
        `}
      >
        <svg 
          className={classes.icon} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l4.293-4.293a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default VotingButtons;
