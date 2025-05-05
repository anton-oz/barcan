import "./TaskContainer.css";
import { useEffect, useState } from "react";
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

  const dragEventListeners = () => {
    const articleEl = document.getElementById(title);
    if (!articleEl) {
      throw new Error(
        "Error: articleEl is undefined in TaskContainer component",
      );
    }

    const handleDragover = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // console.log(`${title} dragged over`);
      articleEl.style.border = "2px solid var(--text)";
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      articleEl.style.border = "none";
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.dataTransfer) {
        throw new Error(
          "Error: could not access data transfer event TaskContainer",
        );
      }
      const data = e.dataTransfer.getData("text");
      const task = document.getElementById(data);
      if (!task) {
        throw new Error("Error: task is null could not complete drop");
      }
      articleEl.appendChild(task);
      articleEl.style.border = "none";
    };

    articleEl.addEventListener("dragover", handleDragover);

    articleEl.addEventListener("dragleave", handleDragLeave);

    articleEl.addEventListener("drop", handleDrop);

    return () => {
      articleEl.removeEventListener("dragover", handleDragover);
      articleEl.removeEventListener("dragleave", handleDragLeave);
      articleEl.removeEventListener("drop", handleDrop);
    };
  };

  useEffect(dragEventListeners);

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
      <article id={title}>
        <ul>
          {tasks.map((task, i) => (
            <Task
              key={i}
              id={`task-${i}`}
              title={task.title}
              content={task.content}
            />
          ))}
        </ul>
      </article>
    </section>
  );
}
