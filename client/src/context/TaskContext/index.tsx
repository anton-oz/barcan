import {
  useEffect,
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";
import { Action, State } from "./types";
import reducer from "./reducers";

interface TaskContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("context is null");
  return context;
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const initialState: State = {
    tasks: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tasks");
        const data = await res.json();
        dispatch({ type: "SET_TASKS", payload: { tasks: data } });
      } catch (error) {
        console.error("Error: ", error);
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
