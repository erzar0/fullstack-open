import { CoursePart } from "../types";
type Props = { courseParts: CoursePart[] };
const Total = ({ courseParts }: Props) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

export default Total;
