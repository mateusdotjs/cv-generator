import type { StateCreator } from "zustand";
import type { CustomItem } from "../types";

export type CustomItemsSlice = {
  customItems: Record<string, Record<string, CustomItem[]>>;
  addCustomItem: (resumeId: string, sectionId: string, item: CustomItem) => void;
  updateCustomItem: (
    resumeId: string,
    sectionId: string,
    itemId: string,
    updated: Partial<CustomItem>
  ) => void;
  removeCustomItem: (resumeId: string, sectionId: string, itemId: string) => void;
  reorderCustomItem: (
    resumeId: string,
    sectionId: string,
    newList: CustomItem[]
  ) => void;
};

export const createCustomItemsSlice: StateCreator<
  CustomItemsSlice,
  [],
  [],
  CustomItemsSlice
> = (set) => ({
  customItems: {},
  addCustomItem: (resumeId, sectionId, item) =>
    set((state) => {
      const resumeCustom = state.customItems[resumeId] ?? {};
      return {
        customItems: {
          ...state.customItems,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: [...(resumeCustom[sectionId] ?? []), item],
          },
        },
      };
    }),
  updateCustomItem: (resumeId, sectionId, itemId, data) =>
    set((state) => {
      const resumeCustom = state.customItems[resumeId] ?? {};
      return {
        customItems: {
          ...state.customItems,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: (resumeCustom[sectionId] ?? []).map((i) =>
              i.id === itemId ? { ...i, ...data } : i
            ),
          },
        },
      };
    }),
  removeCustomItem: (resumeId, sectionId, itemId) =>
    set((state) => {
      const resumeCustom = state.customItems[resumeId] ?? {};
      return {
        customItems: {
          ...state.customItems,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: (resumeCustom[sectionId] ?? []).filter(
              (i) => i.id !== itemId
            ),
          },
        },
      };
    }),
  reorderCustomItem: (resumeId, sectionId, newList) => {
    set((state) => {
      const resumeCustom = state.customItems[resumeId] ?? {};
      return {
        customItems: {
          ...state.customItems,
          [resumeId]: {
            ...resumeCustom,
            [sectionId]: newList,
          },
        },
      };
    });
  },
});
