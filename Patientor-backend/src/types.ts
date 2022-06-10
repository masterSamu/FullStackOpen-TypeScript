export enum Gender {
  Male = "male",
  Memale = "female",
  Other = "other",
}

export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn?: string;
}

export type NewPatient = Omit<Patient, "id">;
