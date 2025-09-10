import React, { useEffect, useMemo, useState } from 'react';
import Tree from '../components/Tree';
import AnimatedTree from '../components/AnimatedTree';
import GrowthStageController from '../components/tree/GrowthStageController';
import { AnimatePresence } from 'framer-motion';
import {
  DAYS_TO_COMPLETE,
  SCREEN_TIME_LIMIT,
  TreeGameData,
  TreeState,
  TREE_STAGES,
  DailyScreenTime,
} from '../types/treeGame';

// Helper to format date as YYYY-MM-DD
const formatDate = (d: Date) => d.toISOString().slice(0, 10);

// Generate a week's mock data (or continue existing)
const generateMockScreenTime = (days: number): DailyScreenTime[] => {
  const result: DailyScreenTime[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const hours = Math.round((Math.random() * (8 - 3) + 3) * 10) / 10; // 3-8 hours
    result.push({ date: formatDate(date), hours, isHealthy: hours <= SCREEN_TIME_LIMIT });
  }
  return result;
};

const getStageFromConsecutive = (consecutive: number, failed: boolean): TreeState => {
  if (failed) return TreeState.DRIED;
  if (consecutive >= DAYS_TO_COMPLETE) return TreeState.MATURE;
  if (consecutive >= 4) return TreeState.GROWING;
  if (consecutive >= 2) return TreeState.SAPLING;
  if (consecutive >= 1) return TreeState.SEED;
  return TreeState.NONE;
};

const initialGameData: TreeGameData = {
  treeState: TreeState.NONE,
  progress: {
    currentDay: 0,
    consecutiveHealthyDays: 0,
    totalDays: DAYS_TO_COMPLETE,
    isCompleted: false,
    hasFailed: false,
  },
  dailyScreenTimes: [],
  plantedDate: null,
  lastUpdated: formatDate(new Date()),
};

const STORAGE_KEY = 'mindcare_tree_game_v1';

const GrowYourTree: React.FC = () => {
  const [game, setGame] = useState<TreeGameData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as TreeGameData;
      } catch {}
    }
    return initialGameData;
  });

  const [showImmersiveMode, setShowImmersiveMode] = useState(false);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  const canPlant = game.treeState === TreeState.NONE || game.treeState === TreeState.DRIED;

  const handlePlant = () => {
    const daily = generateMockScreenTime(1); // start with today
    const isHealthy = daily[0].isHealthy;
    const consecutive = isHealthy ? 1 : 0;
    const hasFailed = !isHealthy;
    setGame({
      treeState: getStageFromConsecutive(consecutive, hasFailed),
      progress: {
        currentDay: 1,
        consecutiveHealthyDays: consecutive,
        totalDays: DAYS_TO_COMPLETE,
        isCompleted: false,
        hasFailed,
      },
      dailyScreenTimes: daily,
      plantedDate: formatDate(new Date()),
      lastUpdated: formatDate(new Date()),
    });
    setShowImmersiveMode(true);
  };

  const handleReset = () => {
    setGame(initialGameData);
    setShowImmersiveMode(false);
  };

  const handleDemo = () => {
    // Generate 7 days of healthy screen time for demo
    const dailyData: DailyScreenTime[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const hours = Math.round((Math.random() * 3 + 3) * 10) / 10; // 3-6 hours (always healthy for demo)
      dailyData.push({ date: formatDate(date), hours, isHealthy: true });
    }
    
    setGame({
      treeState: TreeState.MATURE,
      progress: {
        currentDay: DAYS_TO_COMPLETE,
        consecutiveHealthyDays: DAYS_TO_COMPLETE,
        totalDays: DAYS_TO_COMPLETE,
        isCompleted: true,
        hasFailed: false,
      },
      dailyScreenTimes: dailyData,
      plantedDate: formatDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)),
      lastUpdated: formatDate(new Date()),
    });
  };

  // Simulate daily/hourly growth. For demo, we "advance" a day on refresh when a new calendar day starts
  useEffect(() => {
    if (!game.plantedDate) return;

    const last = game.lastUpdated;
    const today = formatDate(new Date());
    if (today !== last && !game.progress.isCompleted && !game.progress.hasFailed) {
      // add a new day
      const newDay = generateMockScreenTime(1)[0];
      const daily = [...game.dailyScreenTimes, newDay].slice(-DAYS_TO_COMPLETE);
      const isHealthy = newDay.isHealthy;
      const consecutive = isHealthy ? game.progress.consecutiveHealthyDays + 1 : 0;
      const hasFailed = !isHealthy;
      const isCompleted = consecutive >= DAYS_TO_COMPLETE;

      setGame({
        treeState: getStageFromConsecutive(consecutive, hasFailed),
        progress: {
          currentDay: Math.min(game.progress.currentDay + 1, DAYS_TO_COMPLETE),
          consecutiveHealthyDays: consecutive,
          totalDays: DAYS_TO_COMPLETE,
          isCompleted,
          hasFailed,
        },
        dailyScreenTimes: daily,
        plantedDate: game.plantedDate,
        lastUpdated: today,
      });
    }
  }, [game]);

  const stageInfo = useMemo(() => {
    return TREE_STAGES.find(s => s.state === game.treeState) || TREE_STAGES[0];
  }, [game.treeState]);

  const progressPercent = useMemo(() => {
    const denom = DAYS_TO_COMPLETE;
    const num = Math.min(game.progress.consecutiveHealthyDays, DAYS_TO_COMPLETE);
    return Math.round((num / denom) * 100);
  }, [game.progress.consecutiveHealthyDays]);

  const dayItems = useMemo(() => {
    const days: { day: number; date?: string; healthy?: boolean; hours?: number }[] = [];
    for (let i = 0; i < DAYS_TO_COMPLETE; i++) {
      const entry = game.dailyScreenTimes[i];
      days.push({
        day: i + 1,
        date: entry?.date,
        healthy: entry?.isHealthy,
        hours: entry?.hours,
      });
    }
    return days;
  }, [game.dailyScreenTimes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-green-50 via-white to-calm-blue-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Grow Your Tree</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Keep your daily screen time under {SCREEN_TIME_LIMIT} hours to help your tree grow for {DAYS_TO_COMPLETE} days.
            Stay consistent and watch it become a majestic tree!
          </p>
        </div>

        {/* Growth Preview Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">See Your Tree's Growth Journey</h2>
              <p className="text-gray-600">
                Watch how your tree would grow over 7 consecutive healthy days (under {SCREEN_TIME_LIMIT} hours screen time per day)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Animated Tree */}
              <div className="flex justify-center">
                <AnimatedTree 
                  durationPerStageMs={2500} 
                  loop={true}
                  className=""
                />
              </div>
              
              {/* Growth Stages Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Stages Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <p className="font-medium text-gray-900">Day 1: Seed Planted</p>
                      <p className="text-sm text-gray-600">Your journey begins with commitment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌿</span>
                    <div>
                      <p className="font-medium text-gray-900">Days 2-3: Young Sapling</p>
                      <p className="text-sm text-gray-600">Early progress shows your dedication</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌳</span>
                    <div>
                      <p className="font-medium text-gray-900">Days 4-6: Growing Strong</p>
                      <p className="text-sm text-gray-600">Healthy habits are taking root</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌲</span>
                    <div>
                      <p className="font-medium text-gray-900">Day 7: Majestic Tree</p>
                      <p className="text-sm text-gray-600">You've built a sustainable digital lifestyle!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tree and actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <Tree treeState={game.treeState} />

              <div className="w-full mt-6 space-y-3">
                {canPlant ? (
                  <div className="space-y-2">
                    <button
                      onClick={handlePlant}
                      className="w-full bg-soft-green-600 text-white py-3 rounded-lg font-semibold hover:bg-soft-green-700 transition-colors"
                    >
                      Plant Tree 🌱
                    </button>
                    <button
                      onClick={() => setShowImmersiveMode(true)}
                      disabled={game.treeState === TreeState.NONE}
                      className="w-full bg-calm-blue-500 text-white py-2 rounded-lg text-sm hover:bg-calm-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      View Full Tree 🔍
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleReset}
                      className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                    >
                      Reset & Plant New Tree
                    </button>
                    {!game.progress.isCompleted && !game.progress.hasFailed && (
                      <p className="text-xs text-gray-500 text-center">
                        Tree grows automatically daily if your screen time stays within limits.
                      </p>
                    )}
                  </div>
                )}
                
                {/* Demo Button */}
                {canPlant && (
                  <button
                    onClick={handleDemo}
                    className="w-full mt-2 bg-lavender-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-lavender-600 transition-colors"
                  >
                    🎮 Try Demo (7-Day Success)
                  </button>
                )}
              </div>

              {/* Status */}
              <div className="mt-6 w-full bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-700"><strong>Status:</strong> {stageInfo.title}</p>
                <p className="text-sm text-gray-600 mt-1">{stageInfo.description}</p>
                <div className="mt-4">
                  <div className="h-3 bg-calm-blue-100 rounded-full overflow-hidden">
                    <div
                      className="h-3 bg-calm-blue-600 rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 flex justify-between">
                    <span>{game.progress.consecutiveHealthyDays} / {DAYS_TO_COMPLETE} healthy days</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Timeline and stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* 7-Day Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7-Day Journey</h2>
              <div className="grid grid-cols-7 gap-3">
                {dayItems.map((d) => (
                  <div key={d.day} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border
                        ${d.healthy === undefined ? 'bg-gray-50 border-gray-200 text-gray-400' : d.healthy ? 'bg-soft-green-100 border-soft-green-300 text-soft-green-700' : 'bg-red-50 border-red-200 text-red-600'}`}
                    >
                      {d.healthy === undefined ? '—' : d.healthy ? '✓' : '✕'}
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Day {d.day}</p>
                    <p className="text-[10px] text-gray-500">{d.hours ? `${d.hours}h` : ''}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Screen Time Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Screen Time</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {game.dailyScreenTimes.length === 0 ? (
                  <p className="text-gray-600">No data yet. Plant your tree to start tracking!</p>
                ) : (
                  game.dailyScreenTimes.map((d) => (
                    <div key={d.date} className={`rounded-xl p-4 border ${d.isHealthy ? 'bg-soft-green-50 border-soft-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{d.date}</p>
                          <p className="text-lg font-semibold text-gray-900">{d.hours} hrs</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${d.isHealthy ? 'bg-soft-green-200 text-soft-green-800' : 'bg-red-200 text-red-800'}`}>
                          {d.isHealthy ? 'Healthy' : 'Over Limit'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-calm-blue-600 to-soft-green-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Tips for Healthy Screen Time</h3>
              <ul className="text-calm-blue-100 text-sm list-disc pl-5 space-y-1">
                <li>Use app timers and focus modes during study sessions</li>
                <li>Take 5-minute breaks every 30–45 minutes</li>
                <li>Keep your phone in another room while sleeping</li>
                <li>Plan offline activities like walks, workouts, or hobbies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Immersive Full-Screen Tree Mode */}
      <AnimatePresence>
        {showImmersiveMode && game.treeState !== TreeState.NONE && (
          <GrowthStageController
            state={game.treeState}
            healthy={!game.progress.hasFailed && game.progress.consecutiveHealthyDays > 0}
            completed={game.progress.isCompleted}
            onClose={() => setShowImmersiveMode(false)}
            onReset={() => {
              handleReset();
              setShowImmersiveMode(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrowYourTree;

