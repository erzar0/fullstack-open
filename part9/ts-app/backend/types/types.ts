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

export interface patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export type safePatient = Omit<patient, "ssn">;

export type newPatient = Omit<patient, "id">;
