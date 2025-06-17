import { Task } from "@/context/TaskContext/types";

export const handlePut = async (newTasks: Task[]) => {
  const url = "http://localhost:3000/api/tasks";
  const opts: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTasks),
  };
  try {
    const res = await fetch(url, opts);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`ERROR: handlePut error ${error}`);
  }
};
export const addTaskToDb = async (task: Task) => {
  const url = "http://localhost:3000/api/tasks";
  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
