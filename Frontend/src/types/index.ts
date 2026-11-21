export type LessonStatus = 'completed' | 'available' | 'locked';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  streak: number;
  goal_xp: number;
  current_xp: number;
  week?: number[]; // [1, 1, 1, 1, 1, 0, 0] represents Mon-Sun practice
}

export interface Lesson {
  id: string;
  unit_id?: string;
  title: string;
  desc: string;
  xp: number;
  signs: number;
  mins: number;
  status: LessonStatus;
  lock_text?: string;
  order?: number;
}

export interface Unit {
  id: string;
  unit_num: number;
  title: string;
  desc: string;
  lessons: Lesson[];
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export interface LoginResponse extends AuthTokens {
  user?: UserProfile;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Fallback data for offline/demo mode
export interface DashboardData {
  user: UserProfile;
  units: Unit[];
}
