import { useCvStore } from "@/stores/cv-store";
import { useEffect, useRef, useState } from "react";
import PDFDocument from "./pdf-document";
import { useTranslation } from "react-i18next";

function ResumePDF({ resumeId }: { resumeId: string }) {
  const { t } = useTranslation();
  const {
    resumes,
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

  const resume = resumes.find((r) => r.id === resumeId);
  const language = resume?.language || "pt-BR";

  // Translate section titles for PDF
  const translatedSectionsMeta = Object.fromEntries(
    Object.entries(sectionsMeta[resumeId] ?? {}).map(([id, meta]) => [
      id,
      {
        ...meta,
        title: t(meta.title, meta.title),
        description: meta.description ? t(meta.description, meta.description) : undefined,
      },
    ])
  );

  const snapshotSource = {
    language,
    sectionsOrder: sectionsOrder[resumeId] ?? [],
    sectionsMeta: translatedSectionsMeta,
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
    language,
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
