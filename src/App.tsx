import "./App.css";
import Nav from "./components/nav/Nav";
import TaskContainer from "./components/taskContainer/TaskContainer";

function App() {
  return (
    <>
      <Nav />
      <main>
        <TaskContainer title="Todo" />
        <TaskContainer title="In Progress" />
        <TaskContainer title="Done" />
      </main>
    </>
  );
}

export default App;
