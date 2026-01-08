import type { SectionMeta, SectionType } from "./types";

export const personalTemplate = {
  type: "personal" as SectionType,
  title: "resume.sections.personal",
  description: "resume.sections.personalDesc",
  removable: false,
  movable: false,
};

export const summaryTemplate = {
  type: "summary" as SectionType,
  title: "resume.sections.summary",
  description: "resume.sections.summaryDesc",
  removable: true,
  movable: true,
};

export const experienceTemplate = {
  type: "experience" as SectionType,
  title: "resume.sections.experience",
  description: "resume.sections.experienceDesc",
  removable: true,
  movable: true,
};

export const educationTemplate = {
  type: "education" as SectionType,
  title: "resume.sections.education",
  description: "resume.sections.educationDesc",
  removable: true,
  movable: true,
};

export const projectsTemplate = {
  type: "projects" as SectionType,
  title: "resume.sections.projects",
  description: "resume.sections.projectsDesc",
  removable: true,
  movable: true,
};

export const customTemplate = {
  type: "custom" as SectionType,
  title: "resume.sections.custom",
  removable: true,
  movable: true,
};

export const customSimpleTemplate = {
  type: "custom-simple" as SectionType,
  title: "resume.sections.customSimple",
  removable: true,
  movable: true,
};

export function createSectionMeta(
  template: Omit<SectionMeta, "id">
): SectionMeta {
  return {
    id: crypto.randomUUID(),
    ...template,
  };
}
