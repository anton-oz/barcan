import { Router } from "express";
import taskRoutes from "./taskRoutes";

const apiRoutes = Router();

apiRoutes.use("/tasks", taskRoutes);

export default apiRoutes;
