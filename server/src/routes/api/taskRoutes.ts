import { Router, Request, Response } from "express";
import { Task } from "../../db/models";
import { where } from "sequelize";

const taskRoutes = Router();

taskRoutes.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

taskRoutes.post("/", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

taskRoutes.post("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;
  const task = await Task.update({ status }, { where: { id } });
  res.json(task);
});

taskRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.destroy({
    where: {
      id,
    },
  });
  res.json(task);
});

export default taskRoutes;
