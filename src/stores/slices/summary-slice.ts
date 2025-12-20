import type { StateCreator } from "zustand";
import type { Summary } from "../types";

export type SummarySlice = {
  summary: Summary;
  setSummary: (summary: string) => void;
};

export const createSummarySlice: StateCreator<
  SummarySlice,
  [],
  [],
  SummarySlice
> = (set) => ({
  summary: "",
  setSummary: (summary) => set(() => ({ summary })),
});
