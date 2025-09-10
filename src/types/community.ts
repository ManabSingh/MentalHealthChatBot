export interface Comment {
  id: string;
  postId: string;
  parentId?: string; // For nested replies
  content: string;
  author: string; // "Anonymous", nickname, or real name
  timestamp: string; // ISO string
  votes: number;
  userVote?: 'up' | 'down' | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string; // "Anonymous", nickname, or real name
  timestamp: string; // ISO string
  tags: string[];
  votes: number;
  userVote?: 'up' | 'down' | null;
  commentCount: number;
  comments: Comment[];
}

export interface CommunityState {
  posts: Post[];
  selectedTags: string[];
  sortBy: 'newest' | 'oldest' | 'top' | 'controversial';
}

export const AVAILABLE_TAGS = [
  'Stress',
  'Anxiety',
  'Depression', 
  'Exams',
  'Self-care',
  'Motivation',
  'Relationships',
  'Sleep',
  'Exercise',
  'Mindfulness',
  'Academic',
  'Social',
  'Success',
  'Struggle',
  'Tips',
  'Support'
] as const;

export type Tag = typeof AVAILABLE_TAGS[number];

export const NAME_OPTIONS = [
  { value: 'Anonymous', label: 'Anonymous' },
  { value: 'custom', label: 'Choose a nickname' },
  { value: 'real', label: 'Use real name' }
] as const;

export const STORAGE_KEY_COMMUNITY = 'mindcare_community_v1';
