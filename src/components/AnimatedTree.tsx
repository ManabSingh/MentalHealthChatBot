import React, { useEffect, useMemo, useRef, useState } from 'react';
import Tree from './Tree';
import { TreeState } from '../types/treeGame';

interface AnimatedTreeProps {
  startState?: TreeState;
  durationPerStageMs?: number; // time between stages
  loop?: boolean; // whether to loop after reaching full tree
  className?: string;
}

const growthOrder: TreeState[] = [
  TreeState.SEED,
  TreeState.SAPLING,
  TreeState.GROWING,
  TreeState.MATURE,
];

const AnimatedTree: React.FC<AnimatedTreeProps> = ({
  startState = TreeState.SEED,
  durationPerStageMs = 2000,
  loop = true,
  className = '',
}) => {
  const [playing, setPlaying] = useState(false);
  const [stageIndex, setStageIndex] = useState(() => {
    const idx = growthOrder.indexOf(startState);
    return idx >= 0 ? idx : 0;
  });
  const intervalRef = useRef<number | null>(null);

  const currentState = useMemo(() => growthOrder[stageIndex], [stageIndex]);

  const start = () => setPlaying(true);
  const pause = () => setPlaying(false);
  const reset = () => {
    setPlaying(false);
    setStageIndex(0);
  };

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setStageIndex((prev) => {
        const next = prev + 1;
        if (next >= growthOrder.length) {
          return loop ? 0 : prev; // loop or hold at mature
        }
        return next;
      });
    }, durationPerStageMs);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playing, durationPerStageMs, loop]);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center">
        <Tree treeState={currentState} />

        {/* Controls */}
        <div className="mt-4 flex items-center gap-3">
          {!playing ? (
            <button
              onClick={start}
              className="px-4 py-2 rounded-lg bg-soft-green-600 text-white text-sm font-medium hover:bg-soft-green-700"
            >
              Play Growth
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-4 py-2 rounded-lg bg-calm-blue-600 text-white text-sm font-medium hover:bg-calm-blue-700"
            >
              Pause
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        {/* Stage indicator */}
        <div className="mt-3 w-full max-w-xs">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-soft-green-500 rounded-full transition-all"
              style={{ width: `${((stageIndex + 1) / growthOrder.length) * 100}%` }}
            />
          </div>
          <p className="text-center text-xs text-gray-600 mt-2">
            Stage {stageIndex + 1} of {growthOrder.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTree;

