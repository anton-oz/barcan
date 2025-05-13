import { Task } from ".";
import { SET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "./actions";

/**
 * Makes sure at least one key is valid for given type
 */
export type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

interface Payload {
  task?: Task;
  tasks?: Task[];
  id?: number;
  update: AtLeastOne<Task>;
}

type ValidPayload = AtLeastOne<Payload>;

export interface Action {
  type:
    | typeof SET_TASKS
    | typeof ADD_TASK
    | typeof UPDATE_TASK
    | typeof DELETE_TASK;
  payload: ValidPayload;
}

export interface State {
  tasks: Task[];
}

export default function reducer(state: State, action: Action): State {
  if (!action.payload) throw new Error("Undefined payload");

  switch (action.type) {
    case SET_TASKS: {
      if (!Array.isArray(action.payload.tasks))
        throw new Error("SET_TASKS: Incorrect payload type");
      return { ...state, tasks: action.payload.tasks };
    }

    case ADD_TASK: {
      if (!Array.isArray(action.payload.tasks))
        throw new Error("ADD_TASKS: Incorrect payload type");
      return { ...state, tasks: action.payload.tasks };
    }

    case UPDATE_TASK: {
      const updateOpts = { ...action.payload.update };
      if (!updateOpts) throw new Error("Update opts is empty");

      if (!action.payload.id) throw new Error("id required for update");

      if (!action.payload.tasks) throw new Error("tasks is undefined");
      if (!Array.isArray(action.payload.tasks))
        throw new Error("UPDATE_TASK: Incorrect payload type");

      const updatedTasks = action.payload.tasks.map((task) =>
        task.id === action.payload?.id
          ? { ...task, ...action.payload?.update }
          : task,
      );
      return { ...state, tasks: updatedTasks };
    }

    case DELETE_TASK: {
      const taskId = action.payload.id;
      if (!taskId) throw new Error("DELETE_TASK: undefined taskId");

      if (!action.payload.tasks) throw new Error("tasks is undefined");
      if (!Array.isArray(action.payload.tasks))
        throw new Error("UPDATE_TASK: Incorrect payload type");
      const updatedTasks = action.payload.tasks.filter(
        (task) => task.id !== taskId,
      );
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
}
