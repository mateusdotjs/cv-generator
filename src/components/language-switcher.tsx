import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "pt-BR", label: "Português" },
    { code: "en", label: "English" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={i18n.language === lang.code ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
