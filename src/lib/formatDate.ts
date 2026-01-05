type CVLanguage = "pt-BR" | "en";

export function formatDate(date?: Date, language: CVLanguage = "pt-BR") {
  if (!date) return language === "pt-BR" ? "Presente" : "Present";
  try {
    const locale = language === "pt-BR" ? "pt-BR" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}