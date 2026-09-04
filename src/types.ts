export type TabType = 'routine' | 'timer' | 'alerts' | 'community';

export interface ClassItem {
  id: string;
  code: string;
  name: string;
  type: 'Theory' | 'Lab Practical' | 'Mathematics';
  time: string;
  prof: string;
  room: string;
  verified: boolean;
  accent: string; // Tailwind color classes
}

export interface CommunityPost {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timeAgo: string;
  category: string;
  title: string;
  body: string;
  helpfulCount: number;
  hasSolution?: boolean;
  solutionAuthor?: string;
  solutionText?: string;
  solutionCode?: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  rating: number;
  solvedCount: number;
  badge: 'Gold' | 'Silver' | 'Bronze';
}
