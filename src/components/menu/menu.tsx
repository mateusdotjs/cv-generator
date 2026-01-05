import { useCvStore } from "@/stores/cv-store";
import {
  createSectionMeta,
  customSimpleTemplate,
  customTemplate,
  educationTemplate,
  experienceTemplate,
  projectsTemplate,
  summaryTemplate,
} from "@/stores/sections.factory";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

function Menu({ resumeId }: { resumeId: string }) {
  const {
    createSection,
    createCustomSimpleSection,
    sectionsOrder,
    sectionsMeta,
  } = useCvStore();
  
  const { t } = useTranslation();

  function alreadyExists(type: string): boolean {
    const order = sectionsOrder[resumeId] ?? [];
    const meta = sectionsMeta[resumeId] ?? {};
    return order.some((sec: string) => meta[sec]?.type === type);
  }

  const buttonList = [
    {
      label: t("resume.actions.addSummary", "Adicionar Resumo Profissional"),
      action: () => {
        createSection(resumeId, createSectionMeta(summaryTemplate));
      },
      alreadyExists: alreadyExists(summaryTemplate.type),
    },
    {
      label: t("resume.actions.addExperience", "Adicionar Experiência"),
      action: () => {
        createSection(resumeId, createSectionMeta(experienceTemplate));
      },
      alreadyExists: alreadyExists(experienceTemplate.type),
    },
    {
      label: t("resume.actions.addEducation", "Adicionar Formação"),
      action: () => {
        createSection(resumeId, createSectionMeta(educationTemplate));
      },
      alreadyExists: alreadyExists(educationTemplate.type),
    },
    {
      label: t("resume.actions.addProjects", "Adicionar Projetos"),
      action: () => {
        createSection(resumeId, createSectionMeta(projectsTemplate));
      },
      alreadyExists: alreadyExists(projectsTemplate.type),
    },
    {
      label: t("resume.actions.addCustom", "Adicionar Seção Customizada"),
      action: () => {
        createSection(resumeId, createSectionMeta(customTemplate));
      },
      alreadyExists: false,
    },
    {
      label: t("resume.actions.addCustomSimple", "Adicionar Seção Customizada (Simples)"),
      action: () => {
        createCustomSimpleSection(
          resumeId,
          createSectionMeta(customSimpleTemplate)
        );
      },
      alreadyExists: false,
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {buttonList.map((button, index) => (
        <Button
          key={index}
          onClick={button.action}
          disabled={button.alreadyExists}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}

export default Menu;
