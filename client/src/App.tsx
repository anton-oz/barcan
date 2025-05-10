import { useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const handleSetTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Could not fetch tasks: ", error);
      }
    };
    handleSetTasks();
  }, []);

  return (
    <>
      <Nav />
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
