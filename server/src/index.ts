import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import sequelize from "./db/connection";
import { Task } from "./db/models";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use((_, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("barcan api root");
});

app.post("/tasks", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  console.log("owhasdh");
  res.json(tasks);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () =>
    console.log(`server listening @ http://localhost:${port}`),
  );
});
