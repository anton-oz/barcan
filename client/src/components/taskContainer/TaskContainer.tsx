import { useEffect } from "react";
import { Plus } from "lucide-react";
import Task from "../task/Task";
import { TaskData } from "../../App";
import "./TaskContainer.css";

interface TaskContainerProps {
  title: "Todo" | "In Progress" | "Done";
  tasks: TaskData[];
}

/**
 * TODO:
 * add custom scrollbar component for scrollable content
 */

/**
 * TODO:
 * move tasks fetching to context
 */

export default function TaskContainer({ title, tasks }: TaskContainerProps) {
  const addTask = async () => {
    console.log("under construction");
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGElement>) => {
    const key = e.code;
    if (key === "Enter" || key === "Space") {
      addTask();
    }
  };

  const dragEventListeners = () => {
    const listEl = document.getElementById(title);
    if (!listEl) {
      throw new Error("Error: listEl is undefined in TaskContainer component");
    }

    let lastTime = 0;
    const throttleTime = 250;

    const handleDragover = (e: DragEvent) => {
      const now = Date.now();
      e.preventDefault();
      e.stopPropagation();
      if (now - lastTime >= throttleTime) {
        lastTime = now;
        if (listEl.parentElement) {
          listEl.parentElement.style.border = "2px solid var(--text)";
        }
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (listEl.parentElement) {
        listEl.parentElement.style.border = "none";
      }
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
      listEl.appendChild(task);
      if (listEl.parentElement) {
        listEl.parentElement.style.border = "none";
      }
    };

    listEl.addEventListener("dragover", handleDragover);

    listEl.addEventListener("dragleave", handleDragLeave);

    listEl.addEventListener("drop", handleDrop);

    return () => {
      listEl.removeEventListener("dragover", handleDragover);
      listEl.removeEventListener("dragleave", handleDragLeave);
      listEl.removeEventListener("drop", handleDrop);
    };
  };

  useEffect(dragEventListeners);

  return (
    <section>
      <header>
        <h2>{title}</h2>
        {title === "Todo" ? (
          // TODO:
          // - set this to its own component
          // - have this button toggle focus on newly created task
          <Plus
            id="todoButton"
            role="button"
            aria-label="Add Task"
            tabIndex={0}
            size={30}
            onClick={addTask}
            onKeyDown={handleKeyDown}
          />
        ) : null}
      </header>
      <article>
        <ul id={title}>
          {tasks.map((task, i) => (
            <Task
              key={i}
              id={`task-${i}`}
              title={task.title}
              content={task.content}
              status={task.status}
            />
          ))}
        </ul>
      </article>
    </section>
  );
}
