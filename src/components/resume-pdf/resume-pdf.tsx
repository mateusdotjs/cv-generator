import { useCvStore } from "@/stores/cv-store";
import { useEffect, useRef, useState } from "react";
import PDFDocument from "./pdf-document";

function ResumePDF() {
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

  const [cvSnapshot, setCvSnapshot] = useState(() =>
    structuredClone({
      sectionsOrder,
      sectionsMeta,
      personalDetails,
      summary,
      experiences,
      education,
      projects,
      customItems,
      customSimple,
    })
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
        structuredClone({
          sectionsOrder,
          sectionsMeta,
          personalDetails,
          summary,
          experiences,
          education,
          projects,
          customItems,
          customSimple,
        })
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
