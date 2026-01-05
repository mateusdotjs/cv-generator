import { format } from "date-fns";
import { ptBR, enUS } from "date-fns/locale";

type CVLanguage = "pt-BR" | "en";

const localeMap = {
  "pt-BR": ptBR,
  "en": enUS,
};

export function formatCvDate(
  date: Date | undefined,
  language: CVLanguage,
  formatString: string = "MMM yyyy"
): string {
  if (!date) return "";
  
  const locale = localeMap[language];
  return format(date, formatString, { locale });
}

export function formatCvDateRange(
  startDate: Date | undefined,
  endDate: Date | undefined,
  language: CVLanguage,
  presentLabel?: string
): string {
  if (!startDate) return "";
  
  const start = formatCvDate(startDate, language);
  
  if (!endDate) {
    const label = presentLabel || (language === "pt-BR" ? "Presente" : "Present");
    return `${start} - ${label}`;
  }
  
  const end = formatCvDate(endDate, language);
  return `${start} - ${end}`;
}
