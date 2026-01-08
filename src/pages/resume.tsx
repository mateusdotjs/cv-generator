import Menu from "@/components/menu/Menu";
import ResumeForm from "@/components/resume-form/ResumeForm";
import ResumePDF from "@/components/resume-pdf/ResumePdf";
import { useCvStore } from "@/stores/cvStore";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

function ResumePage() {
  const { id } = useParams();
  const resumeId = id ?? "";
  const { t } = useTranslation();

  const resume = useCvStore((s) => s.resumes.find((r) => r.id === resumeId));
  const renameResume = useCvStore((s) => s.renameResume);

  if (!resumeId || !resume) {
    return (
      <div className="min-h-full p-4 flex flex-col gap-4">
        <div className="text-sm">{t("resume.notFound", "Currículo não encontrado.")}</div>
        <Button asChild type="button" variant="secondary">
          <Link to="/">{t("resume.actions.back")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col lg:flex-row gap-8 lg:p-2 lg:gap-2">
      <div className="w-full flex flex-col gap-2">
        <div className="p-2 flex items-center gap-2">
          <Button asChild type="button" variant="secondary">
            <Link to="/">{t("resume.actions.back")}</Link>
          </Button>

          <Input
            value={resume.name}
            onChange={(e) => renameResume(resumeId, e.target.value)}
            placeholder="Nome do currículo"
          />
        </div>

        <ResumeForm resumeId={resumeId} />
        <div className="p-2">
          <Menu resumeId={resumeId} />
        </div>
      </div>
      <div className="h-screen w-screen lg:min-h-full lg:w-full">
        <ResumePDF resumeId={resumeId} />
      </div>
    </div>
  );
}

export default ResumePage;
