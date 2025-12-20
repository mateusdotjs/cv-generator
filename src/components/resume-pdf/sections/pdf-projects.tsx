import { htmlToPdf } from "@/lib/htmlToPdf";
import { isEmptyParagraph } from "@/lib/isEmptyParagraph";
import type { Project } from "@/stores/types";
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

function PDFProjects({
  sectionTitle,
  projects,
}: {
  sectionTitle: string;
  projects: Project[];
}) {
  if (!projects || projects.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      {projects.map((proj) => (
        <View key={proj.id} style={styles.jobInfoContainer}>
          <Text style={styles.companyName}>{proj.title}</Text>
          {!isEmptyParagraph(proj.description) && (
            <View style={styles.jobDescription}>
              {htmlToPdf(proj.description)}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default PDFProjects;
