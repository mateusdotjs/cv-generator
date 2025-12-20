import type { StateCreator } from "zustand";
import type { CustomItem } from "../types";

export type CustomItemsSlice = {
  customItems: Record<string, CustomItem[]>;
  addCustomItem: (sectionId: string, item: CustomItem) => void;
  updateCustomItem: (
    sectionId: string,
    itemId: string,
    updated: Partial<CustomItem>
  ) => void;
  removeCustomItem: (sectionId: string, itemId: string) => void;
  reorderCustomItem: (sectionId: string, newList: CustomItem[]) => void;
};

export const createCustomItemsSlice: StateCreator<
  CustomItemsSlice,
  [],
  [],
  CustomItemsSlice
> = (set, get) => ({
  // { "custom-123": [ CustomItem, CustomItem ... ] }
  customItems: {},
  addCustomItem: (sectionId, item) =>
    set((state) => ({
      customItems: {
        ...state.customItems,
        [sectionId]: [...(state.customItems[sectionId] || []), item],
      },
    })),
  updateCustomItem: (sectionId, itemId, data) =>
    set((state) => ({
      customItems: {
        ...state.customItems,
        [sectionId]: state.customItems[sectionId].map((i) =>
          i.id === itemId ? { ...i, ...data } : i
        ),
      },
    })),
  removeCustomItem: (sectionId, itemId) =>
    set((state) => ({
      customItems: {
        ...state.customItems,
        [sectionId]: state.customItems[sectionId].filter(
          (i) => i.id !== itemId
        ),
      },
    })),
  reorderCustomItem: (sectionId, newList) => {
    set((state) => ({
      customItems: {
        ...state.customItems,
        [sectionId]: newList,
      },
    }));
  },
});
