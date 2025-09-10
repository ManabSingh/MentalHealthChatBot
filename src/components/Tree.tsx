import React from 'react';
import { motion } from 'framer-motion';
import { TreeState, TREE_STAGES, TreeStageInfo } from '../types/treeGame';
import TreeCanvas from './tree/TreeCanvas';

interface TreeProps {
  treeState: TreeState;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Tree: React.FC<TreeProps> = ({ treeState, size = 'large', className = '' }) => {
  const stageInfo: TreeStageInfo = TREE_STAGES.find(stage => stage.state === treeState) || TREE_STAGES[0];
  
  const sizeClasses = {
    small: 'w-16 h-16 text-4xl',
    medium: 'w-24 h-24 text-6xl',
    large: 'w-32 h-32 text-8xl'
  };

  const containerClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };

  return (
    <div className={`${className} flex flex-col items-center`}>
      {/* Tree Container */}
      {size === 'large' ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          className="flex items-center justify-center"
        >
          <TreeCanvas state={treeState} />
        </motion.div>
      ) : (
        <div 
          className={`
            ${sizeClasses[size]} 
            ${containerClasses[size]}
            ${stageInfo.color}
            rounded-full flex items-center justify-center
            border-4 border-white shadow-lg
            transition-all duration-500 transform hover:scale-105
          `}
        >
          <span className="select-none" role="img" aria-label={stageInfo.title}>
            {stageInfo.emoji}
          </span>
        </div>
      )}
      
      {/* Tree Info */}
      {size === 'large' && (
        <div className="mt-4 text-center max-w-xs">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {stageInfo.title}
          </h3>
          <p className="text-sm text-gray-600">
            {stageInfo.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Tree;
