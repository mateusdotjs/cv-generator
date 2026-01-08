import { useCvStore } from "@/stores/cvStore";
import PersonalDetailsForm from "./sections/PersonalDetailsForm";
import ExperienceForm from "./sections/ExperienceForm";
import EducationForm from "./sections/EducationForm";
import CustomForm from "./sections/CustomForm";
import ProjectsForm from "./sections/ProjectsForm";
import CustomSimpleForm from "./sections/CustomSimpleForm";
import SummaryForm from "./sections/SummaryForm";

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
