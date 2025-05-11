import { useEffect } from "react";
import { Plus } from "lucide-react";
import Task from "../task/Task";
import "./TaskContainer.css";
import { useTaskContext } from "../../providers";
import { Task as TaskData } from "../../context/TaskContext";

interface TaskContainerProps {
  heading: "Todo" | "In Progress" | "Done";
  filteredTasks: TaskData[];
}

/**
 * TODO:
 * add custom scrollbar component for scrollable content
 */

/**
 * BUG:
 * dragging tasks into same container moves them
 * to bottom of list instead of swapping with
 * the task it got dropped on
 */

export default function TaskContainer({
  heading,
  filteredTasks,
}: TaskContainerProps) {
  const { setTasks } = useTaskContext();

  const addTask = async () => {
    setTasks((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        title: "",
        content: "",
        status: "Todo",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGElement>) => {
    const key = e.code;
    if (key === "Enter" || key === "Space") {
      addTask();
    }
  };

  const dragEventListeners = () => {
    const listEl = document.getElementById(heading);
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
      const taskId = e.dataTransfer.getData("text");
      const task = document.getElementById(taskId);
      if (!task) {
        console.log(task);
        throw new Error("Error: task is null could not complete drop");
      }
      // TODO:
      // update tasks array on drop event
      const taskStatus = `${listEl.id}`;
      task.dataset.status = taskStatus;
      const taskDataId = task.id;

      const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: taskStatus }),
      };

      fetch(`http://localhost:3000/task/${taskDataId}`, options);

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
        <h2>{heading}</h2>
        {heading === "Todo" ? (
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
        <ul id={heading}>
          {[...filteredTasks].reverse().map((task) => (
            <Task
              key={task.id}
              id={task.id}
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
