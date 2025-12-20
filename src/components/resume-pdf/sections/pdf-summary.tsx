import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5px",
  },
  summaryTitle: {
    fontSize: "16pt",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  summary: {
    fontSize: "11pt",
    lineHeight: 1.3,
  },
});

function PDFSummary({
  sectionTitle,
  summary,
}: {
  sectionTitle: string;
  summary: string;
}) {
  if (isEmptyParagraph(summary) || summary.trim() === "") return null;
  return (
    <View style={styles.section}>
      <Text style={styles.summaryTitle}>{sectionTitle}</Text>
      <View style={styles.summary}>{htmlToPdf(summary)}</View>
    </View>
  );
}

export default PDFSummary;
