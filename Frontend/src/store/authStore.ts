import { create } from 'zustand';
import { UserProfile } from '@/types';

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user?: UserProfile) => void;
  setUser: (user: UserProfile) => void;
  updateUserStats: (xp: number, level?: number, streak?: number) => void;
  logout: () => void;
  initialize: () => void;
}

const DEFAULT_MOCK_USER: UserProfile = {
  id: 'usr_tanvi_01',
  name: 'Tanvi',
  email: 'tanvi@example.com',
  avatar: 'T',
  xp: 240,
  level: 3,
  streak: 5,
  goal_xp: 30,
  current_xp: 15,
  week: [1, 1, 1, 1, 1, 0, 0],
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (token: string, user?: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('signlingo_token', token);
      if (user) {
        localStorage.setItem('signlingo_user', JSON.stringify(user));
      }
    }
    set({
      token,
      user: user || DEFAULT_MOCK_USER,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser: (user: UserProfile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('signlingo_user', JSON.stringify(user));
    }
    set({ user });
  },

  updateUserStats: (xp: number, level?: number, streak?: number) => {
    set((state) => {
      if (!state.user) return state;
      const updated = {
        ...state.user,
        xp,
        level: level !== undefined ? level : state.user.level,
        streak: streak !== undefined ? streak : state.user.streak,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('signlingo_user', JSON.stringify(updated));
      }
      return { user: updated };
    });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('signlingo_token');
      localStorage.removeItem('signlingo_user');
    }
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('signlingo_token');
      const savedUser = localStorage.getItem('signlingo_user');
      
      if (token) {
        let user: UserProfile = DEFAULT_MOCK_USER;
        if (savedUser) {
          try {
            user = JSON.parse(savedUser);
          } catch {
            user = DEFAULT_MOCK_USER;
          }
        }
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // In demo/dev mode without login, provide friendly default demo user
        set({
          token: 'demo-token',
          user: DEFAULT_MOCK_USER,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    }
  },
}));
