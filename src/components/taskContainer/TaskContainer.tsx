import "./TaskContainer.css";
import { useState } from "react";
import { Plus } from "lucide-react";

import Task from "../task/Task";

interface Task {
  title: string;
  content: string;
}

interface TaskContainerProps {
  title: "Todo" | "In Progress" | "Done";
}

/**
 * TODO:
 * add custom scrollbar component for scrollable content
 */

export default function TaskContainer({ title }: TaskContainerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    setTasks((prevState) => [
      ...prevState,
      { title: "Title", content: "content" },
    ]);
  };

  return (
    <section>
      <header>
        <h2>{title}</h2>
        {title === "Todo" ? (
          <button onClick={addTask}>
            <Plus size={30} />
          </button>
        ) : null}
      </header>
      <article>
        <ul>
          {tasks.map((task, i) => (
            <Task key={i} title={task.title} content={task.content} />
          ))}
        </ul>
      </article>
    </section>
  );
}
