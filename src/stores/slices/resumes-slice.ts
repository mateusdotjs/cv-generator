import type { StateCreator } from "zustand";
import { createSectionMeta, personalTemplate } from "../sections.factory";
import type { SectionMeta } from "../types";
import type { PersonalDetails } from "../types";

export const DEFAULT_RESUME_NAME = "Meu Currículo";

const emptyPersonalDetails: PersonalDetails = {
  personJobTitle: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
};

export type Resume = {
  id: string;
  name: string;
  language: "pt-BR" | "en";
  createdAt: Date;
  updatedAt: Date;
};

export type ResumesSlice = {
  resumes: Resume[];
  createResume: (name: string) => string;
  deleteResume: (resumeId: string) => void;
  renameResume: (resumeId: string, name: string) => void;
  setResumeLanguage: (resumeId: string, language: "pt-BR" | "en") => void;
  listResumes: () => Resume[];
};

export const createResumesSlice: StateCreator<any, [], [], ResumesSlice> = (
  set,
  get
) => {
  return {
    resumes: [],

    createResume: (name) => {
      const id = crypto.randomUUID();
      const now = new Date();
      const personalMeta: SectionMeta = createSectionMeta(personalTemplate);

      set((state: any) => ({
        resumes: [...state.resumes, { id, name, language: "pt-BR", createdAt: now, updatedAt: now }],

        experiences: { ...(state.experiences ?? {}), [id]: [] },
        education: { ...(state.education ?? {}), [id]: [] },
        projects: { ...(state.projects ?? {}), [id]: [] },
        summary: { ...(state.summary ?? {}), [id]: "" },
        personalDetails: { ...(state.personalDetails ?? {}), [id]: emptyPersonalDetails },

        sectionsOrder: { ...(state.sectionsOrder ?? {}), [id]: [personalMeta.id] },
        sectionsMeta: {
          ...(state.sectionsMeta ?? {}),
          [id]: {
            [personalMeta.id]: personalMeta,
          },
        },
        customItems: { ...(state.customItems ?? {}), [id]: {} },
        customSimple: { ...(state.customSimple ?? {}), [id]: {} },
      }));

      return id;
    },

    deleteResume: (resumeId) => {
      set((state: any) => {
        const nextResumes = state.resumes.filter((r: Resume) => r.id !== resumeId);

        const { [resumeId]: _exp, ...nextExperiences } = state.experiences ?? {};
        const { [resumeId]: _edu, ...nextEducation } = state.education ?? {};
        const { [resumeId]: _proj, ...nextProjects } = state.projects ?? {};
        const { [resumeId]: _sum, ...nextSummary } = state.summary ?? {};
        const { [resumeId]: _pd, ...nextPersonalDetails } =
          state.personalDetails ?? {};
        const { [resumeId]: _so, ...nextSectionsOrder } = state.sectionsOrder ?? {};
        const { [resumeId]: _sm, ...nextSectionsMeta } = state.sectionsMeta ?? {};
        const { [resumeId]: _ci, ...nextCustomItems } = state.customItems ?? {};
        const { [resumeId]: _cs, ...nextCustomSimple } = state.customSimple ?? {};

        return {
          resumes: nextResumes,
          experiences: nextExperiences,
          education: nextEducation,
          projects: nextProjects,
          summary: nextSummary,
          personalDetails: nextPersonalDetails,
          sectionsOrder: nextSectionsOrder,
          sectionsMeta: nextSectionsMeta,
          customItems: nextCustomItems,
          customSimple: nextCustomSimple,
        };
      });
    },

    renameResume: (resumeId, name) => {
      const now = new Date();
      set((state: { resumes: Resume[] }) => ({
        resumes: state.resumes.map((r: Resume) =>
          r.id === resumeId ? { ...r, name, updatedAt: now } : r
        ),
      }));
    },

    setResumeLanguage: (resumeId, language) => {
      const now = new Date();
      set((state: { resumes: Resume[] }) => ({
        resumes: state.resumes.map((r: Resume) =>
          r.id === resumeId ? { ...r, language, updatedAt: now } : r
        ),
      }));
    },

    listResumes: () => get().resumes,
  };
};
