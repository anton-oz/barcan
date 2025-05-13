import { Router, Request, Response } from "express";
import { Task } from "../../db/models";

const taskRoutes = Router();

taskRoutes.post("/", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

taskRoutes.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

taskRoutes.post("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;
  const task = await Task.update({ status }, { where: { id } });
  res.json(task);
});

export default taskRoutes;
