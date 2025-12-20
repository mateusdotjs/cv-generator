import { useCvStore } from "@/stores/cv-store";
import PersonalDetailsForm from "./sections/personal-details-form";
import ExperienceForm from "./sections/experience-form";
import EducationForm from "./sections/education-form";
import CustomForm from "./sections/custom-form";
import ProjectsForm from "./sections/projects-form";
import CustomSimpleForm from "./sections/custom-simple-form";
import SummaryForm from "./sections/summary-form";

function SectionRenderer({ id }: { id: string }) {
  const meta = useCvStore((s) => s.sectionsMeta[id]);

  if (!meta) return null;

  switch (meta.type) {
    case "personal":
      return <PersonalDetailsForm />;

    case "summary":
      return <SummaryForm />;

    case "experience":
      return <ExperienceForm />;

    case "education":
      return <EducationForm />;

    case "projects":
      return <ProjectsForm />;

    case "custom-simple":
      return <CustomSimpleForm sectionId={id} />;

    case "custom":
      return <CustomForm sectionId={id} />;

    default:
      return null;
  }
}

export default SectionRenderer;
