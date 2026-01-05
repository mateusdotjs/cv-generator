import PDFProfile from "./sections/pdf-profile";
import PDFExperience from "./sections/pdf-experience";
import PDFEducation from "./sections/pdf-education";
import PDFCustom from "./sections/pdf-custom";
import PDFProjects from "./sections/pdf-projects";
import PDFCustomSimple from "./sections/pdf-custom-simple";
import PDFSummary from "./sections/pdf-summary";

function PDFSectionRenderer({
  id,
  cvSnapshot,
  language,
}: {
  id: string;
  cvSnapshot: any;
  language: "pt-BR" | "en";
}) {
  const meta = cvSnapshot.sectionsMeta[id];

  if (!meta) return null;

  switch (meta.type) {
    case "personal":
      return <PDFProfile personalDetails={cvSnapshot.personalDetails} />;

    case "summary":
      return (
        <PDFSummary sectionTitle={meta.title} summary={cvSnapshot.summary} />
      );

    case "experience":
      return (
        <PDFExperience
          sectionTitle={meta.title}
          experiences={cvSnapshot.experiences}
          language={language}
        />
      );

    case "education":
      return (
        <PDFEducation
          sectionTitle={meta.title}
          education={cvSnapshot.education}
          language={language}
        />
      );

    case "projects":
      return (
        <PDFProjects sectionTitle={meta.title} projects={cvSnapshot.projects} />
      );

    case "custom":
      return (
        <PDFCustom
          sectionTitle={meta.title}
          customItem={cvSnapshot.customItems[id]}
          language={language}
        />
      );

    case "custom-simple":
      return (
        <PDFCustomSimple
          sectionTitle={meta.title}
          customSimple={cvSnapshot.customSimple[id]}
        />
      );

    default:
      return null;
  }
}

export default PDFSectionRenderer;
