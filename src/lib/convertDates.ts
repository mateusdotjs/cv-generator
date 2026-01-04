export function convertDates(state: any) {
  if (!state) return state;

  const parse = (v: any) =>
    typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v) ? new Date(v) : v;

  if (Array.isArray(state.resumes)) {
    state.resumes = state.resumes.map((r: any) => ({
      ...r,
      createdAt: parse(r.createdAt),
      updatedAt: parse(r.updatedAt),
    }));
  }

  // --- EXPERIENCE ---
  if (state.experiences && typeof state.experiences === "object") {
    for (const resumeId of Object.keys(state.experiences)) {
      const list = state.experiences[resumeId];
      if (!Array.isArray(list)) continue;
      state.experiences[resumeId] = list.map((exp: any) => ({
        ...exp,
        startDate: parse(exp.startDate),
        endDate: parse(exp.endDate),
      }));
    }
  }

  // --- EDUCATION ---
  if (state.education && typeof state.education === "object") {
    for (const resumeId of Object.keys(state.education)) {
      const list = state.education[resumeId];
      if (!Array.isArray(list)) continue;
      state.education[resumeId] = list.map((edu: any) => ({
        ...edu,
        startDate: parse(edu.startDate),
        endDate: parse(edu.endDate),
      }));
    }
  }

  // --- CUSTOM ITEMS ---
  if (state.customItems && typeof state.customItems === "object") {
    for (const key of Object.keys(state.customItems)) {
      const v = state.customItems[key];

      if (v && typeof v === "object") {
        for (const sectionId of Object.keys(v)) {
          const list = v[sectionId];
          if (!Array.isArray(list)) continue;
          v[sectionId] = list.map((item: any) => ({
            ...item,
            startDate: parse(item.startDate),
            endDate: parse(item.endDate),
          }));
        }
      }
    }
  }

  return state;
}
