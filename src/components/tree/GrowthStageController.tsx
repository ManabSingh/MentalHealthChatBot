import React from 'react';
import { TreeState } from '../../types/treeGame';
import TreeCanvas from './TreeCanvas';
import SparklesEffect from './SparklesEffect';
import FallingLeavesEffect from './FallingLeavesEffect';
import { motion, AnimatePresence } from 'framer-motion';

interface GrowthStageControllerProps {
  state: TreeState;
  healthy: boolean;
  completed: boolean;
  onClose?: () => void;
  onReset?: () => void;
}

const GrowthStageController: React.FC<GrowthStageControllerProps> = ({
  state,
  healthy,
  completed,
  onClose,
  onReset,
}) => {
  const showSparkles = healthy && state !== TreeState.DRIED;
  const showLeaves = !healthy && state === TreeState.DRIED;

  return (
    <div className="fixed inset-0 z-[9998]">
      <div className="absolute inset-0 bg-gradient-to-b from-calm-blue-100 via-lavender-100 to-white" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl aspect-[4/3] bg-white/40 backdrop-blur rounded-3xl border border-white/60 shadow-2xl flex items-center justify-center overflow-hidden">
          <AnimatePresence>
            {showSparkles && (
              <motion.div key="sparkles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SparklesEffect intensity={state === TreeState.MATURE ? 14 : 10} treeState={state as any} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showLeaves && (
              <motion.div key="leaves" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FallingLeavesEffect count={14} />
              </motion.div>
            )}
          </AnimatePresence>

          <TreeCanvas state={state} isBlossom={completed} />

          {/* Top controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            {onClose && (
              <button onClick={onClose} className="px-4 py-2 rounded-lg bg-white/80 hover:bg-white text-gray-700 shadow">
                Close
              </button>
            )}
          </div>

          {/* Footer area */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
            {state === TreeState.DRIED ? (
              <button onClick={onReset} className="px-6 py-3 rounded-full bg-yellow-500 text-white font-semibold shadow-lg hover:bg-yellow-600">
                Try Again, Plant a New Tree
              </button>
            ) : completed ? (
              <div className="px-4 py-2 bg-soft-green-600 text-white rounded-full shadow">
                Great job! Your tree is fully grown 🌸
              </div>
            ) : (
              <div className="px-4 py-2 bg-white/80 text-gray-700 rounded-full shadow">Growing... keep up the healthy screen time ✨</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStageController;

