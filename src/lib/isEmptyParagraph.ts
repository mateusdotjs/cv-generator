export function isEmptyParagraph(html: string) {
  if (!html) return true;

  const clean = html.replace(/<p><\/p>/gi, "").trim();

  return clean.length === 0;
}
