import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import type { CustomSimple } from "@/stores/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5px",
  },
  sectionTitle: {
    fontSize: "16pt",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  companyName: {
    fontSize: "13pt",
    marginBottom: "4px",
    fontWeight: "bold",
  },
  jobInfoContainer: {
    marginBottom: "4px",
  },
  jobDescription: {
    fontSize: "11pt",
    lineHeight: 1.3,
  },
});

function PDFCustomSimple({
  sectionTitle,
  customSimple,
}: {
  sectionTitle: string;
  customSimple: CustomSimple;
}) {
  if (
    isEmptyParagraph(customSimple.description) ||
    customSimple.description.trim() === "" ||
    !customSimple
  )
    return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      <View key={customSimple.description} style={styles.jobInfoContainer}>
        {!isEmptyParagraph(customSimple.description) && (
          <View style={styles.jobDescription}>
            {htmlToPdf(customSimple.description)}
          </View>
        )}
      </View>
    </View>
  );
}

export default PDFCustomSimple;
