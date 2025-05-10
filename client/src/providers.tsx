import { useState, useEffect, useContext, ReactNode } from "react";
import { TaskContext } from "./context/TaskContext";
import { Task } from "./context/TaskContext";

// NOTE:
// this file only exists because for some
// reason I cannot have context providers
// in sub directories

export const useTaskContext = () => useContext(TaskContext);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleSetTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Could not fetch tasks: ", error);
    }
  };

  useEffect(() => {
    handleSetTasks();
  }, []);
  // NOTE: PLACEHOLDER
  const value = tasks;
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
