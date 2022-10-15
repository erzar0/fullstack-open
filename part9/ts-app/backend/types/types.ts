export interface diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum gender {
  male = "male",
  female = "female",
  other = "other",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface entry {}
export interface patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: gender;
  dateOfBirth: string;
  entries?: entry[];
}

export type safePatient = Omit<patient, "ssn" | "entries">;

export type newPatient = Omit<patient, "id">;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export interface Discharge {
  criteria: string;
  date: string;
}
export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type newEntry = UnionOmit<Entry, "id">;
