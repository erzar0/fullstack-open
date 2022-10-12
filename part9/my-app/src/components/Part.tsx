import { CoursePart } from "../types";
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const pStyle = { marginTop: 0, marginBottom: 0 };
  const pStyleItalic = { ...pStyle, fontStyle: "italic" };
  const renderSwitch = () => {
    switch (coursePart.type) {
      case "normal":
        return <p style={pStyleItalic}>{coursePart.description}</p>;
        break;
      case "groupProject":
        return (
          <p style={pStyle}>Persons in a group{coursePart.groupProjectCount}</p>
        );
        break;
      case "submission":
        return (
          <>
            <p style={pStyleItalic}>{coursePart.description}</p>
            <p style={pStyle}>
              You can submit your work at: {coursePart.exerciseSubmissionLink}
            </p>
          </>
        );
        break;
      case "special":
        return (
          <>
            <p style={pStyleItalic}>{coursePart.description}</p>;
            <p style={pStyle}>
              Required skills:{" "}
              {coursePart.requirements.reduce(
                (reqs, req) => reqs + ", " + req,
                ""
              )}
            </p>
          </>
        );
        break;
      default:
        return assertNever(coursePart);
        break;
    }
  };
  const h3Style = { marginBottom: "0" };
  return (
    <>
      <h3 style={h3Style} key={coursePart.name}>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      {renderSwitch()}
    </>
  );
};

export default Part;

function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}
