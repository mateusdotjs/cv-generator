import type { StateCreator } from "zustand";
import type { Education } from "../types";

export type EducationSlice = {
  education: Education[];
  addEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, updatedEducation: Partial<Education>) => void;
  reorderEducation: (newList: Education[]) => void;
};

export const createEducationSlice: StateCreator<
  EducationSlice,
  [],
  [],
  EducationSlice
> = (set) => ({
  education: [],
  addEducation: (education) =>
    set((state) => ({
      education: [...state.education, education],
    })),
  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((exp) => exp.id !== id),
    })),
  updateEducation: (id, updatedEducation) =>
    set((state) => ({
      education: state.education.map((exp) =>
        exp.id === id ? { ...exp, ...updatedEducation } : exp
      ),
    })),
  reorderEducation: (newList) =>
    set(() => {
      return { education: newList };
    }),
});
