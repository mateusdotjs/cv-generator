import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Label } from "./ui/label";

type CVLanguage = "pt-BR" | "en";

interface CVLanguageSelectorProps {
  value: CVLanguage;
  onChange: (language: CVLanguage) => void;
}

export function CVLanguageSelector({ value, onChange }: CVLanguageSelectorProps) {
  const { t } = useTranslation();

  const languages = [
    { code: "pt-BR" as CVLanguage, label: "Português (BR)" },
    { code: "en" as CVLanguage, label: "English" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Label className="text-sm font-medium">
        {t("resume.fields.cvLanguage", "Idioma do Currículo")}:
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            {languages.find((l) => l.code === value)?.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="flex flex-col gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={value === lang.code ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => onChange(lang.code)}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
