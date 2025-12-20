export function formatDate(date?: Date) {
  if (!date) return "Presente";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}