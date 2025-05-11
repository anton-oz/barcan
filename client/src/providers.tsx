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
  const [retry, setRetry] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
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

  // useEffect(() => {
  //   console.log("tasks context: ", tasks);
  // }, [tasks]);

  useEffect(() => {
    handleSetTasks();
  }, [retry]);

  // NOTE: PLACEHOLDER
  const value = { tasks, setTasks, retry, setRetry };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
