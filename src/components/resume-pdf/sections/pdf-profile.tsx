import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import type { PersonalDetails } from "@/stores/types";
import mailIcon from "@/assets/mail.png";
import phoneIcon from "@/assets/phone.png";
import mapPinIcon from "@/assets/map-pin.png";
import linkedinIcon from "@/assets/linkedin.png";
import websiteIcon from "@/assets/globe.png";

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  },
  fullName: { fontSize: "20pt", fontWeight: "bold", marginBottom: "4px" },
  personJobTitle: { fontSize: "16pt", marginBottom: "8px" },
  infosContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "4px",
    marginRight: "24px",
    marginBottom: "8px",
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
            <Image src={mailIcon} style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.email}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.phone && (
            <Image src={phoneIcon} style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.phone}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.location && (
            <Image src={mapPinIcon} style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.location}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.linkedin && (
            <Image src={linkedinIcon} style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.linkedin}</Text>
        </View>

        <View style={styles.info}>
          {personalDetails.website && (
            <Image src={websiteIcon} style={styles.image} />
          )}
          <Text style={styles.infoText}>{personalDetails.website}</Text>
        </View>
      </View>
    </View>
  );
}

export default PDFProfile;
