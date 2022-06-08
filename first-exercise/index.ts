import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!2");
});

app.get("/bmi", (req, res) => {
  if (!req.query) {
    return res.status(400).json({error: "malformatted parameters"});
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi: string = calculateBmi(height, weight);
  return res.status(200).json({height, weight, bmi});
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
