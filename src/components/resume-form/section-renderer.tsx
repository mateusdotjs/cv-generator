import { useCvStore } from "@/stores/cv-store";
import PersonalDetailsForm from "./sections/personal-details-form";
import ExperienceForm from "./sections/experience-form";
import EducationForm from "./sections/education-form";
import CustomForm from "./sections/custom-form";
import ProjectsForm from "./sections/projects-form";
import CustomSimpleForm from "./sections/custom-simple-form";
import SummaryForm from "./sections/summary-form";

function SectionRenderer({ id, resumeId }: { id: string; resumeId: string }) {
  const meta = useCvStore((s) => s.sectionsMeta[resumeId]?.[id]);

  if (!meta) return null;

  switch (meta.type) {
    case "personal":
      return <PersonalDetailsForm resumeId={resumeId} />;

    case "summary":
      return <SummaryForm resumeId={resumeId} />;

    case "experience":
      return <ExperienceForm resumeId={resumeId} />;

    case "education":
      return <EducationForm resumeId={resumeId} />;

    case "projects":
      return <ProjectsForm resumeId={resumeId} />;

    case "custom-simple":
      return <CustomSimpleForm resumeId={resumeId} sectionId={id} />;

    case "custom":
      return <CustomForm resumeId={resumeId} sectionId={id} />;

    default:
      return null;
  }
}

export default SectionRenderer;
