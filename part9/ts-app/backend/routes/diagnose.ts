import express from "express";
import { diagnosis } from "../types/types";
const diagnoseRouter = express.Router();
import { savedDiagnoses } from "../data/diagnoses";

diagnoseRouter.get("/diagnoses", (_req, res) => {
  const diagnoses: Array<diagnosis> = [...savedDiagnoses];
  res.json(diagnoses);
});

export default diagnoseRouter;
