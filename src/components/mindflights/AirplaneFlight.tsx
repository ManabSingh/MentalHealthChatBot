import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AirplaneFlightProps {
  count?: number;
}

const AirplaneFlight: React.FC<AirplaneFlightProps> = ({ count = 6 }) => {
  const planes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: 20 + Math.random() * 60, // vh
      left: Math.random() * 80, // vw
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 3,
      size: 18 + Math.random() * 10,
      hue: 190 + Math.floor(Math.random() * 40),
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {planes.map((p) => (
        <motion.div
          key={p.id}
          className="absolute float-plane"
          style={{ top: `${p.top}vh`, left: `${p.left}vw` }}
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
        >
          <svg width={p.size} height={p.size * 0.66} viewBox="0 0 60 40" style={{ color: `hsl(${p.hue},70%,45%)` }}>
            <path d="M2 20 L20 8 L40 12 L58 20 L40 28 L20 32 Z" fill="currentColor" opacity="0.75" />
            <path d="M2 20 L20 8 L30 20 L20 32 Z" fill="currentColor" opacity="0.9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default AirplaneFlight;

