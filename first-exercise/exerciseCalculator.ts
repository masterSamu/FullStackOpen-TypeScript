interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 0 | 1 | 2 | 3 | null;
  ratingDescription: string;
  target: number;
  average: number;
}

type Rating = 0 | 1 | 2 | 3 | null;

const getArguments = (): Array<string> => {
  const args: Array<string> = process.argv;
  if (args.length < 4) throw new Error("Not enough arguments");
  return args;
};

const calculateExercises = (data: Array<number>, target: number): Result => {
  const periodLength: number = data.length;
  const average: number = data.reduce((a, b) => a + b, 0) / periodLength;
  const trainingDays = data.filter((hours) => hours > 0).length;
  const success: boolean = average >= target;
  const rating: Rating = getRating(average, target);
  const ratingDescription: string = getDescription(rating);

  const object = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return object;
};

const getRating = (average: number, target: number): Rating => {
  switch (true) {
    case average >= target:
      return 3;
    case average >= target / 2:
      return 2;
    case average >= target / 3:
      return 1;
    case average < target / 3:
      return 0;
    default:
      throw new Error("Could not calculate rating.");
  }
};

const getDescription = (rate: Rating): string => {
  switch (rate) {
    case 3:
      return "Well done!";
    case 2:
      return "Good job, but could do better!";
    case 1:
      return "Bad job, you must do better!";
    case 0:
      return "Terrible, just terrible..";
    default:
      throw new Error(
        "Rating is not correct number, could not get the description!"
      );
  }
};

try {
  const args: Array<string> = getArguments();

  // Last item of the arguments is the target value
  const target: number = Number(args[args.length - 1]);
  const values: Array<number> = args.reduce(
    (values: Array<number>, currentValue: string, currentIndex: number) => {
      if (currentIndex > 1 && currentIndex < args.length - 1) {
        values.push(Number(currentValue));
      }
      return values;
    },
    []
  );

  const result: Result = calculateExercises(values, target);
  console.log(result);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
