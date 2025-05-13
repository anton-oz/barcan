import { useTaskContext } from "./context/TaskContext";
import Nav from "./components/nav/Nav";
import TaskContainer from "./components/taskContainer/TaskContainer";
import "./App.css";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { UPDATE_TASK } from "./context/TaskContext/actions";

function App() {
  const { state, dispatch } = useTaskContext();
  const { tasks } = state;

  const handleUpdate = async (
    id: number,
    body: object,
    // body: AtLeastOne<TaskData> | object,
  ) => {
    if (!body) throw new Error("body is undefined");
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // TODO:
    // notify user if this fails
    await fetch(`http://localhost:3000/api/tasks/${id}`, options);
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
      {tasks === null ? (
        <div id="error">
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
