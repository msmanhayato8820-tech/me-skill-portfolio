export type Role = "engineer" | "admin";

export type SkillLevel = "初級" | "中級" | "上級" | "エキスパート";

export interface Qualification {
  name: string;
  acquiredDate: string;
  expiryDate?: string;
  renewalRequired?: boolean;
}

export interface Training {
  name: string;
  completedDate: string;
  type: "F&F型" | "OJT" | "外部研修" | "eラーニング";
}

export interface Engineer {
  id: string;
  name: string;
  nameKana: string;
  company: string;
  department: string;
  position: string;
  joinedYear: number;
  experienceYears: number;
  qualifications: Qualification[];
  trainings: Training[];
  skillLevel: SkillLevel;
  specialties: string[];
  photoInitial: string;
}

export interface GroupCompany {
  id: string;
  name: string;
  engineerCount: number;
  region: string;
}
