import { Gender, NewPatient, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing Sosial Security Number: ${ssn}`);
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return occupation;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
  entries: Array<Entry>;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
  entries,
}: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSSN(ssn),
    entries: entries
  };
  return newEntry;
};

export default toNewPatient;
