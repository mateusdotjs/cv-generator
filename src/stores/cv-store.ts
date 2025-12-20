import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createExperienceSlice,
  type ExperienceSlice,
} from "./slices/experience-slice";
import {
  createEducationSlice,
  type EducationSlice,
} from "./slices/education-slice";
import {
  createPersonalDetailsSlice,
  type PersonalDetailsSlice,
} from "./slices/personal-details-slice";
import {
  createSectionsSlice,
  type SectionsSlice,
} from "./slices/sections-slice";
import {
  createCustomItemsSlice,
  type CustomItemsSlice,
} from "./slices/custom-items-slice";
import { convertDates } from "@/lib/convertDates";
import {
  createProjectsSlice,
  type ProjectsSlice,
} from "./slices/project-slice";
import {
  createCustomSimpleSlice,
  type CustomSimpleSlice,
} from "./slices/custom-items-simple-slice";
import { createSummarySlice, type SummarySlice } from "./slices/summary-slice";
import type { SectionMeta } from "./types";

type CvRootActions = {
  createCustomSimpleSection: (meta: SectionMeta) => void;
};

export const useCvStore = create<
  ExperienceSlice &
    EducationSlice &
    PersonalDetailsSlice &
    SummarySlice &
    CustomItemsSlice &
    CustomSimpleSlice &
    ProjectsSlice &
    SectionsSlice &
    CvRootActions
>()(
  persist(
    (set, get, store) => ({
      ...createSectionsSlice(set, get, store),
      ...createCustomItemsSlice(set, get, store),
      ...createCustomSimpleSlice(set, get, store),
      ...createProjectsSlice(set, get, store),
      ...createExperienceSlice(set, get, store),
      ...createEducationSlice(set, get, store),
      ...createSummarySlice(set, get, store),
      ...createPersonalDetailsSlice(set, get, store),

      createCustomSimpleSection: (meta) => {
        get().createSection(meta);
        get().createCustomSimple(meta.id);
      },
    }),
    {
      name: "cv",
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => {
        return {
          ...current,
          ...convertDates(persisted),
        };
      },
    }
  )
);
