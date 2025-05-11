import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import sequelize from "./db/connection";
import { Task } from "./db/models";

configDotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("barcan api root");
});

app.post("/tasks", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post("/task/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;
  const task = await Task.update({ status }, { where: { id } });
  console.log(task);
});

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () =>
    console.log(`server listening @ http://localhost:${port}`),
  );
});
