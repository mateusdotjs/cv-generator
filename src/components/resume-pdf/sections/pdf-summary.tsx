import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import { Text, View } from "@react-pdf/renderer";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

function PDFSummary({
  sectionTitle,
  summary,
}: {
  sectionTitle: string;
  summary: string;
}) {
  if (isEmptyParagraph(summary) || summary.trim() === "") return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      <View style={gs.bodyText}>{htmlToPdf(summary)}</View>
    </View>
  );
}
export default PDFSummary;
