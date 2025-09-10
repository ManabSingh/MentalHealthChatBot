import React, { useEffect, useState } from 'react';

interface FlyPlaneAnimationProps {
  text: string;
  onComplete?: () => void;
}

// Simple visual that overlays a plane emoji flying across the screen
const FlyPlaneAnimation: React.FC<FlyPlaneAnimationProps> = ({ text, onComplete }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div className="absolute bottom-20 left-4 plane-fly flex items-center gap-3">
        <span className="text-4xl select-none drift-slow">📝✈️</span>
        <div className="max-w-sm px-3 py-2 bg-white/90 backdrop-blur rounded-lg shadow text-sm text-gray-700 border">
          {text}
        </div>
      </div>
    </div>
  );
};

export default FlyPlaneAnimation;

