import { useCvStore } from "@/stores/cv-store";

export function useCvLanguage(resumeId: string | undefined) {
  const resumes = useCvStore((state) => state.resumes);
  const setResumeLanguage = useCvStore((state) => state.setResumeLanguage);

  const resume = resumes.find((r) => r.id === resumeId);
  const language = resume?.language || "pt-BR";

  const setLanguage = (lang: "pt-BR" | "en") => {
    if (resumeId) {
      setResumeLanguage(resumeId, lang);
    }
  };

  return { language, setLanguage };
}
