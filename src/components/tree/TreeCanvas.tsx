import React from 'react';
import { motion } from 'framer-motion';
import { TreeState } from '../../types/treeGame';

interface TreeCanvasProps {
  state: TreeState;
  isBlossom?: boolean;
}

// Simple stylized SVG trees for different stages
const Seed = () => (
  <svg width="180" height="180" viewBox="0 0 200 200" aria-label="Seed">
    <circle cx="100" cy="140" r="10" fill="#8B5E3C" />
    <ellipse cx="100" cy="150" rx="45" ry="8" fill="#C8E6C9" opacity="0.6" />
  </svg>
);

const Sapling = () => (
  <svg width="220" height="220" viewBox="0 0 220 220" aria-label="Sapling">
    <rect x="105" y="110" width="10" height="45" rx="5" fill="#6D4C41" />
    <path d="M110 110 C 80 90, 85 80, 95 70" stroke="#2E7D32" strokeWidth="10" fill="none" strokeLinecap="round" />
    <path d="M110 110 C 140 90, 135 80, 125 70" stroke="#2E7D32" strokeWidth="10" fill="none" strokeLinecap="round" />
    <ellipse cx="110" cy="160" rx="55" ry="10" fill="#C8E6C9" opacity="0.6" />
  </svg>
);

const MediumTree = () => (
  <svg width="260" height="260" viewBox="0 0 260 260" aria-label="Medium tree">
    <rect x="125" y="120" width="14" height="70" rx="7" fill="#5D4037" />
    <circle cx="110" cy="120" r="38" fill="#43A047" />
    <circle cx="140" cy="110" r="34" fill="#388E3C" />
    <circle cx="130" cy="140" r="36" fill="#4CAF50" />
    <ellipse cx="132" cy="200" rx="70" ry="12" fill="#C8E6C9" opacity="0.6" />
  </svg>
);

const FullTree = ({ blossom }: { blossom?: boolean }) => (
  <svg width="300" height="300" viewBox="0 0 300 300" aria-label="Full tree">
    <rect x="145" y="140" width="16" height="95" rx="8" fill="#4E342E" />
    <circle cx="140" cy="140" r="50" fill="#2E7D32" />
    <circle cx="170" cy="130" r="46" fill="#388E3C" />
    <circle cx="160" cy="165" r="48" fill="#43A047" />
    {blossom && (
      <g>
        <circle cx="150" cy="120" r="6" fill="#FFD1DC" />
        <circle cx="120" cy="150" r="5" fill="#FFE4E1" />
        <circle cx="180" cy="150" r="5" fill="#FFD1DC" />
        <circle cx="165" cy="175" r="6" fill="#FFF1F2" />
        <circle cx="130" cy="170" r="5" fill="#FFE4E1" />
      </g>
    )}
    <ellipse cx="153" cy="245" rx="85" ry="14" fill="#C8E6C9" opacity="0.6" />
  </svg>
);

const TreeCanvas: React.FC<TreeCanvasProps> = ({ state, isBlossom = false }) => {
  const content = () => {
    switch (state) {
      case TreeState.SEED:
        return <Seed />;
      case TreeState.SAPLING:
        return <Sapling />;
      case TreeState.GROWING:
        return <MediumTree />;
      case TreeState.MATURE:
        return <FullTree blossom={isBlossom} />;
      case TreeState.DRIED:
        return (
          <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
            <svg width="260" height="260" viewBox="0 0 260 260" aria-label="Dried tree">
              <rect x="125" y="120" width="14" height="70" rx="7" fill="#6D4C41" />
              <circle cx="110" cy="120" r="38" fill="#A1887F" />
              <circle cx="140" cy="110" r="34" fill="#8D6E63" />
              <circle cx="130" cy="140" r="36" fill="#BCAAA4" />
            </svg>
          </motion.div>
        );
      default:
        return <Seed />;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      className="flex items-center justify-center"
    >
      {content()}
    </motion.div>
  );
};

export default TreeCanvas;

