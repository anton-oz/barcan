import "./TaskContainer.css";
import { useState } from "react";
import { Plus } from "lucide-react";

interface Task {
  title: string;
  content: string;
}

/**
 * TODO:
 * add custom scrollbar component for scrollable content
 */

export default function TaskContainer({ title }: { title: string }) {
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
            <li key={i} className="task">
              <h3 contentEditable>{task.title}</h3>
              <p contentEditable>{task.content}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
