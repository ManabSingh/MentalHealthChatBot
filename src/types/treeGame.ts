export interface DailyScreenTime {
  date: string;
  hours: number;
  isHealthy: boolean; // true if hours <= 6
}

export interface TreeProgress {
  currentDay: number;
  consecutiveHealthyDays: number;
  totalDays: number;
  isCompleted: boolean;
  hasFailed: boolean;
}

export enum TreeState {
  NONE = 'none',
  SEED = 'seed',
  SAPLING = 'sapling',
  GROWING = 'growing',
  MATURE = 'mature',
  DRIED = 'dried'
}

export interface TreeGameData {
  treeState: TreeState;
  progress: TreeProgress;
  dailyScreenTimes: DailyScreenTime[];
  plantedDate: string | null;
  lastUpdated: string;
}

export interface TreeStageInfo {
  state: TreeState;
  title: string;
  description: string;
  emoji: string;
  color: string;
  minDays: number;
}

// Game constants
export const SCREEN_TIME_LIMIT = 6; // hours
export const DAYS_TO_COMPLETE = 7;
export const TREE_STAGES: TreeStageInfo[] = [
  {
    state: TreeState.NONE,
    title: 'No Tree',
    description: 'Plant a tree to start your journey!',
    emoji: '🌱',
    color: 'bg-gray-100',
    minDays: 0
  },
  {
    state: TreeState.SEED,
    title: 'Planted Seed',
    description: 'Your journey begins! Keep your screen time under 6 hours.',
    emoji: '🌱',
    color: 'bg-soft-green-100',
    minDays: 0
  },
  {
    state: TreeState.SAPLING,
    title: 'Young Sapling',
    description: 'Great progress! Your healthy habits are showing.',
    emoji: '🌿',
    color: 'bg-soft-green-200',
    minDays: 2
  },
  {
    state: TreeState.GROWING,
    title: 'Growing Tree',
    description: 'Amazing! You\'re more than halfway there.',
    emoji: '🌳',
    color: 'bg-soft-green-300',
    minDays: 4
  },
  {
    state: TreeState.MATURE,
    title: 'Majestic Tree',
    description: 'Congratulations! You\'ve built a healthy digital lifestyle.',
    emoji: '🌲',
    color: 'bg-soft-green-400',
    minDays: 7
  },
  {
    state: TreeState.DRIED,
    title: 'Dried Tree',
    description: 'Don\'t worry! Plant a new tree and try again.',
    emoji: '🥀',
    color: 'bg-yellow-100',
    minDays: 0
  }
];
