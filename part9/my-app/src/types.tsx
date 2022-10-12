interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CoursePartDescripted extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CoursePartDescripted {
  type: "normal";
}

interface CourseSubmissionPart extends CoursePartDescripted {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescripted {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

// this is the new coursePart variable
