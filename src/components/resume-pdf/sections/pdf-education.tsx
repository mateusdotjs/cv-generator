import { Text, View } from "@react-pdf/renderer";
import type { Education } from "@/stores/types";
import { formatDate } from "@/lib/formatDate";
import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

function PDFEducation({
  sectionTitle,
  education,
}: {
  sectionTitle: string;
  education: Education[];
}) {
  if (!education || education.length === 0) return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      {education.map((edu) => (
        <View key={edu.id} style={gs.itemContainer}>
          <Text style={gs.titleBold}>{edu.school}</Text>
          <View style={gs.headerRow}>
            <Text style={gs.subtitleItalic}>{edu.degree}</Text>
            {edu.startDate && (
              <Text style={gs.subtitleItalic}>
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(edu.description) && (
            <View style={gs.bodyText}>{htmlToPdf(edu.description)}</View>
          )}
        </View>
      ))}
    </View>
  );
}
export default PDFEducation;
