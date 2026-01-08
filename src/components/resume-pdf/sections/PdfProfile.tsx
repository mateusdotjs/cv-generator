import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import type { PersonalDetails } from "@/stores/types";
import mailIcon from "@/assets/mail.png";
import phoneIcon from "@/assets/phone.png";
import mapPinIcon from "@/assets/map-pin.png";
import linkedinIcon from "@/assets/linkedin.png";
import websiteIcon from "@/assets/globe.png";
import { gs } from "@/components/resume-pdf/styles/pdfStyles";

const styles = StyleSheet.create({
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
  image: { width: "16px", height: "16px" },
});

function PDFProfile({ personalDetails }: { personalDetails: PersonalDetails }) {
  if (!personalDetails) return null;

  const infos = [
    { data: personalDetails.email, icon: mailIcon },
    { data: personalDetails.phone, icon: phoneIcon },
    { data: personalDetails.location, icon: mapPinIcon },
    { data: personalDetails.linkedin, icon: linkedinIcon },
    { data: personalDetails.website, icon: websiteIcon },
  ];

  return (
    <View style={[gs.section, { marginBottom: "12px" }]}>
      <Text style={styles.fullName}>{personalDetails.fullName}</Text>
      <Text style={styles.personJobTitle}>
        {personalDetails.personJobTitle}
      </Text>
      <View style={styles.infosContainer}>
        {infos.map(
          (item, index) =>
            item.data && (
              <View key={index} style={styles.info}>
                <Image src={item.icon} style={styles.image} />
                <Text style={gs.bodyText}>{item.data}</Text>
              </View>
            )
        )}
      </View>
    </View>
  );
}
export default PDFProfile;
