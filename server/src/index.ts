import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import sequelize from "./db/connection";
import Task from "./db/models/Task";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("boom!!");
});

app.post("/tasks", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

app.get("/tasks", async (req: Request, res: Response) => {
  console.log(req);
  const tasks = await Task.findAll();
  res.json(tasks);
});

sequelize
  .sync({ force: true }) // NOTE: this will drop all existing things in db
  .then(() => {
    app.listen(port, () =>
      console.log(`server listening @ http://localhost:${port}`),
    );
  });
