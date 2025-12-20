import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Experience } from "@/stores/types";
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

function PDFExperience({
  sectionTitle,
  experiences,
}: {
  sectionTitle: string;
  experiences: Experience[];
}) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {experiences.map((exp) => (
        <View key={exp.id} style={styles.jobInfoContainer}>
          <Text style={styles.companyName}>{exp.company}</Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
            {exp.startDate && (
              <Text style={styles.jobTitle}>
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(exp.description) && (
            <View style={styles.jobDescription}>
              {htmlToPdf(exp.description)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default PDFExperience;
