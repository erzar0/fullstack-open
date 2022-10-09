import { CoursePart } from "../types";
type Props = {
  courseParts: CoursePart[];
};
const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((cp: CoursePart) => (
        <p key={cp.name}>
          {cp.name} {cp.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
