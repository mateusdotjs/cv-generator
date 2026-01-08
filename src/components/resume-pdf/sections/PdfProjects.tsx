import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import type { Project } from "@/stores/types";
import { Text, View } from "@react-pdf/renderer";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

function PDFProjects({
  sectionTitle,
  projects,
}: {
  sectionTitle: string;
  projects: Project[];
}) {
  if (!projects || projects.length === 0) return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      {projects.map((proj) => (
        <View key={proj.id} style={gs.itemContainer}>
          <Text style={gs.titleBold}>{proj.title}</Text>
          {!isEmptyParagraph(proj.description) && (
            <View style={gs.bodyText}>{htmlToPdf(proj.description)}</View>
          )}
        </View>
      ))}
    </View>
  );
}
export default PDFProjects;
