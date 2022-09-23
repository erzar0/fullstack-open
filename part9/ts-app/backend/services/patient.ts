import { newPatient, patient, safePatient } from "../types/types";
import { savedPatients } from "../data/patients";
import { v1 as uuid } from "uuid";

let patients = [...savedPatients];
const getSafePatients = (): safePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

export const addPatient = (p: newPatient): patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const pat = { ...p, id: uuid() as string };
  patients = patients.concat(pat);
  return pat;
};

export default { getSafePatients };
