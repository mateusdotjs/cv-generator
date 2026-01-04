import type { StateCreator } from "zustand";
import type { Summary } from "../types";

export type SummarySlice = {
  summary: Record<string, Summary>;
  setSummary: (resumeId: string, summary: string) => void;
};

export const createSummarySlice: StateCreator<
  SummarySlice,
  [],
  [],
  SummarySlice
> = (set) => ({
  summary: {},
  setSummary: (resumeId, summary) =>
    set((state) => ({
      summary: {
        ...state.summary,
        [resumeId]: summary,
      },
    })),
});
