import { createContext, Dispatch, SetStateAction } from "react";

export interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

interface TaskContextDataType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  retry: boolean;
  setRetry: Dispatch<SetStateAction<boolean>>;
}

const taskContextData = {
  tasks: [],
  setTasks: () => [],
  retry: false,
  setRetry: () => false,
};

export const TaskContext = createContext<TaskContextDataType>(taskContextData);
