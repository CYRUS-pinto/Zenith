import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Roadmap, StudentProgress } from '@/types/sdg';

interface SDGState {
  currentRoadmap: Roadmap | null;
  studentProgress: StudentProgress[];
  setRoadmap: (roadmap: Roadmap) => void;
  updateProgress: (moduleId: string, status: StudentProgress['status'], code?: string) => void;
  unlockNextModule: (currentModuleId: string) => void;
  resetProgress: () => void;
}

export const useSDGStore = create<SDGState>()(
  persist(
    (set) => ({
      currentRoadmap: null,
      studentProgress: [],
      
      setRoadmap: (roadmap) => set({ 
        currentRoadmap: roadmap,
        studentProgress: roadmap.modules.map((m, idx) => ({
          moduleId: m.id,
          status: idx === 0 ? 'UNLOCKED' : 'LOCKED'
        }))
      }),

      updateProgress: (moduleId, status, code) => set((state) => ({
        studentProgress: state.studentProgress.map((p) => 
          p.moduleId === moduleId ? { ...p, status, savedCode: code || p.savedCode } : p
        )
      })),

      unlockNextModule: (currentModuleId) => set((state) => {
        const currentIndex = state.studentProgress.findIndex(p => p.moduleId === currentModuleId);
        if (currentIndex !== -1 && currentIndex < state.studentProgress.length - 1) {
          const nextProgress = [...state.studentProgress];
          nextProgress[currentIndex + 1].status = 'UNLOCKED';
          return { studentProgress: nextProgress };
        }
        return state;
      }),

      resetProgress: () => set({ currentRoadmap: null, studentProgress: [] })
    }),
    {
      name: 'sdg-v4-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
