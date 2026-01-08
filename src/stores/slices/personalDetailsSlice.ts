import type { StateCreator } from "zustand";
import type { PersonalDetails } from "../types";

const emptyPersonalDetails: PersonalDetails = {
  personJobTitle: "",
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
};

export type PersonalDetailsSlice = {
  personalDetails: Record<string, PersonalDetails>;
  updatePersonalDetails: (
    resumeId: string,
    updatedPersonalDetails: Partial<PersonalDetails>
  ) => void;
};

export const createPersonalDetailsSlice: StateCreator<
  PersonalDetailsSlice,
  [],
  [],
  PersonalDetailsSlice
> = (set) => ({
  personalDetails: {},
  updatePersonalDetails: (resumeId, updatedPersonalDetails) =>
    set((state) => {
      const current = state.personalDetails[resumeId] ?? emptyPersonalDetails;
      return {
        personalDetails: {
          ...state.personalDetails,
          [resumeId]: {
            ...current,
            ...updatedPersonalDetails,
          },
        },
      };
    }),
});
