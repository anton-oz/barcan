import { createContext } from "react";

export interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

const taskContext: Task[] = [];

export const TaskContext = createContext<Task[]>(taskContext);
