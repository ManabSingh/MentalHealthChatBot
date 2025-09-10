import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Leaf {
  id: string;
  x: number;
  delay: number;
  color: string;
}

interface FallingLeavesEffectProps {
  count?: number;
}

const colors = ['#F59E0B', '#D97706', '#92400E', '#B45309', '#C2410C'];

const FallingLeavesEffect: React.FC<FallingLeavesEffectProps> = ({ count = 10 }) => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const arr: Leaf[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: `leaf-${i}`,
        x: -40 + Math.random() * 80,
        delay: Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setLeaves(arr);
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          initial={{ x: leaf.x, y: -40, opacity: 0.9, rotate: 0 }}
          animate={{
            y: 200,
            x: [leaf.x, leaf.x + 20, leaf.x - 10, leaf.x + 30],
            opacity: [0.9, 0.8, 0.6, 0.2, 0],
            rotate: [0, 30, -15, 40],
          }}
          transition={{ duration: 4.5, delay: leaf.delay, repeat: Infinity, ease: 'easeIn' }}
          style={{ left: '50%', top: '30%' }}
        >
          <div
            className="w-3 h-3 rounded-[2px]"
            style={{ backgroundColor: leaf.color, boxShadow: `0 0 6px ${leaf.color}55` }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FallingLeavesEffect;

