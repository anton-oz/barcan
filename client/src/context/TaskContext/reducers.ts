import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  UPDATE_TASKS,
  DELETE_TASK,
  SET_ERROR,
} from "./actions";
import { Action, State } from "./types";

/**
 * Makes sure at least one key is valid for given type
 */

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

      const { tasks, id } = action.payload;

      if (!id) throw new Error("id required for update");

      if (!tasks) throw new Error("tasks is undefined");
      if (!Array.isArray(tasks))
        throw new Error("UPDATE_TASK: Incorrect payload type");

      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updateOpts } : task,
      );
      console.log("updatedTasks: ", updatedTasks);

      return { ...state, tasks: updatedTasks };
    }

    case UPDATE_TASKS: {
      const { tasks } = action.payload;
      if (!tasks) throw new Error("UPDATE_TASKS: tasks is null");
      return { ...state, tasks };
    }

    case DELETE_TASK: {
      const taskId = action.payload.id;
      // TODO:
      // Idk how the id gets to be 0
      // BUG: but this is a bug
      if (!taskId && taskId === 0) {
        console.log("woah there, the id is 0 somehow someway");
        console.log(action.payload);
      } else if (!taskId) {
        console.log(taskId);
        console.log(action.payload);
        throw new Error("DELETE_TASK: undefined taskId");
      }

      if (!action.payload.tasks) throw new Error("tasks is undefined");
      if (!Array.isArray(action.payload.tasks))
        throw new Error("UPDATE_TASK: Incorrect payload type");
      const updatedTasks = action.payload.tasks.filter(
        (task) => task.id !== taskId,
      );
      return { ...state, tasks: updatedTasks };
    }

    case SET_ERROR: {
      const { error } = action.payload;
      if (error === undefined) throw new Error("SET_ERROR: error is undefined");

      return { ...state, error };
    }

    default:
      return state;
  }
}
