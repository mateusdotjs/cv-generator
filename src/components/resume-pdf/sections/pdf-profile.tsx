import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import type { PersonalDetails } from "@/stores/types";

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  fullName: { fontSize: "20pt", fontWeight: "bold", marginBottom: "4px" },
  personJobTitle: { fontSize: "16pt", marginBottom: "8px" },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infosContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
  },
  infoText: {
    fontSize: "11pt",
  },
  image: {
    width: "16px",
    height: "16px",
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

function PDFProfile({ personalDetails }: { personalDetails: PersonalDetails }) {
  if (!personalDetails) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.fullName}>{personalDetails.fullName}</Text>
      <Text style={styles.personJobTitle}>
        {personalDetails.personJobTitle}
      </Text>

      <View style={styles.infosContainer}>
        <View style={styles.info}>
          {personalDetails.email && (
            <Image src="/src/assets/mail.png" style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.email}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.phone && (
            <Image src="/src/assets/phone.png" style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.phone}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.location && (
            <Image src="/src/assets/map-pin.png" style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.location}</Text>
        </View>
      </View>
    </View>
  );
}

export default PDFProfile;
