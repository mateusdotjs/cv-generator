import type { StateCreator } from "zustand";
import type { Project } from "../types";

export type ProjectsSlice = {
  projects: Record<string, Project[]>;
  addProject: (resumeId: string, project: Project) => void;
  removeProject: (resumeId: string, id: string) => void;
  updateProject: (
    resumeId: string,
    id: string,
    updatedProject: Partial<Project>
  ) => void;
  reorderProject: (resumeId: string, newList: Project[]) => void;
};

export const createProjectsSlice: StateCreator<
  ProjectsSlice,
  [],
  [],
  ProjectsSlice
> = (set) => ({
  projects: {},
  addProject: (resumeId, project) =>
    set((state) => ({
      projects: {
        ...state.projects,
        [resumeId]: [...(state.projects[resumeId] ?? []), project],
      },
    })),
  removeProject: (resumeId, id) =>
    set((state) => ({
      projects: {
        ...state.projects,
        [resumeId]: (state.projects[resumeId] ?? []).filter(
          (proj) => proj.id !== id
        ),
      },
    })),
  updateProject: (resumeId, id, updatedProject) =>
    set((state) => ({
      projects: {
        ...state.projects,
        [resumeId]: (state.projects[resumeId] ?? []).map((proj) =>
          proj.id === id ? { ...proj, ...updatedProject } : proj
        ),
      },
    })),
  reorderProject: (resumeId, newList: Project[]) =>
    set((state) => ({
      projects: {
        ...state.projects,
        [resumeId]: newList,
      },
    })),
});
