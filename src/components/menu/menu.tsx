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

function Menu() {
  const {
    createSection,
    createCustomSimpleSection,
    sectionsOrder,
    sectionsMeta,
  } = useCvStore();

  function alreadyExists(type: string): boolean {
    return sectionsOrder.some((sec) => sectionsMeta[sec].type === type);
  }

  const buttonList = [
    {
      label: "Adicionar Resumo Profissional",
      action: () => {
        createSection(createSectionMeta(summaryTemplate));
      },
      alreadyExists: alreadyExists(summaryTemplate.type),
    },
    {
      label: "Adicionar Experiência",
      action: () => {
        createSection(createSectionMeta(experienceTemplate));
      },
      alreadyExists: alreadyExists(experienceTemplate.type),
    },
    {
      label: "Adicionar Formação",
      action: () => {
        createSection(createSectionMeta(educationTemplate));
      },
      alreadyExists: alreadyExists(educationTemplate.type),
    },
    {
      label: "Adicionar Projetos",
      action: () => {
        createSection(createSectionMeta(projectsTemplate));
      },
      alreadyExists: alreadyExists(projectsTemplate.type),
    },
    {
      label: "Adicionar Seção Customizada",
      action: () => {
        createSection(createSectionMeta(customTemplate));
      },
      alreadyExists: false,
    },
    {
      label: "Adicionar Seção Customizada (Simples)",
      action: () => {
        createCustomSimpleSection(createSectionMeta(customSimpleTemplate));
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
