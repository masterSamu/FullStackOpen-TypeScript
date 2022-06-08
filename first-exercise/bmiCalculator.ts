const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height ** 2) * 10000;
  const underweight = bmi < 18.5;
  const normal = bmi >= 18.5 && bmi < 25;
  const overweight = bmi >= 25 && bmi < 30;
  const obese = bmi >= 30 && bmi < 35;
  const extreme = bmi > 35;

  if (underweight) {
    return "Underweight";
  } else if (normal) {
    return "Normal (healthy weight)";
  } else if (overweight) {
    return "Overweight";
  } else if (obese) {
    return "Obese";
  } else if (extreme) {
    return "Extremely obese";
  } else {
    throw new Error("Could not calculate BMI");
  }
};

try {
  const args: Array<string> = process.argv;
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
    throw new Error("False arguments");
  } else {
    const height = Number(args[2]);
    const weight = Number(args[3]);

    console.log(calculateBmi(height, weight));
  }
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
