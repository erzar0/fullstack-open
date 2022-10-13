import { newPatient, patient, safePatient } from "../types/types";
import savedPatients from "../data/patients";
import { v1 as uuid } from "uuid";

let patients: patient[] = [...savedPatients];
const getSafePatients = (): Array<safePatient> => {
  return patients.map((p) => toSafe(p));
};

const getOnePatient = (ID: string): patient => {
  const patientsFound: patient[] = patients.filter((p) => p.id === ID);
  return patientsFound[0];
};

const addPatient = (p: newPatient): patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const pat: patient = { ...p, id: uuid() } as patient;
  patients = [...patients, pat];
  return pat;
};

function toSafe({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
}: patient): safePatient {
  return { id, name, dateOfBirth, gender, occupation };
}

export default { getSafePatients, getOnePatient, addPatient };
