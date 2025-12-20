import type { StateCreator } from "zustand";
import type { Experience } from "../types";

export type ExperienceSlice = {
  experiences: Experience[];
  addExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
  updateExperience: (
    id: string,
    updatedExperience: Partial<Experience>
  ) => void;
  reorderExperiences: (newList: Experience[]) => void;
};

export const createExperienceSlice: StateCreator<
  ExperienceSlice,
  [],
  [],
  ExperienceSlice
> = (set) => ({
  experiences: [],
  addExperience: (experience) =>
    set((state) => ({
      experiences: [...state.experiences, experience],
    })),
  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),
  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      ),
    })),
  reorderExperiences: (newList) =>
    set(() => {
      return { experiences: newList };
    }),
});
