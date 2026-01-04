import type { StateCreator } from "zustand";
import type { Education } from "../types";

export type EducationSlice = {
  education: Record<string, Education[]>;
  addEducation: (resumeId: string, education: Education) => void;
  removeEducation: (resumeId: string, id: string) => void;
  updateEducation: (
    resumeId: string,
    id: string,
    updatedEducation: Partial<Education>
  ) => void;
  reorderEducation: (resumeId: string, newList: Education[]) => void;
};

export const createEducationSlice: StateCreator<
  EducationSlice,
  [],
  [],
  EducationSlice
> = (set) => ({
  education: {},
  addEducation: (resumeId, education) =>
    set((state) => ({
      education: {
        ...state.education,
        [resumeId]: [...(state.education[resumeId] ?? []), education],
      },
    })),
  removeEducation: (resumeId, id) =>
    set((state) => ({
      education: {
        ...state.education,
        [resumeId]: (state.education[resumeId] ?? []).filter(
          (exp) => exp.id !== id
        ),
      },
    })),
  updateEducation: (resumeId, id, updatedEducation) =>
    set((state) => ({
      education: {
        ...state.education,
        [resumeId]: (state.education[resumeId] ?? []).map((exp) =>
          exp.id === id ? { ...exp, ...updatedEducation } : exp
        ),
      },
    })),
  reorderEducation: (resumeId, newList) =>
    set((state) => ({
      education: {
        ...state.education,
        [resumeId]: newList,
      },
    })),
});
