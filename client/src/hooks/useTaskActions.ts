// hooks/useTaskActions.ts
import { useTaskContext } from "../context/TaskContext";

export const useTaskActions = () => {
  const { dispatch, state } = useTaskContext();

  const updateTaskStatus = async (id: number, status: string) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      console.error("Failed to update task");
      return;
    }

    const updatedTasks = state.tasks.map((t) =>
      t.id === id ? { ...t, status } : t,
    );

    dispatch({
      type: "SET_TASKS",
      payload: { tasks: updatedTasks },
    });
  };

  return { updateTaskStatus };
};
