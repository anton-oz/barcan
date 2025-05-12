import { useTaskContext } from "./context/TaskContext";
import Nav from "./components/nav/Nav";
import TaskContainer from "./components/taskContainer/TaskContainer";
import "./App.css";

function App() {
  const { state } = useTaskContext();
  const { tasks } = state;

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
      </main>
    </>
  );
}

export default App;
