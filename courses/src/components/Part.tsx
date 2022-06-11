import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>Project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            <i>{part.exerciseSubmissionLink}</i>
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
