import express from "express";
import { Request, Response } from "express";
const patientRouter = express.Router();
import { newPatient, patient, safePatient } from "../types/types";
import patientService from "../services/patient";
// import { savedPatients } from "../data/patients";
// import { v1 as uuid } from "uuid";
// const patients: Array<patient> = [...savedPatients];

patientRouter.get("/patients", (_req, res) => {
  const safePatients: Array<safePatient> = patientService.getSafePatients();
  res.json(safePatients);
});

patientRouter.post(
  "/patients",
  (req: Request<null, newPatient, patient>, res: Response<patient>) => {
    const newPatient: patient = req.body;
    res.json(newPatient);
  }
);

export default patientRouter;
