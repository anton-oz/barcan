import { useState, useEffect } from "react";
import "./Task.css";

interface TaskProps {
  id: string;
  title: string;
  content: string;
  status?: string;
}

export default function Task({ id, title, content, status }: TaskProps) {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);

  const dragEventListeners = () => {
    const taskEl = document.getElementById(id);
    if (!taskEl) {
      throw new Error("Error: task element is undefined in Task component");
    }

    const handleDragStart = (e: DragEvent) => {
      // NOTE: disabled to keep default image dragging,
      // change if wnat to change the drag image
      // e.preventDefault();
      e.stopPropagation();

      if (!e.dataTransfer) {
        throw new Error("Error: dataTransfer event is null.");
      }

      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text", id);

      taskEl.style.opacity = "50%";
    };

    const handleDragEnd = (e: DragEvent) => {
      e.stopPropagation();
      taskEl.style.opacity = "100%";
    };

    taskEl.addEventListener("dragstart", handleDragStart);

    taskEl.addEventListener("dragend", handleDragEnd);

    return () => {
      taskEl.removeEventListener("dragstart", handleDragStart);
      taskEl.removeEventListener("dragend", handleDragEnd);
    };
  };

  useEffect(dragEventListeners);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "title":
        // TODO:
        // add visual indicator to page when too long, like a red border
        if (value.length === 48) {
          console.error("too long");
          return;
        }
        setTaskTitle(value);
        break;
      case "content":
        setTaskContent(value);
        break;
      default:
        console.error("Error: Could not update task change event");
        return;
    }
  };

  const autoResizeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
  };

  return (
    <li id={id} data-status={status} draggable className="task">
      <textarea
        id="title"
        role="task title"
        name="title"
        value={taskTitle}
        onChange={handleChange}
        rows={1}
      />
      <textarea
        id="content"
        role="task content"
        name="content"
        value={taskContent}
        onChange={handleChange}
        onInput={autoResizeContent}
      />
    </li>
  );
}
