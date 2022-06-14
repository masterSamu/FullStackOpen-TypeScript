import express from "express";
import patientService from "../services/patientService";
import { Entry, Patient } from "../types";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;
  const patient: Patient | undefined = patientService.getPatientById(id);
  if (!patient) res.send("No patient found with this id");
  return res.send(patient).status(200);
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entry: Entry = req.body;
    const date = entry.date;
    const type = entry.type;
    const specialist = entry.specialist;
    const description = entry.description;

    if (!date) return res.send("malformatted date: " + date).status(400);
    if (!type) return res.send("malformatted type: " + type).status(400);
    if (!specialist)
      return res.send("malformatted specialist: " + specialist).status(400);
    if (!description)
      return res.send("malformatted date: " + description).status(400);

    const patient: Patient | undefined = patientService.addEntryToPatient(
      entry,
      id
    );
    if (patient) {
      return res.send(patient).status(200);
    }
    return res.send("Something went wrong").status(400);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
