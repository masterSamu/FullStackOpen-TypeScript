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
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type NewPatient = Omit<Patient, "id">;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
