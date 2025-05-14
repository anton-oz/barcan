import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskContext } from "@/context/TaskContext";
import Nav from "@/components/nav/Nav";
import TaskContainer from "@/components/taskContainer/TaskContainer";
import { UPDATE_TASK } from "@/context/TaskContext/actions";
import { Task, AtLeastOne } from "@/context/TaskContext/types";
import "./App.css";

function App() {
  const { state, dispatch } = useTaskContext();
  const { tasks, error } = state;

  const handleUpdate = async (id: number, body: AtLeastOne<Task>) => {
    if (!body) throw new Error("body is undefined");
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, options);
      const data = await res.json();
      const allGood = data[0];
      if (!allGood) {
        throw new Error("bad response :(");
      }
    } catch (error) {
      console.error("Could not update: ", error);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = +result.draggableId.slice(5);
    const status = result.destination.droppableId;

    dispatch({
      type: UPDATE_TASK,
      payload: {
        update: { status },
        id: taskId,
        tasks,
      },
    });
    handleUpdate(taskId, { status });
  };

  return (
    <>
      <Nav />
      {error ? (
        <div id="error" style={{ opacity: error ? "100" : "0" }}>
          <h2>Error</h2>
          {/* <button onClick={handleRetry}>Retry</button> */}
        </div>
      ) : null}
      <main>
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskContainer
            heading="Todo"
            filteredTasks={
              tasks ? tasks.filter((task) => task.status === "Todo") : []
            }
          />
          <TaskContainer
            heading="In Progress"
            filteredTasks={
              tasks ? tasks.filter((task) => task.status === "In Progress") : []
            }
          />
          <TaskContainer
            heading="Done"
            filteredTasks={
              tasks ? tasks.filter((task) => task.status === "Done") : []
            }
          />
        </DragDropContext>
      </main>
    </>
  );
}

export default App;
