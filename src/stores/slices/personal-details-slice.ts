import type { StateCreator } from "zustand";
import type { PersonalDetails } from "../types";

export type PersonalDetailsSlice = {
  personalDetails: PersonalDetails;
  updatePersonalDetails: (
    updatedPersonalDetails: Partial<PersonalDetails>
  ) => void;
};

export const createPersonalDetailsSlice: StateCreator<
  PersonalDetailsSlice,
  [],
  [],
  PersonalDetailsSlice
> = (set) => ({
  personalDetails: {
    personJobTitle: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
  },
  updatePersonalDetails: (updatedPersonalDetails) =>
    set((state) => {
      return {
        personalDetails: {
          ...state.personalDetails,
          ...updatedPersonalDetails,
        },
      };
    }),
});
