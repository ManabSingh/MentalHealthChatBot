import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

const TreeBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: i,
        x: 200 + Math.random() * 300, // Around tree area
        y: 150 + Math.random() * 200,
        delay: Math.random() * 3,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-lavender-100 to-calm-blue-50" />
      
      {/* Central tree SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg 
          width="400" 
          height="400" 
          viewBox="0 0 400 400" 
          className="opacity-70"
          aria-label="Wisdom tree"
        >
          {/* Tree trunk */}
          <rect 
            x="185" 
            y="220" 
            width="30" 
            height="120" 
            rx="15" 
            fill="#6D4C41" 
          />
          
          {/* Tree foliage layers */}
          <circle cx="180" cy="220" r="75" fill="#2E7D32" opacity="0.8" />
          <circle cx="220" cy="200" r="70" fill="#388E3C" opacity="0.8" />
          <circle cx="200" cy="240" r="80" fill="#43A047" opacity="0.8" />
          <circle cx="200" cy="180" r="60" fill="#4CAF50" opacity="0.8" />
          
          {/* Tree roots suggestion */}
          <ellipse cx="200" cy="340" rx="100" ry="20" fill="#8D6E63" opacity="0.3" />
        </svg>
      </div>

      {/* Soft particle effects around tree */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60"
          initial={{ 
            x: particle.x, 
            y: particle.y,
            scale: 0,
            opacity: 0 
          }}
          animate={{ 
            y: [particle.y, particle.y - 40, particle.y],
            scale: [0, 1, 0.8, 0],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: '0 0 8px rgba(254, 240, 138, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

export default TreeBackground;
