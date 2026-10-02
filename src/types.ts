export interface Activity {
  title: string;
  day: string;
  category: string;
  duration: string;
  icon: string;
  desc: string;
  rules: string[];
  benefit: string;
}

export interface Story {
  title: string;
  author: string;
  content: string;
  questions: string[];
  chatTopic: string;
}

export interface Task {
  id: number;
  text: string;
  assignees: string[];
  done: boolean;
  createdAt?: string;
}

export interface MeetingRecord {
  id: number;
  date: string;
  rawDate: string;
  reporter: string;
  issues: string;
  decisions: string;
  attendees?: string[];
}

export type TabType = 'home' | 'daily' | 'book' | 'chat' | 'tasks' | 'meeting';
