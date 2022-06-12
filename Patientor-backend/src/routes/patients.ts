import express from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";
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
  console.log(patient);
  if (!patient) res.send("No patient found with this id");
  return res.send(patient).status(200);
});


export default router;
