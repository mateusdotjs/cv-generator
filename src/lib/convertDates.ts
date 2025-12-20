export function convertDates(state: any) {
  if (!state) return state;

  const parse = (v: any) =>
    typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v) ? new Date(v) : v;

  // --- EXPERIENCE ---
  if (Array.isArray(state.experiences)) {
    state.experiences = state.experiences.map((exp: any) => ({
      ...exp,
      startDate: parse(exp.startDate),
      endDate: parse(exp.endDate),
    }));
  }

  // --- EDUCATION ---
  if (Array.isArray(state.education)) {
    state.education = state.education.map((edu: any) => ({
      ...edu,
      startDate: parse(edu.startDate),
      endDate: parse(edu.endDate),
    }));
  }

  // --- CUSTOM ITEMS ---
  if (state.customItems && typeof state.customItems === "object") {
    for (const key of Object.keys(state.customItems)) {
      state.customItems[key] = state.customItems[key].map((item: any) => ({
        ...item,
        startDate: parse(item.startDate),
        endDate: parse(item.endDate),
      }));
    }
  }

  return state;
}
