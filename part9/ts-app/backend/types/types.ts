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
