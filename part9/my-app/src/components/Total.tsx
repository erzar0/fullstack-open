import { CoursePart } from "../types";
type Props = { courseParts: CoursePart[] };
const Total = ({ courseParts }: Props) => {
  return (
    <h2>
      Number of exercises{" "}
      {courseParts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </h2>
  );
};

export default Total;
