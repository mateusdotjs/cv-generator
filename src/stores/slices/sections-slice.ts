import { create, type StateCreator } from "zustand";
import type { SectionMeta } from "../types";
import {
  createSectionMeta,
  educationTemplate,
  experienceTemplate,
  personalTemplate,
  projectsTemplate,
  summaryTemplate,
} from "../sections.factory";

const personal = createSectionMeta(personalTemplate);
const summary = createSectionMeta(summaryTemplate);
const experience = createSectionMeta(experienceTemplate);

export type SectionsSlice = {
  sectionsOrder: string[];
  sectionsMeta: Record<string, SectionMeta>;
  createSection: (meta: SectionMeta) => void;
  removeSection: (id: string) => void;
  updateSectionTitle: (id: string, title: string) => void;
  moveSection: (from: number, to: number) => void;
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
  sectionsOrder: [personal.id],
  sectionsMeta: {
    [personal.id]: {
      ...personal,
    },
  },

  //---------------------------------------------------------------------------
  // Actions
  //---------------------------------------------------------------------------
  createSection: (meta) =>
    set((state) => {
      let alreadyExists: boolean = false;

      if (meta.type !== "custom" && meta.type !== "custom-simple") {
        alreadyExists = state.sectionsOrder.some(
          (sec) => state.sectionsMeta[sec].type === meta.type
        );
      }

      if (alreadyExists) return state;

      return {
        sectionsMeta: {
          ...state.sectionsMeta,
          [meta.id]: meta,
        },
        sectionsOrder: [...state.sectionsOrder, meta.id],
      };
    }),
  removeSection: (id) =>
    set((state) => {
      const meta = state.sectionsMeta[id];

      if (!meta || !meta.removable) return state;

      const newMeta = { ...state.sectionsMeta };
      delete newMeta[id];

      return {
        sectionsMeta: newMeta,
        sectionsOrder: state.sectionsOrder.filter((s) => s !== id),
      };
    }),
  updateSectionTitle: (id, title) =>
    set((state) => ({
      sectionsMeta: {
        ...state.sectionsMeta,
        [id]: {
          ...state.sectionsMeta[id],
          title,
        },
      },
    })),
  moveSection: (from, to) => {
    const { sectionsOrder, sectionsMeta } = get();

    const movingId = sectionsOrder[from];
    const targetId = sectionsOrder[to];

    if (!sectionsMeta[movingId].movable) return;
    if (!sectionsMeta[targetId].movable) return;

    const newOrder = [...sectionsOrder];
    const [removed] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, removed);

    set({ sectionsOrder: newOrder });
  },
});
