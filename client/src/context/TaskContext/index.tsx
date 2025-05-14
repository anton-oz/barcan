import {
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useReducer,
} from "react";
import { State, TaskContextType } from "./types";
import reducer from "./reducers";

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("context is null");
  return context;
};

export default function TaskProvider({ children }: { children: ReactNode }) {
  const initialState: State = {
    tasks: [],
    error: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks");
        const tasks = await res.json();
        dispatch({ type: "SET_TASKS", payload: { tasks } });
        dispatch({ type: "SET_ERROR", payload: { error: false } });
      } catch (error) {
        console.error("Error: ", error);
        dispatch({ type: "SET_ERROR", payload: { error: true } });
        return null;
      }
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
