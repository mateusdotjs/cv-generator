import { useCvStore } from "@/stores/cv-store";
import { useEffect, useRef, useState } from "react";
import PDFDocument from "./pdf-document";

function ResumePDF({ resumeId }: { resumeId: string }) {
  const {
    sectionsOrder,
    sectionsMeta,
    personalDetails,
    summary,
    experiences,
    education,
    projects,
    customItems,
    customSimple,
  } = useCvStore();

  const snapshotSource = {
    sectionsOrder: sectionsOrder[resumeId] ?? [],
    sectionsMeta: sectionsMeta[resumeId] ?? {},
    personalDetails: personalDetails[resumeId] ?? {
      personJobTitle: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: summary[resumeId] ?? "",
    experiences: experiences[resumeId] ?? [],
    education: education[resumeId] ?? [],
    projects: projects[resumeId] ?? [],
    customItems: customItems[resumeId] ?? {},
    customSimple: customSimple[resumeId] ?? {},
  };

  const [cvSnapshot, setCvSnapshot] = useState(() =>
    structuredClone(snapshotSource)
  );

  const renderKey = useRef(0);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // cancel former debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // schedule new snapshot
    debounceRef.current = setTimeout(() => {
      setCvSnapshot(
        structuredClone(snapshotSource)
      );

      // force re-render of PDFViewer
      renderKey.current++;
    }, 400); // debounce time

    // cleanup
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    resumeId,
    sectionsOrder,
    sectionsMeta,
    personalDetails,
    summary,
    experiences,
    education,
    projects,
    customItems,
    customSimple,
  ]);

  return <PDFDocument cvSnapshot={cvSnapshot} renderKey={renderKey.current} />;
}

export default ResumePDF;
