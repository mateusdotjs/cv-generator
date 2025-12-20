import type { Education } from "@/stores/types";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDate } from "@/lib/formatDate";
import { htmlToPdf } from "@/lib/htmlToPdf";
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
    fontSize: "14pt",
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

function PDFEducation({
  sectionTitle,
  education,
}: {
  sectionTitle: string;
  education: Education[];
}) {
  if (!education || education.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {education.map((edu) => (
        <View key={edu.id} style={styles.jobInfoContainer}>
          <Text style={styles.companyName}>{edu.school}</Text>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            {edu.startDate && (
              <Text style={styles.jobTitle}>
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </Text>
            )}
          </View>
          {!isEmptyParagraph(edu.description) && (
            <View style={styles.jobDescription}>
              {htmlToPdf(edu.description)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default PDFEducation;
