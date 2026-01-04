import type { StateCreator } from "zustand";
import type { CustomSimple } from "../types";

export type CustomSimpleSlice = {
  customSimple: Record<string, Record<string, CustomSimple>>;
  createCustomSimple: (resumeId: string, sectionId: string) => void;
  updateCustomSimple: (resumeId: string, sectionId: string, value: string) => void;
  removeCustomSimple: (resumeId: string, sectionId: string) => void;
};

export const createCustomSimpleSlice: StateCreator<
  CustomSimpleSlice,
  [],
  [],
  CustomSimpleSlice
> = (set) => ({
  customSimple: {},
  createCustomSimple: (resumeId, sectionId) =>
    set((state) => {
      const resumeCustom = state.customSimple[resumeId] ?? {};
      return {
        customSimple: {
          ...state.customSimple,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: { description: "" },
          },
        },
      };
    }),
  updateCustomSimple: (resumeId, sectionId, value) =>
    set((state) => {
      const resumeCustom = state.customSimple[resumeId] ?? {};
      return {
        customSimple: {
          ...state.customSimple,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: { description: value },
          },
        },
      };
    }),
  removeCustomSimple: (resumeId, sectionId) =>
    set((state) => {
      const resumeCustom = state.customSimple[resumeId] ?? {};
      const { [sectionId]: _, ...rest } = resumeCustom;
      return {
        customSimple: {
          ...state.customSimple,
          [resumeId]: rest,
        },
      };
    }),
});
