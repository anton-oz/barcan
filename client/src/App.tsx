import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskContext } from "@/context/TaskContext";
import Nav from "@/components/nav/Nav";
import TaskContainer from "@/components/taskContainer/TaskContainer";
import { UPDATE_TASKS } from "@/context/TaskContext/actions";
import { Task } from "@/context/TaskContext/types";
import { handlePut } from "./lib";
import "./App.css";

function App() {
  const { state, dispatch } = useTaskContext();
  const { tasks, error } = state;

  // const handlePut = async (newTasks: Task[]) => {
  //   const url = "http://localhost:3000/api/tasks";
  //   const opts: RequestInit = {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newTasks),
  //   };
  //   try {
  //     const res = await fetch(url, opts);
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.error(`ERROR: handlePut error ${error}`);
  //   }
  // };

  function moveItem(array: Task[], fromIndex: number, toIndex: number) {
    if (toIndex > array.length - 1) return array;
    let result = [...array];
    const [item] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, item);

    // HACK: indexes betweem columns has some strange behavior
    result = result.filter((item) => item !== undefined);

    return result;
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = +result.draggableId.slice(5);
    const status = result.destination.droppableId;
    const prevStatus = result.source.droppableId;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const sorted = tasks
      .filter((task) => task.status === status)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => ({ ...item, order: i }));

    let reordered: Task[] = [];
    if (sorted.length !== 0 || sorted.length > destinationIndex) {
      let moved = moveItem(sorted, sourceIndex, destinationIndex);
      if (status !== prevStatus)
        moved = moved.sort((a, b) => a.order - b.order);
      reordered = moved.map((item, index) => ({
        ...item,
        status: item.id === taskId ? status : item.status,
        order: index,
      }));
    }

    const newTasks = tasks.filter((task) => task.status !== status);
    newTasks.push(...reordered);

    // HACK: wtf
    const finalTasks = newTasks.map((item) =>
      item.id === taskId ? { ...item, status, order: destinationIndex } : item,
    );

    dispatch({
      type: UPDATE_TASKS,
      payload: {
        tasks: finalTasks,
      },
    });

    handlePut(finalTasks);
  };

  return (
    <>
      <Nav />
      {error ? (
        <div id="error" style={{ opacity: error ? "100" : "0" }}>
          <h2>Error</h2>
          <p>check console</p>
        </div>
      ) : null}
      <main>
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskContainer
            heading="Todo"
            filteredTasks={
              tasks
                ? tasks
                    .filter((task) => task.status === "Todo")
                    .sort((a, b) => a.order - b.order)
                : []
            }
          />
          <TaskContainer
            heading="In Progress"
            filteredTasks={
              tasks
                ? tasks
                    .filter((task) => task.status === "In Progress")
                    .sort((a, b) => a.order - b.order)
                : []
            }
          />
          <TaskContainer
            heading="Done"
            filteredTasks={
              tasks
                ? tasks
                    .filter((task) => task.status === "Done")
                    .sort((a, b) => a.order - b.order)
                : []
            }
          />
        </DragDropContext>
      </main>
    </>
  );
}

export default App;
