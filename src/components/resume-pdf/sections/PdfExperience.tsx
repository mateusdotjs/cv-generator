import { Text, View } from "@react-pdf/renderer";
import type { Experience } from "@/stores/types";
import { htmlToPdf } from "@/lib/htmlToPdf";
import { formatDate } from "@/lib/formatDate";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

function PDFExperience({
  sectionTitle,
  experiences,
  language,
}: {
  sectionTitle: string;
  experiences: Experience[];
  language: "pt-BR" | "en";
}) {
  if (!experiences || experiences.length === 0) return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      {experiences.map((exp) => (
        <View key={exp.id} style={gs.itemContainer}>
          <Text style={gs.titleBold}>{exp.company}</Text>
          <View style={gs.headerRow}>
            <Text style={gs.subtitleItalic}>{exp.jobTitle}</Text>
            {exp.startDate && (
              <Text style={gs.subtitleItalic}>
                {formatDate(exp.startDate, language)} — {formatDate(exp.endDate, language)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(exp.description) && (
            <View style={gs.bodyText}>{htmlToPdf(exp.description)}</View>
          )}
        </View>
      ))}
    </View>
  );
}
export default PDFExperience;
