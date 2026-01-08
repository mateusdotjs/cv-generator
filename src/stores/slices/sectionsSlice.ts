import { type StateCreator } from "zustand";
import type { SectionMeta } from "../types";
 

export type SectionsSlice = {
  sectionsOrder: Record<string, string[]>;
  sectionsMeta: Record<string, Record<string, SectionMeta>>;
  createSection: (resumeId: string, meta: SectionMeta) => void;
  removeSection: (resumeId: string, id: string) => void;
  updateSectionTitle: (resumeId: string, id: string, title: string) => void;
  moveSection: (resumeId: string, from: number, to: number) => void;
};

export const createSectionsSlice: StateCreator<
  SectionsSlice,
  [],
  [],
  SectionsSlice
> = (set, get) => ({
  //---------------------------------------------------------------------------
  // Initial State
  //---------------------------------------------------------------------------
  sectionsOrder: {},
  sectionsMeta: {},

  //---------------------------------------------------------------------------
  // Actions
  //---------------------------------------------------------------------------
  createSection: (resumeId, meta) =>
    set((state) => {
      let alreadyExists: boolean = false;

      const sectionsOrder = state.sectionsOrder[resumeId] ?? [];
      const sectionsMeta = state.sectionsMeta[resumeId] ?? {};

      if (meta.type !== "custom" && meta.type !== "custom-simple") {
        alreadyExists = sectionsOrder.some(
          (sec) => sectionsMeta[sec].type === meta.type
        );
      }

      if (alreadyExists) return state;

      return {
        sectionsMeta: {
          ...state.sectionsMeta,
          [resumeId]: {
            ...sectionsMeta,
            [meta.id]: meta,
          },
        },
        sectionsOrder: {
          ...state.sectionsOrder,
          [resumeId]: [...sectionsOrder, meta.id],
        },
      };
    }),
  removeSection: (resumeId, id) =>
    set((state) => {
      const sectionsOrder = state.sectionsOrder[resumeId] ?? [];
      const sectionsMeta = state.sectionsMeta[resumeId] ?? {};

      const meta = sectionsMeta[id];

      if (!meta || !meta.removable) return state;

      const newMeta = { ...sectionsMeta };
      delete newMeta[id];

      return {
        sectionsMeta: {
          ...state.sectionsMeta,
          [resumeId]: newMeta,
        },
        sectionsOrder: {
          ...state.sectionsOrder,
          [resumeId]: sectionsOrder.filter((s) => s !== id),
        },
      };
    }),
  updateSectionTitle: (resumeId, id, title) =>
    set((state) => {
      const sectionsMeta = state.sectionsMeta[resumeId] ?? {};
      if (!sectionsMeta[id]) return state;

      return {
        sectionsMeta: {
          ...state.sectionsMeta,
          [resumeId]: {
            ...sectionsMeta,
            [id]: {
              ...sectionsMeta[id],
              title,
            },
          },
        },
      };
    }),
  moveSection: (resumeId, from, to) => {
    const { sectionsOrder, sectionsMeta } = get();
    const order = sectionsOrder[resumeId] ?? [];
    const meta = sectionsMeta[resumeId] ?? {};

    const movingId = order[from];
    const targetId = order[to];

    if (!movingId || !targetId) return;

    if (!meta[movingId]?.movable) return;
    if (!meta[targetId]?.movable) return;

    const newOrder = [...order];
    const [removed] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, removed);

    set((state) => ({
      sectionsOrder: {
        ...state.sectionsOrder,
        [resumeId]: newOrder,
      },
    }));
  },
});
