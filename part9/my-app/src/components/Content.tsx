import { CoursePart } from "../types";
import Part from "./Part";
type Props = {
  courseParts: CoursePart[];
};
const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((cp: CoursePart) => (
        <Part key={cp.name} coursePart={cp} />
      ))}
    </div>
  );
};

export default Content;
