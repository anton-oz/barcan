import { Router, Request, Response } from "express";
import { Task } from "../../db/models";
import sequelize from "../../db/connection";

const taskRoutes = Router();

taskRoutes.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

taskRoutes.post("/", async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.json(task);
});

taskRoutes.put("/", async (req: Request, res: Response) => {
  const tasks = req.body;

  if (!Array.isArray(tasks)) {
    res.status(400).json({ error: "Invalid task array" });
    return;
  }

  const transaction = await sequelize.transaction();

  try {
    // Delete all current tasks
    await Task.destroy({ where: {}, transaction });

    // Insert new ones
    const created = await Task.bulkCreate(tasks, { transaction });

    await transaction.commit();
    res.json(created);
  } catch (error) {
    await transaction.rollback();
    console.error("ERROR:", error);
    res.status(500).json({ error: "Update failed", details: error });
  }
});

taskRoutes.post("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const task = await Task.update({ ...data }, { where: { id } });
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
