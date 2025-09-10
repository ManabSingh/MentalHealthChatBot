export interface PlaneReply {
  id: string;
  content: string;
  createdAt: string; // ISO
}

export interface PlaneMessage {
  id: string;
  content: string;
  createdAt: string; // ISO
  replies: PlaneReply[];
}

export interface MindFlightsState {
  pool: PlaneMessage[]; // anonymous pool of planes
  lastSentId?: string; // for local reference only
}

export const seedMockPlanes = (): PlaneMessage[] => {
  const now = new Date();
  const samples = [
    "Feeling overwhelmed with classes, trying to balance it all.",
    "Miss my family a lot this week. Homesick hits hard sometimes.",
    "Had a small win today: finished an assignment I was avoiding!",
    "Anxious about upcoming exams, but taking it day by day.",
    "Trying to sleep better. Phone off after 10 pm this week!",
  ];
  return samples.map((content, i) => ({
    id: `seed-${i}`,
    content,
    createdAt: new Date(now.getTime() - (i + 1) * 3600_000).toISOString(),
    replies: [],
  }));
};

export const STORAGE_KEY_MINDFLIGHTS = 'mindcare_mindflights_v1';

