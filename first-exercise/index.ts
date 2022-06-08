import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!2");
});

app.get("/bmi", (req, res) => {
  if (!req.query) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi: string = calculateBmi(height, weight);
  return res.status(200).json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  if (!target || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, Number(target));
  return res.status(200).json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
