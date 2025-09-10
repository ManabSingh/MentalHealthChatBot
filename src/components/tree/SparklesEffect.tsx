import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: string;
  x: number;
  y: number;
  delay: number;
}

interface SparklesEffectProps {
  intensity?: number;
  treeState?: 'seed' | 'sapling' | 'growing' | 'mature';
}

const SparklesEffect: React.FC<SparklesEffectProps> = ({ 
  intensity = 8, 
  treeState = 'mature' 
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = [];
      const sparkleCount = Math.min(intensity, 20);
      
      for (let i = 0; i < sparkleCount; i++) {
        const angle = (i / sparkleCount) * Math.PI * 2;
        const radius = 120 + Math.random() * 80;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        newSparkles.push({
          id: `sparkle-${i}`,
          x: x + (Math.random() - 0.5) * 40,
          y: y + (Math.random() - 0.5) * 40,
          delay: Math.random() * 2,
        });
      }
      
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    
    return () => clearInterval(interval);
  }, [intensity, treeState]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          initial={{ 
            scale: 0, 
            opacity: 0,
            x: sparkle.x,
            y: sparkle.y,
          }}
          animate={{ 
            scale: [0, 1, 0.8, 0],
            opacity: [0, 1, 0.7, 0],
            y: sparkle.y - 30,
          }}
          transition={{
            duration: 2.5,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeOut",
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          <div className="relative">
            <motion.div 
              className="w-1 h-1 bg-yellow-200 rounded-full"
              animate={{ 
                boxShadow: [
                  '0 0 2px #FEF08A',
                  '0 0 8px #FDE047',
                  '0 0 4px #FEF08A'
                ]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -inset-1 bg-white/40 rounded-full blur-[1px]"
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SparklesEffect;
