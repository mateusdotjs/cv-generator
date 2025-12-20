import type { SectionMeta, SectionType } from "./types";

export const personalTemplate = {
  type: "personal" as SectionType,
  title: "Dados Pessoais",
  description: "Seu nome, informações de contato e outros dados pessoais.",
  removable: false,
  movable: false,
};

export const summaryTemplate = {
  type: "summary" as SectionType,
  title: "Resumo Profissional",
  description:
    "Um breve resumo ou objetivo destacando suas metas de carreira e principais qualificações.",
  removable: true,
  movable: true,
};

export const experienceTemplate = {
  type: "experience" as SectionType,
  title: "Experiência Profissional",
  description:
    "Detalhes sobre seus empregos anteriores, incluindo cargo, nome da empresa, datas de trabalho e principais responsabilidades ou conquistas.",
  removable: true,
  movable: true,
};

export const educationTemplate = {
  type: "education" as SectionType,
  title: "Formação Acadêmica",
  description:
    "Informações sobre sua formação educacional, incluindo diplomas obtidos, instituições frequentadas e datas de conclusão.",
  removable: true,
  movable: true,
};

export const projectsTemplate = {
  type: "projects" as SectionType,
  title: "Projetos",
  description: "Projetos pessoais que você desenvolveu.",
  removable: true,
  movable: true,
};

export const customTemplate = {
  type: "custom" as SectionType,
  title: "Seção Personalizada",
  removable: true,
  movable: true,
};

export const customSimpleTemplate = {
  type: "custom-simple" as SectionType,
  title: "Seção Personalizada Simples",
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
