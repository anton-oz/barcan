import { ReactNode } from "react";
import { TaskContext } from "./context/TaskContext/taskContext";

// NOTE:
// this file only exists because for some
// reason I cannot have context providers
// in sub directories

export function TaskProvider({ children }: { children: ReactNode }) {
  const value = [
    {
      id: 0,
      title: "",
      content: "",
      status: "",
    },
  ];
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
