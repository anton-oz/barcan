import { createContext, Dispatch } from "react";

export interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

interface TaskContextDataType {
  tasks: Task[];
  setTasks: Dispatch<Task[]>;
  retry: boolean;
  setRetry: Dispatch<boolean>;
}

const taskContextData = {
  tasks: [],
  setTasks: () => {},
  retry: false,
  setRetry: () => {},
};

export const TaskContext = createContext<TaskContextDataType>(taskContextData);
