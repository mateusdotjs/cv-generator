import type { StateCreator } from "zustand";
import type { CustomSimple } from "../types";

export type CustomSimpleSlice = {
  customSimple: Record<string, CustomSimple>;
  createCustomSimple: (sectionId: string) => void;
  updateCustomSimple: (sectionId: string, value: string) => void;
  removeCustomSimple: (sectionId: string) => void;
};

export const createCustomSimpleSlice: StateCreator<
  CustomSimpleSlice,
  [],
  [],
  CustomSimpleSlice
> = (set) => ({
  customSimple: {},
  createCustomSimple: (sectionId) =>
    set((state) => ({
      customSimple: {
        ...state.customSimple,
        [sectionId]: { description: "" },
      },
    })),
  updateCustomSimple: (sectionId, value) =>
    set((state) => ({
      customSimple: {
        ...state.customSimple,
        [sectionId]: { description: value },
      },
    })),
  removeCustomSimple: (sectionId) =>
    set((state) => {
      const { [sectionId]: _, ...rest } = state.customSimple;
      return { customSimple: rest };
    }),
});
