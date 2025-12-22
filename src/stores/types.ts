export type SectionType =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "projects"
  | "custom-simple"
  | "custom";

export type SectionMeta = {
  id: string;
  type: SectionType;
  title: string;
  description?: string;
  removable: boolean;
  movable: boolean;
};

export type PersonalDetails = {
  personJobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
};

export type Summary = string;

export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  startDate: Date;
  endDate: Date | undefined;
  description: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  startDate: Date;
  endDate: Date | undefined;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
};

export type CustomItem = {
  id: string;
  title: string;
  institution: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string;
};

export type CustomSimple = {
  description: string;
};
