import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnose";
import patientRouter from "./routes/patient";
const app = express();
app.use(express.json());

const PORT = 3001;
app.use(cors());

app.use("/api", diagnoseRouter);
app.use("/api/patients", patientRouter);
app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
