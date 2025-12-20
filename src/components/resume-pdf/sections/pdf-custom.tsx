import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CustomItem, Experience } from "@/stores/types";
import { htmlToPdf } from "@/lib/htmlToPdf";
import { formatDate } from "@/lib/formatDate";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";

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
  jobTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  jobTitle: {
    fontSize: "12pt",
    fontStyle: "italic",
  },
  jobDescription: {
    fontSize: "11pt",
    lineHeight: 1.3,
  },
});

export function PDFCustom({
  sectionTitle,
  customItem,
}: {
  sectionTitle: string;
  customItem: CustomItem[];
}) {
  if (!customItem || customItem.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {customItem.map((item) => (
        <View key={item.id} style={styles.jobInfoContainer}>
          <Text style={styles.companyName}>{item.institution}</Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            {item.startDate && (
              <Text style={styles.jobTitle}>
                {formatDate(item.startDate)} — {formatDate(item.endDate)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(item.description) && (
            <View style={styles.jobDescription}>
              {htmlToPdf(item.description)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default PDFCustom;
