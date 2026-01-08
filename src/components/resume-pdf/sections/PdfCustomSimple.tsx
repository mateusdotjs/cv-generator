import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import type { CustomSimple } from "@/stores/types";
import { Text, View } from "@react-pdf/renderer";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

function PDFCustomSimple({
  sectionTitle,
  customSimple,
}: {
  sectionTitle: string;
  customSimple: CustomSimple;
}) {
  if (!customSimple || isEmptyParagraph(customSimple.description)) return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      <View style={gs.itemContainer}>
        <View style={gs.bodyText}>{htmlToPdf(customSimple.description)}</View>
      </View>
    </View>
  );
}
export default PDFCustomSimple;
