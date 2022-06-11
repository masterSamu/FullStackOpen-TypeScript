type Course = {
  name: string;
  exerciseCount: number;
};

interface Props {
  courses: Array<Course>;
}

const Content = ({ courses }: Props) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <p key={course.name}>
            {course.name} {course.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};
export default Content;
