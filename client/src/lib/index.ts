import { Task } from "@/context/TaskContext/types";

const base = `http://localhost:3000/api`;

const handleFetch = async (
  endpoint: string,
  method: RequestInit["method"],
  payload: Task | Task[],
) => {
  const url = `${base}${endpoint}`;
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  try {
    const res = await fetch(url, opts);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("handleFetch Error: ", error);
    return null;
  }
};

export const handlePut = async (newTasks: Task[]) => {
  const res = await handleFetch("/tasks", "PUT", newTasks);
  if (!res) throw new Error("ruh roh");
  return res;
  // const url = `${base}/tasks`;
  // const opts: RequestInit = {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(newTasks),
  // };
  // try {
  //   const res = await fetch(url, opts);
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.error(`ERROR: handlePut error ${error}`);
  // }
};

export const addTaskToDb = async (task: Task) => {
  const res = await handleFetch("/tasks", "POST", task);
  if (!res) throw new Error("ruh roh");
  return res;
  // const url = `${base}/tasks`;
  // const opts: RequestInit = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(task),
  // };
  // try {
  //   const res = await fetch(url, opts);
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   console.error(`Error: ${error}`);
  // }
};

export const handlePost = async (task: Task) => {
  const res = await handleFetch(`/tasks/${task.id}`, "POST", task);
  if (!res) throw new Error("ruh roh");
  return res;
};
