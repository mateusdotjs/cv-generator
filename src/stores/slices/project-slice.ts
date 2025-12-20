import type { StateCreator } from "zustand";
import type { Project } from "../types";

export type ProjectsSlice = {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, updatedProject: Partial<Project>) => void;
  reorderProject: (newList: Project[]) => void;
};

export const createProjectsSlice: StateCreator<
  ProjectsSlice,
  [],
  [],
  ProjectsSlice
> = (set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updatedProject } : proj
      ),
    })),
  reorderProject: (newList: Project[]) =>
    set(() => {
      return { projects: newList };
    }),
});
