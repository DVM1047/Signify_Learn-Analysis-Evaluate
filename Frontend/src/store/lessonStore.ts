import { create } from 'zustand';
import { Unit, Lesson } from '@/types';

interface LessonState {
  units: Unit[];
  currentLesson: Lesson | null;
  searchQuery: string;
  selectedFilter: 'all' | 'available' | 'completed';
  setUnits: (units: Unit[]) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: 'all' | 'available' | 'completed') => void;
}

export const useLessonStore = create<LessonState>((set) => ({
  units: [],
  currentLesson: null,
  searchQuery: '',
  selectedFilter: 'all',

  setUnits: (units) => set({ units }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedFilter: (selectedFilter) => set({ selectedFilter }),
}));
