import { Text, View } from "@react-pdf/renderer";
import type { CustomItem } from "@/stores/types";
import { htmlToPdf } from "@/lib/htmlToPdf";
import { formatDate } from "@/lib/formatDate";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

export function PDFCustom({
  sectionTitle,
  customItem,
  language,
}: {
  sectionTitle: string;
  customItem: CustomItem[];
  language: "pt-BR" | "en";
}) {
  if (!customItem || customItem.length === 0) return null;
  return (
    <View style={gs.section}>
      <Text style={gs.sectionTitle}>{sectionTitle}</Text>
      {customItem.map((item) => (
        <View key={item.id} style={gs.itemContainer}>
          <Text style={gs.titleBold}>{item.institution}</Text>
          <View style={gs.headerRow}>
            <Text style={gs.subtitleItalic}>{item.title}</Text>
            {item.startDate && (
              <Text style={gs.subtitleItalic}>
                {formatDate(item.startDate, language)} — {formatDate(item.endDate, language)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(item.description) && (
            <View style={gs.bodyText}>{htmlToPdf(item.description)}</View>
          )}
        </View>
      ))}
    </View>
  );
}
export default PDFCustom;
