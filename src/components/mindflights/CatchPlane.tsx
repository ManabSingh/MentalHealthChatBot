import React, { useState } from 'react';

interface CatchPlaneProps {
  onCatch: () => void;
  disabled?: boolean;
}

const CatchPlane: React.FC<CatchPlaneProps> = ({ onCatch, disabled = false }) => {
  const [catching, setCatching] = useState(false);

  const handleCatch = () => {
    setCatching(true);
    setTimeout(() => {
      setCatching(false);
      onCatch();
    }, 800);
  };

  return (
    <div className="text-center">
      <button
        onClick={handleCatch}
        disabled={disabled || catching}
        className={`
          px-8 py-4 rounded-2xl font-semibold text-lg
          bg-gradient-to-r from-soft-green-500 to-soft-green-600
          text-white hover:from-soft-green-600 hover:to-soft-green-700
          disabled:bg-gray-300 disabled:cursor-not-allowed
          transition-all duration-300 transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl
          ${catching ? 'animate-pulse' : ''}
        `}
      >
        {catching ? (
          <>
            <span className="inline-block animate-spin">🔍</span> Catching...
          </>
        ) : (
          <>
            Catch a Plane 🪃
          </>
        )}
      </button>
      <p className="text-gray-600 text-sm mt-3">
        Discover an anonymous message from another student
      </p>
    </div>
  );
};

export default CatchPlane;
