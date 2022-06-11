import { CoursePart } from "../types";
import Part from "./Part";

interface Props {
  courses: Array<CoursePart>;
}

const Content = ({ courses }: Props) => {
  return (
    <div>
      {courses.map((course) => {
        return <Part key={course.name} part={course} />;
      })}
    </div>
  );
};
export default Content;
