import express from "express";
const patientRouter = express.Router();
import { newPatient, safePatient, patient } from "../types/types";
import patientService from "../services/patient";
import { toNewPatient } from "../types/typeUtils";

patientRouter.get("/", (_req, res) => {
  const safePatients: Array<safePatient> = patientService.getSafePatients();
  res.json(safePatients);
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient: newPatient = toNewPatient(req.body);
    const addedPatient: patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    let errorMessage = "Exception failed";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

patientRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient: patient = patientService.getOnePatient(id);
  res.json(patient);
});
export default patientRouter;
