import type {
  CustomItem,
  Education,
  Experience,
  PersonalDetails,
  Project,
  SectionMeta,
} from "@/stores/types";
import PDFSectionRenderer from "./pdf-section-renderer";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";

type cvSnapshot = {
  sectionsOrder: string[];
  sectionsMeta: Record<string, SectionMeta>;
  personalDetails: PersonalDetails;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  customItems: Record<string, CustomItem[]>;
};

function PDFDocument({
  cvSnapshot,
  renderKey,
}: {
  cvSnapshot: cvSnapshot;
  renderKey: number;
}) {
  return (
      <PDFViewer style={{ width: "100%", height: "100%" }} key={renderKey}>
        <Document
          title={cvSnapshot.personalDetails.fullName}
          author="cv-generator"
          producer="cv-generator"
        >
          <Page
            wrap
            size="A4"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              padding: "36px",
            }}
          >
            {cvSnapshot.sectionsOrder.map((sectionId, i) => (
              <PDFSectionRenderer
                key={sectionId + i}
                id={sectionId}
                cvSnapshot={cvSnapshot}
              />
            ))}
          </Page>
        </Document>
      </PDFViewer>
  );
}

export default PDFDocument;
