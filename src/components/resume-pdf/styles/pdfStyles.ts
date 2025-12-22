import { StyleSheet } from "@react-pdf/renderer";

export const gs = StyleSheet.create({
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
  itemContainer: {
    marginBottom: "4px",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  titleBold: {
    fontSize: "13pt",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  subtitleItalic: {
    fontSize: "12pt",
    fontStyle: "italic",
  },
  bodyText: {
    fontSize: "11pt",
    lineHeight: 1.3,
  },
});
