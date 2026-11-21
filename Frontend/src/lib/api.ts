import { UserProfile, Unit, LoginPayload, RegisterPayload, LoginResponse, DashboardData } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Rich fallback data matching Phase 2 schemas if the FastAPI backend is offline
export const FALLBACK_DASHBOARD_DATA: DashboardData = {
  user: {
    id: 'usr_001',
    name: 'Tanvi',
    email: 'tanvi@example.com',
    avatar: 'T',
    xp: 240,
    level: 3,
    streak: 5,
    goal_xp: 30,
    current_xp: 15,
    week: [1, 1, 1, 1, 1, 0, 0], // Monday through Friday active
  },
  units: [
    {
      id: 'u1',
      unit_num: 1,
      title: 'Unit 1: Greetings & Basics',
      desc: 'Master the essential foundational signs for daily meetings, handshakes, and polite interactions.',
      lessons: [
        {
          id: 'les_1',
          title: 'Hello & Goodbye',
          desc: 'Fundamental gestures for greeting in deaf-community conversations.',
          xp: 20,
          signs: 4,
          mins: 5,
          status: 'completed',
        },
        {
          id: 'les_2',
          title: 'Thank You & Please',
          desc: 'Respectful expressions to convey gratitude naturally and clearly.',
          xp: 20,
          signs: 4,
          mins: 5,
          status: 'available',
        },
        {
          id: 'les_3',
          title: 'Introduce Yourself',
          desc: 'Spell your name, share your age, and introduce companions.',
          xp: 25,
          signs: 5,
          mins: 6,
          status: 'locked',
          lock_text: 'Complete lesson 2 to unlock',
        },
      ],
    },
    {
      id: 'u2',
      unit_num: 2,
      title: 'Unit 2: Family & People',
      desc: 'Vocabulary for parents, siblings, relatives, colleagues, and community peers.',
      lessons: [
        {
          id: 'les_4',
          title: 'Family Members',
          desc: 'Signs for Father, Mother, Sister, Brother, and Grandparents.',
          xp: 25,
          signs: 5,
          mins: 6,
          status: 'locked',
          lock_text: 'Complete Unit 1 to unlock',
        },
        {
          id: 'les_5',
          title: 'Friends & Colleagues',
          desc: 'Everyday office, school, and classmate relationship terminology.',
          xp: 20,
          signs: 4,
          mins: 5,
          status: 'locked',
          lock_text: 'Complete Unit 1 to unlock',
        },
      ],
    },
    {
      id: 'u3',
      unit_num: 3,
      title: 'Unit 3: Numbers & Time',
      desc: 'Count numbers 1 to 20, tell time, and express days of the week in ISL.',
      lessons: [
        {
          id: 'les_6',
          title: 'Numbers 1 - 10',
          desc: 'Single hand counting patterns and finger positions.',
          xp: 20,
          signs: 10,
          mins: 7,
          status: 'locked',
          lock_text: 'Complete Unit 2 to unlock',
        },
        {
          id: 'les_7',
          title: 'Days of the Week',
          desc: 'Signs for Monday through Sunday with natural rhythm.',
          xp: 25,
          signs: 7,
          mins: 6,
          status: 'locked',
          lock_text: 'Complete Numbers 1 - 10 to unlock',
        },
      ],
    },
  ],
};

function getAuthHeader(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('signlingo_token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

export const api = {
  // Phase 1: Authentication Endpoints
  async register(payload: RegisterPayload): Promise<LoginResponse> {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Registration failed');
      }
      return await res.json();
    } catch (err: any) {
      console.warn('API register error (falling back to simulated success):', err.message);
      return {
        access_token: 'mock_jwt_token_register',
        token_type: 'bearer',
        user: {
          id: 'usr_new',
          name: payload.name,
          email: payload.email,
          avatar: payload.name.charAt(0).toUpperCase(),
          xp: 0,
          level: 1,
          streak: 1,
          goal_xp: 30,
          current_xp: 0,
          week: [0, 0, 0, 0, 0, 0, 0],
        },
      };
    }
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      // Backend FastAPI OAuth2 password flow or json
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Invalid email or password');
      }
      return await res.json();
    } catch (err: any) {
      console.warn('API login error (falling back to demo session):', err.message);
      return {
        access_token: 'mock_jwt_token_login',
        token_type: 'bearer',
        user: FALLBACK_DASHBOARD_DATA.user,
      };
    }
  },

  // Phase 2: App Shell & Dashboard Endpoints
  async getCurrentUser(): Promise<UserProfile> {
    try {
      const res = await fetch(`${API_BASE}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      return await res.json();
    } catch (err) {
      return FALLBACK_DASHBOARD_DATA.user;
    }
  },

  async getUnits(): Promise<Unit[]> {
    try {
      const res = await fetch(`${API_BASE}/content/units`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      });
      if (!res.ok) throw new Error('Failed to fetch units');
      return await res.json();
    } catch (err) {
      return FALLBACK_DASHBOARD_DATA.units;
    }
  },

  async getDashboardData(): Promise<DashboardData> {
    try {
      const [user, units] = await Promise.all([
        this.getCurrentUser(),
        this.getUnits(),
      ]);
      return { user, units };
    } catch (err) {
      console.warn('Dashboard API failed, using fallback data:', err);
      return FALLBACK_DASHBOARD_DATA;
    }
  },
};
