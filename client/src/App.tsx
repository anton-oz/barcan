import { useTaskContext } from "./providers";
import Nav from "./components/nav/Nav";
import TaskContainer from "./components/taskContainer/TaskContainer";
import "./App.css";

// TODO:
// create a types file to organize types
export interface TaskData {
  title: string;
  content: string;
  status?: string;
}

function App() {
  const { tasks, setRetry } = useTaskContext();

  const handleRetry = () => {
    setRetry(true);
  };

  return (
    <>
      <Nav />
      {tasks === null ? (
        <div id="error">
          <h2>Error</h2>
          <button onClick={handleRetry}>Retry</button>
        </div>
      ) : null}
      <main>
        <TaskContainer
          title="Todo"
          tasks={tasks ? tasks.filter((task) => task.status === "Todo") : []}
        />
        <TaskContainer
          title="In Progress"
          tasks={
            tasks ? tasks.filter((task) => task.status === "In Progress") : []
          }
        />
        <TaskContainer
          title="Done"
          tasks={tasks ? tasks.filter((task) => task.status === "Done") : []}
        />
      </main>
    </>
  );
}

export default App;
