import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

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

export const TaskContext = createContext<TaskContextDataType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("context is null");
  return context;
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [retry, setRetry] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  const handleSetTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
      setRetry(false);
    } catch (error) {
      console.error("Could not fetch tasks: ", error);
    }
  };

  useEffect(() => {
    console.log("context update: ", tasks);
  }, [tasks]);

  useEffect(() => {
    handleSetTasks();
  }, [retry]);

  // NOTE: PLACEHOLDER
  const value = { tasks, setTasks, retry, setRetry };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
