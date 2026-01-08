export function exportResumeAsJson(resumeId: string, storageData: any): void {
  const resumeData = {
    resume: storageData.resumes?.find((r: any) => r.id === resumeId),
    experiences: storageData.experiences?.[resumeId] || [],
    education: storageData.education?.[resumeId] || [],
    projects: storageData.projects?.[resumeId] || [],
    summary: storageData.summary?.[resumeId] || "",
    personalDetails: storageData.personalDetails?.[resumeId] || {},
    sectionsOrder: storageData.sectionsOrder?.[resumeId] || [],
    sectionsMeta: storageData.sectionsMeta?.[resumeId] || {},
    customItems: storageData.customItems?.[resumeId] || {},
    customSimple: storageData.customSimple?.[resumeId] || {},
  };

  const jsonString = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `${resumeData.resume?.name || "resume"}-${resumeId}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importResumeFromJson(
  file: File,
  onSuccess: (resumeId: string) => void,
  onError: (error: string) => void
): void {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const data = JSON.parse(content);
      
      if (!data.resume || !data.resume.id) {
        onError("Invalid resume JSON format: missing resume or resume.id");
        return;
      }

      if (!data.resume.name || typeof data.resume.name !== "string") {
        onError("Invalid resume JSON format: missing or invalid resume.name");
        return;
      }

      if (!data.resume.language || !["pt-BR", "en"].includes(data.resume.language)) {
        onError("Invalid resume JSON format: missing or invalid resume.language");
        return;
      }

      if (!data.personalDetails || typeof data.personalDetails !== "object") {
        onError("Invalid resume JSON format: missing or invalid personalDetails");
        return;
      }

      if (!Array.isArray(data.sectionsOrder)) {
        onError("Invalid resume JSON format: sectionsOrder must be an array");
        return;
      }

      if (!data.sectionsMeta || typeof data.sectionsMeta !== "object") {
        onError("Invalid resume JSON format: missing or invalid sectionsMeta");
        return;
      }

      const newId = crypto.randomUUID();
      const now = new Date();
      
      const importedData = {
        resume: {
          ...data.resume,
          id: newId,
          createdAt: now,
          updatedAt: now,
        },
        experiences: data.experiences || [],
        education: data.education || [],
        projects: data.projects || [],
        summary: data.summary || "",
        personalDetails: data.personalDetails || {},
        sectionsOrder: data.sectionsOrder || [],
        sectionsMeta: data.sectionsMeta || {},
        customItems: data.customItems || {},
        customSimple: data.customSimple || {},
      };
      
      const storageKey = "cv";
      const existingData = localStorage.getItem(storageKey);
      const parsedData = existingData ? JSON.parse(existingData) : { state: {} };
      
      parsedData.state.resumes = [...(parsedData.state.resumes || []), importedData.resume];
      parsedData.state.experiences = { ...(parsedData.state.experiences || {}), [newId]: importedData.experiences };
      parsedData.state.education = { ...(parsedData.state.education || {}), [newId]: importedData.education };
      parsedData.state.projects = { ...(parsedData.state.projects || {}), [newId]: importedData.projects };
      parsedData.state.summary = { ...(parsedData.state.summary || {}), [newId]: importedData.summary };
      parsedData.state.personalDetails = { ...(parsedData.state.personalDetails || {}), [newId]: importedData.personalDetails };
      parsedData.state.sectionsOrder = { ...(parsedData.state.sectionsOrder || {}), [newId]: importedData.sectionsOrder };
      parsedData.state.sectionsMeta = { ...(parsedData.state.sectionsMeta || {}), [newId]: importedData.sectionsMeta };
      parsedData.state.customItems = { ...(parsedData.state.customItems || {}), [newId]: importedData.customItems };
      parsedData.state.customSimple = { ...(parsedData.state.customSimple || {}), [newId]: importedData.customSimple };
      
      localStorage.setItem(storageKey, JSON.stringify(parsedData));
      
      window.location.reload();
      
      onSuccess(newId);
    } catch (error) {
      onError(`Error parsing JSON: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  
  reader.onerror = () => {
    onError("Error reading file");
  };
  
  reader.readAsText(file);
}
