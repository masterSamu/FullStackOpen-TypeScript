import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { Entry, NewPatient, Patient } from "../types";

const getEntries = (): Array<Patient> => {
  return patients;
};

const addPatient = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const id: string = uuid();
  const newPatient = {
    id,
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id : string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addEntryToPatient = (entry: Entry, id: string) => {
  const entryId: string = uuid();
  entry.id = entryId;
  const patient: Patient | undefined = getPatientById(id);
  if (patient) {
    patient.entries.push(entry);
  }
  return patient;
};

export default { getEntries, addPatient, getPatientById, addEntryToPatient };
