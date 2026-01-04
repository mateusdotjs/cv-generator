import type { StateCreator } from "zustand";
import type { Experience } from "../types";

export type ExperienceSlice = {
  experiences: Record<string, Experience[]>;
  addExperience: (resumeId: string, experience: Experience) => void;
  removeExperience: (resumeId: string, id: string) => void;
  updateExperience: (
    resumeId: string,
    id: string,
    updatedExperience: Partial<Experience>
  ) => void;
  reorderExperiences: (resumeId: string, newList: Experience[]) => void;
};

export const createExperienceSlice: StateCreator<
  ExperienceSlice,
  [],
  [],
  ExperienceSlice
> = (set) => ({
  experiences: {},
  addExperience: (resumeId, experience) =>
    set((state) => ({
      experiences: {
        ...state.experiences,
        [resumeId]: [...(state.experiences[resumeId] ?? []), experience],
      },
    })),
  removeExperience: (resumeId, id) =>
    set((state) => ({
      experiences: {
        ...state.experiences,
        [resumeId]: (state.experiences[resumeId] ?? []).filter(
          (exp) => exp.id !== id
        ),
      },
    })),
  updateExperience: (resumeId, id, updatedExperience) =>
    set((state) => ({
      experiences: {
        ...state.experiences,
        [resumeId]: (state.experiences[resumeId] ?? []).map((exp) =>
          exp.id === id ? { ...exp, ...updatedExperience } : exp
        ),
      },
    })),
  reorderExperiences: (resumeId, newList) =>
    set((state) => ({
      experiences: {
        ...state.experiences,
        [resumeId]: newList,
      },
    })),
});
