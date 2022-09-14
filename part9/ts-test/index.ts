import express from "express";
const app = express();

type exerciseHours = Array<number>;
interface Stats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// const ex = [3, 0, 2, 4.5, 0, 3, 1];
const calculateExercises = (exHours: exerciseHours, target: number): Stats => {
  const average = exHours.reduce((prev, curr) => prev + curr, 0);
  let s: Stats = {
    periodLength: exHours.length,
    trainingDays: exHours.filter((entry) => entry > 0).length,
    target: target,
    average: average,
    success: average >= target,
    rating: 3,
    ratingDescription: "git gud",
  };
  return s;
};

app.use(express.json());
app.post("/exercise-stats", (req, res) => {
  const { exHours, target } = req.body;
  if (exHours === null || target === null) {
    res.send("Parameters missing");
  }
  if (typeof exHours != "object" || typeof target != "number") {
    res.status(400).send("Mallforamted parameters");
    return;
  }

  let result: Stats = calculateExercises(exHours, target);

  res.send(result);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
