import { useCvStore } from "@/stores/cvStore";
import { DEFAULT_RESUME_NAME } from "@/stores/slices/resumesSlice";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { exportResumeAsJson, importResumeFromJson } from "@/lib/resumeJson";
import { useRef } from "react";

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resumes, createResume, deleteResume } = useCvStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (resumeId: string) => {
    const storageData = useCvStore.getState();
    exportResumeAsJson(resumeId, storageData);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importResumeFromJson(
        file,
        (resumeId) => {
          console.log("Resume imported successfully:", resumeId);
        },
        (error) => {
          alert(error);
        }
      );
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-full p-4">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">{t("home.title")}</h1>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleImportClick}
            >
              {t("home.importJson")}
            </Button>
            <Button
            type="button"
            onClick={() => {
              const id = createResume(DEFAULT_RESUME_NAME);
              navigate(`/${id}`);
            }}
          >
            {t("home.createNew")}
            </Button>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            {t("home.noResumes")}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {resumes.map((r) => (
              <div
                key={r.id}
                className="border rounded-md p-3 flex items-center justify-between gap-3"
              >
                <div className="flex flex-col">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.id}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild type="button" variant="secondary">
                    <Link to={`/${r.id}`}>{t("common.edit")}</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleExport(r.id)}
                  >
                    {t("home.exportJson")}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => deleteResume(r.id)}
                  >
                    {t("common.delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
