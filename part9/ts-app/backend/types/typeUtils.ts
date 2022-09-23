/* eslint-disable @typescript-eslint/no-explicit-any */

import { newPatient, gender as Gender } from "./types";

export const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const parseString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
  }
  return param;
};

export const parseDate = (param: any, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
  }
  return param;
};

export const parseGender = (param: any): Gender => {
  if (!param || !isString(param) || !isGender(param.toLowerCase())) {
    throw new Error(`Incorrect or missing gender: ${param}`);
  }
  return param.toLowerCase() as Gender;
};

export const toNewPatient = (object: any): newPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseString(object.dateOfBirth, "dateOfBirth"),
    gender: parseGender(object.gender),
    ssn: parseString(object.ssn, "ssn"),
    occupation: parseString(object.occupation, "occupation"),
  };
};
